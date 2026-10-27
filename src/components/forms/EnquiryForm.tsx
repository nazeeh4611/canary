"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { budgetRanges, projectTypes, propertyStatuses, servicesRequired, timelines } from "@/lib/enquiry-options";
import type { EnquiryResponse } from "@/lib/validation";
import { site, telUrl, whatsappUrl } from "@/config/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

/** Maps ?service=<slug> to sensible form defaults. */
const prefill: Record<string, { service?: (typeof servicesRequired)[number]; projectType?: (typeof projectTypes)[number] }> = {
  "interior-design": { service: "Interior design" },
  "villa-interiors": { service: "Interior design", projectType: "Villa" },
  "apartment-interiors": { service: "Interior design", projectType: "Apartment" },
  renovation: { service: "Renovation" },
  "interior-fit-out": { service: "Fit-out" },
  joinery: { service: "Joinery" },
  "commercial-interiors": { service: "Interior design", projectType: "Office" },
  "clinic-interiors": { service: "Interior design", projectType: "Clinic" },
  "architecture-space-planning": { service: "Space planning" },
  "pool-landscaping": { service: "Pool & landscaping", projectType: "Villa" },
};

const errorCopy: Record<string, string> = {
  rate_limited: "We’ve received several enquiries from your connection in a short time. Please wait a few minutes, or contact us on WhatsApp.",
  not_configured: "Our online form isn’t accepting enquiries right now. Please send us your project on WhatsApp or call the studio — we’d like to hear about it.",
  send_failed: "Something went wrong sending your enquiry, and it has not been received. Please try again, or contact us on WhatsApp.",
  bad_request: "Something went wrong sending your enquiry, and it has not been received. Please try again, or contact us on WhatsApp.",
  network: "We couldn’t reach the server, so your enquiry has not been sent. Check your connection and try again, or contact us on WhatsApp.",
};

function Label({ htmlFor, children, optional }: { htmlFor: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="label flex items-baseline justify-between text-ink-soft">
      {children}
      {optional && <span className="font-normal normal-case tracking-normal text-ink-soft">Optional</span>}
    </label>
  );
}

