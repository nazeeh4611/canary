import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { enquirySchema, formDataToEnquiry, type EnquiryResponse } from "@/lib/validation";
import { deliverEnquiry } from "@/lib/enquiry-delivery";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MIN_FILL_MS = 3_000; // faster than a human can complete the form
const MAX_BODY_BYTES = 20_000;

function json(body: EnquiryResponse, status: number, headers?: HeadersInit) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

function clientKey(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  // Don't keep raw IPs in memory
  return createHash("sha256").update(ip).digest("hex").slice(0, 32);
}

export async function POST(req: Request) {
  // Same-origin only: browsers send Origin on POST
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return json({ ok: false, code: "bad_request" }, 403);
  }

  const length = Number(req.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) return json({ ok: false, code: "bad_request" }, 413);

  const limit = rateLimit(`enquiry:${clientKey(req)}`, 5, 10 * 60_000);
  if (!limit.ok) return json({ ok: false, code: "rate_limited" }, 429, { "Retry-After": String(limit.retryAfter) });

  let raw: Record<string, unknown>;
  try {
    raw = formDataToEnquiry(await req.formData());
  } catch {
    return json({ ok: false, code: "bad_request" }, 400);
  }

  const parsed = enquirySchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return json({ ok: false, code: "validation", fieldErrors }, 400);
  }

  const data = parsed.data;

  // Spam: honeypot filled, or submitted implausibly fast. Accept silently so
  // bots get no signal — real visitors never trigger either check.
  const tooFast = data.startedAt ? Date.now() - data.startedAt < MIN_FILL_MS : false;
  if (data.company || tooFast) return json({ ok: true }, 200);

  const result = await deliverEnquiry(data);
  if (!result.ok) {
    return json({ ok: false, code: result.reason }, result.reason === "not_configured" ? 503 : 502);
  }
  return json({ ok: true }, 200);
}
