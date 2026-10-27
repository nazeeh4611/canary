import "server-only";
import type { Enquiry } from "./validation";
import { site } from "@/config/site";

/**
 * Delivers a validated enquiry to the business. Two independent channels,
 * both configured with server-only environment variables:
 *
 *  1. Email via Resend's HTTP API  — RESEND_API_KEY, ENQUIRY_TO_EMAIL, ENQUIRY_FROM_EMAIL
 *  2. Webhook (CRM, Zapier, Make)  — ENQUIRY_WEBHOOK_URL (+ optional ENQUIRY_WEBHOOK_SECRET)
 *
 * Success means at least one configured channel accepted the enquiry.
 */

export type DeliveryResult = { ok: true } | { ok: false; reason: "not_configured" | "send_failed" };

export function deliveryConfigured() {
  return Boolean((process.env.RESEND_API_KEY && process.env.ENQUIRY_TO_EMAIL) || process.env.ENQUIRY_WEBHOOK_URL);
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function rows(e: Enquiry): [string, string][] {
  return [
    ["Name", e.name],
    ["Phone", e.phone],
    ["Email", e.email ?? "—"],
    ["Project type", e.projectType],
    ["Location", e.location],
    ["Property status", e.propertyStatus ?? "—"],
    ["Approx. size", e.size ?? "—"],
    ["Budget range", e.budget ?? "—"],
    ["Timeline", e.timeline ?? "—"],
    ["Services", e.services.length ? e.services.join(", ") : "—"],
  ];
}

async function sendEmail(e: Enquiry): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  if (!key || !to) return false;
  const from = process.env.ENQUIRY_FROM_EMAIL ?? `${site.name} Website <onboarding@resend.dev>`;

  const table = rows(e)
    .map(([k, v]) => `<tr><td style="padding:6px 16px 6px 0;color:#55564f">${esc(k)}</td><td style="padding:6px 0">${esc(v)}</td></tr>`)
    .join("");
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;color:#22231f">
<h2 style="font-weight:normal">New project enquiry</h2>
<table>${table}</table>
${e.message ? `<p style="margin-top:20px;white-space:pre-wrap">${esc(e.message)}</p>` : ""}
<p style="margin-top:24px;color:#55564f;font-size:13px">Sent from the enquiry form on ${esc(site.url)}</p></div>`;
  const text = rows(e).map(([k, v]) => `${k}: ${v}`).join("\n") + (e.message ? `\n\n${e.message}` : "");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((s) => s.trim()),
        reply_to: e.email,
        subject: `Project enquiry — ${e.projectType}, ${e.location} (${e.name})`,
        html,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) console.error("[enquiry] email provider responded", res.status);
    return res.ok;
  } catch (err) {
    console.error("[enquiry] email send failed", err instanceof Error ? err.message : err);
    return false;
  }
}

async function sendWebhook(e: Enquiry): Promise<boolean> {
  const url = process.env.ENQUIRY_WEBHOOK_URL;
  if (!url) return false;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.ENQUIRY_WEBHOOK_SECRET ? { Authorization: `Bearer ${process.env.ENQUIRY_WEBHOOK_SECRET}` } : {}),
      },
      body: JSON.stringify({ source: "website", receivedAt: new Date().toISOString(), enquiry: e }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) console.error("[enquiry] webhook responded", res.status);
    return res.ok;
  } catch (err) {
    console.error("[enquiry] webhook failed", err instanceof Error ? err.message : err);
    return false;
  }
}

export async function deliverEnquiry(e: Enquiry): Promise<DeliveryResult> {
  if (!deliveryConfigured()) return { ok: false, reason: "not_configured" };
  const results = await Promise.all([sendEmail(e), sendWebhook(e)]);
  return results.some(Boolean) ? { ok: true } : { ok: false, reason: "send_failed" };
}