export function EnquiryForm() {
  const params = useSearchParams();
  const defaults = prefill[params.get("service") ?? ""] ?? {};
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorCode, setErrorCode] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const startedAt = useRef(0);
  const [summary, setSummary] = useState("");

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status === "success" || status === "error") statusRef.current?.focus();
  }, [status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.set("startedAt", String(startedAt.current));
    setStatus("submitting");
    setFieldErrors({});

    // Non-sensitive context for the WhatsApp fallback (no name, phone or message)
    const type = String(fd.get("projectType") ?? "").toLowerCase();
    setSummary(type ? `${type} interior` : "");

    try {
      const res = await fetch("/api/enquiry", { method: "POST", body: fd });
      const data = (await res.json()) as EnquiryResponse;
      if (data.ok) {
        setStatus("success");
        track("enquiry_submit", { project_type: String(fd.get("projectType") ?? "") });
        return;
      }
      if (data.code === "validation") {
        setFieldErrors(data.fieldErrors);
        setStatus("idle");
        const first = Object.keys(data.fieldErrors)[0];
        form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
        return;
      }
      setErrorCode(data.code);
      setStatus("error");
      track("enquiry_error", { code: data.code });
    } catch {
      setErrorCode("network");
      setStatus("error");
      track("enquiry_error", { code: "network" });
    }
  }

  if (status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="border-t border-ink pt-10 outline-none">
        <p className="label text-olive">Enquiry received</p>
        <h2 className="mt-4 text-h2">Thank you. We have your project details.</h2>
        <p className="mt-6 max-w-lg text-lede text-ink-soft">
          A member of the Canary team will review your enquiry and get back to you using the contact details you provided.
        </p>
        <p className="mt-6 text-ink-soft">
          If your project is time-sensitive, you&rsquo;re welcome to call us on{" "}
          <a href={telUrl} className="link-rule text-ink" data-track="phone_click" data-track-label="form_success">
            {site.phone.display}
          </a>
          .
        </p>
        <Link href="/projects" className="btn btn-ghost mt-10">
          Explore Our Work <ArrowUpRight size={16} aria-hidden />
        </Link>
      </div>
    );
  }

  const err = (name: string) =>
    fieldErrors[name] ? (
      <p id={`${uid}-${name}-error`} className="mt-2 text-[0.875rem] text-[#9b2c1f]">
        {fieldErrors[name]}
      </p>
    ) : null;
  const a11y = (name: string) => ({
    "aria-invalid": fieldErrors[name] ? true : undefined,
    "aria-describedby": fieldErrors[name] ? `${uid}-${name}-error` : undefined,
  });

  return (
    <form ref={formRef} onSubmit={onSubmit} aria-describedby={`${uid}-intro`} className="space-y-14">
      <p id={`${uid}-intro`} className="sr-only">
        Fields without an “Optional” note are required.
      </p>

      {status === "error" && (
        <div ref={statusRef} tabIndex={-1} role="alert" className="border-l-2 border-[#9b2c1f] bg-paper p-5 outline-none">
          <p className="font-semibold">Your enquiry has not been sent.</p>
          <p className="mt-2 text-ink-soft">{errorCopy[errorCode] ?? errorCopy.send_failed}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={whatsappUrl(summary || undefined)} target="_blank" rel="noopener" className="btn btn-solid min-h-11" data-track="whatsapp_click" data-track-label="form_fallback">
              Continue on WhatsApp <ArrowUpRight size={16} aria-hidden />
            </a>
            <a href={telUrl} className="btn btn-ghost min-h-11" data-track="phone_click" data-track-label="form_fallback">
              Call {site.phone.display}
            </a>
          </div>
        </div>
      )}

      <fieldset>
        <legend className="font-display text-h3">
          <span className="sheet mr-3 align-middle text-ink-soft">01</span>About you
        </legend>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="md:col-span-2">
            <Label htmlFor={`${uid}-name`}>Full name</Label>
            <input id={`${uid}-name`} name="name" type="text" autoComplete="name" required minLength={2} maxLength={100} className="field" {...a11y("name")} />
            {err("name")}
          </div>
          <div>
            <Label htmlFor={`${uid}-phone`}>Phone / WhatsApp</Label>
            <input id={`${uid}-phone`} name="phone" type="tel" autoComplete="tel" inputMode="tel" required minLength={7} maxLength={25} placeholder="+971" className="field" {...a11y("phone")} />
            {err("phone")}
          </div>
          <div>
            <Label htmlFor={`${uid}-email`} optional>
              Email
            </Label>
            <input id={`${uid}-email`} name="email" type="email" autoComplete="email" maxLength={200} className="field" {...a11y("email")} />
            {err("email")}
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend className="font-display text-h3">
          <span className="sheet mr-3 align-middle text-ink-soft">02</span>The project
        </legend>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div>
            <Label htmlFor={`${uid}-projectType`}>Project type</Label>
            <select id={`${uid}-projectType`} name="projectType" required defaultValue={defaults.projectType ?? ""} className="field" {...a11y("projectType")}>
              <option value="" disabled>
                Choose one
              </option>
              {projectTypes.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            {err("projectType")}
          </div>
          <div>
            <Label htmlFor={`${uid}-location`}>Project location</Label>
            <input id={`${uid}-location`} name="location" type="text" required minLength={2} maxLength={120} placeholder="e.g. Al Zahya, Ajman" autoComplete="address-level2" className="field" {...a11y("location")} />
            {err("location")}
          </div>
          <div>
            <Label htmlFor={`${uid}-propertyStatus`} optional>
              Property
            </Label>
            <select id={`${uid}-propertyStatus`} name="propertyStatus" defaultValue="" className="field">
              <option value="">Select</option>
              {propertyStatuses.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor={`${uid}-size`} optional>
              Approximate size
            </Label>
            <input id={`${uid}-size`} name="size" type="text" maxLength={60} placeholder="e.g. 4-bedroom villa, or 180 m²" className="field" />
          </div>
          <div>
            <Label htmlFor={`${uid}-budget`} optional>
              Estimated budget
            </Label>
            <select id={`${uid}-budget`} name="budget" defaultValue="" className="field">
              <option value="">Select</option>
              {budgetRanges.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor={`${uid}-timeline`} optional>
              Desired timeline
            </Label>
            <select id={`${uid}-timeline`} name="timeline" defaultValue="" className="field">
              <option value="">Select</option>
              {timelines.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend className="font-display text-h3">
          <span className="sheet mr-3 align-middle text-ink-soft">03</span>Services you&rsquo;re interested in
        </legend>
        <p className="mt-2 text-[0.9375rem] text-ink-soft">Choose any that apply. Optional.</p>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {servicesRequired.map((o) => (
            <label key={o} className="choice">
              <input type="checkbox" name="services" value={o} defaultChecked={defaults.service === o} />
              {o}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="font-display text-h3">
          <span className="sheet mr-3 align-middle text-ink-soft">04</span>Anything else
        </legend>
        <div className="mt-8">
          <Label htmlFor={`${uid}-message`} optional>
            Tell us about the space and what you&rsquo;d like to change
          </Label>
          <textarea id={`${uid}-message`} name="message" maxLength={3000} rows={5} className="field" {...a11y("message")} />
          {err("message")}
        </div>
      </fieldset>

      {/* Honeypot: hidden from people and assistive tech */}
      <div aria-hidden className="absolute left-[-10000px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-company`}>Company</label>
        <input id={`${uid}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="border-t border-ink pt-8">
        <label htmlFor={`${uid}-consent`} className="flex cursor-pointer items-start gap-3 text-[0.9375rem]">
          <input id={`${uid}-consent`} name="consent" type="checkbox" required className="mt-1 h-5 w-5 shrink-0 accent-ink" {...a11y("consent")} />
          <span>
            I agree that Canary Interior Design may use these details to respond to my enquiry, as described in the{" "}
            <Link href="/privacy-policy" className="link-rule">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {err("consent")}

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <button type="submit" disabled={status === "submitting"} className={cn("btn btn-solid min-w-[15rem]", status === "submitting" && "cursor-wait opacity-80")}>
            {status === "submitting" ? (
              <>
                Sending… <Loader2 size={16} aria-hidden className="animate-spin" />
              </>
            ) : (
              <>
                Send Enquiry <ArrowUpRight size={16} aria-hidden />
              </>
            )}
          </button>
          <p className="text-[0.875rem] text-ink-soft">
            Prefer to talk?{" "}
            <a href={whatsappUrl()} target="_blank" rel="noopener" className="link-rule text-ink" data-track="whatsapp_click" data-track-label="form_inline">
              WhatsApp us
            </a>{" "}
            or{" "}
            <a href={telUrl} className="link-rule text-ink" data-track="phone_click" data-track-label="form_inline">
              call the studio
            </a>
            .
          </p>
        </div>
        <p className="sr-only" aria-live="polite">
          {status === "submitting" ? "Sending your enquiry" : ""}
        </p>
      </div>
    </form>
  );
}
