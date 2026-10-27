/**
 * Privacy-conscious event tracking. Events carry only categorical data
 * (which button, which service) — never names, phone numbers, emails or
 * message content. Does nothing unless GA4/GTM is configured.
 */

export type TrackEvent =
  | "whatsapp_click"
  | "phone_click"
  | "email_click"
  | "directions_click"
  | "cta_click"
  | "enquiry_submit"
  | "enquiry_error";

type Params = Record<string, string | number | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function track(event: TrackEvent, params: Params = {}) {
  if (typeof window === "undefined") return;
  if (window.gtag) {
    window.gtag("event", event, params);
  } else if (window.dataLayer) {
    window.dataLayer.push({ event, ...params });
  }
}
