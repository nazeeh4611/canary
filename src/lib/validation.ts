import { z } from "zod";
import { budgetRanges, projectTypes, propertyStatuses, servicesRequired, timelines } from "./enquiry-options";

export { budgetRanges, projectTypes, propertyStatuses, servicesRequired, timelines };

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined));

/** Shared by the client (for inline errors) and the server (authoritative). */
export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a phone number we can reach you on.")
    .max(25)
    .regex(/^[+()\d\s-]+$/, "Please use digits, spaces and + only."),
  email: z.union([z.literal(""), z.email("Please check the email address.")]).optional().transform((v) => v || undefined),
  projectType: z.enum(projectTypes, { error: "Please choose a project type." }),
  location: z.string().trim().min(2, "Please tell us where the project is.").max(120),
  propertyStatus: z.enum(propertyStatuses).optional().or(z.literal("").transform(() => undefined)),
  size: optionalText(60),
  budget: z.enum(budgetRanges).optional().or(z.literal("").transform(() => undefined)),
  timeline: z.enum(timelines).optional().or(z.literal("").transform(() => undefined)),
  services: z.array(z.enum(servicesRequired)).max(servicesRequired.length).default([]),
  message: optionalText(3000),
  consent: z.literal(true, { error: "Please confirm we may contact you about your enquiry." }),
  // Spam controls — validated separately in the route
  company: z.string().optional(), // honeypot: must be empty
  startedAt: z.coerce.number().optional(), // form render time (ms)
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type Enquiry = z.output<typeof enquirySchema>;

/** Convert FormData into the shape the schema expects. */
export function formDataToEnquiry(fd: FormData): Record<string, unknown> {
  return {
    name: fd.get("name") ?? "",
    phone: fd.get("phone") ?? "",
    email: fd.get("email") ?? "",
    projectType: fd.get("projectType") ?? "",
    location: fd.get("location") ?? "",
    propertyStatus: fd.get("propertyStatus") ?? "",
    size: fd.get("size") ?? "",
    budget: fd.get("budget") ?? "",
    timeline: fd.get("timeline") ?? "",
    services: fd.getAll("services"),
    message: fd.get("message") ?? "",
    consent: fd.get("consent") === "on" || fd.get("consent") === "true",
    company: fd.get("company") ?? "",
    startedAt: fd.get("startedAt") ?? undefined,
  };
}

/** JSON returned by POST /api/enquiry. */
export type EnquiryResponse =
  | { ok: true }
  | { ok: false; code: "validation"; fieldErrors: Record<string, string> }
  | { ok: false; code: "rate_limited" | "not_configured" | "send_failed" | "bad_request" };
