import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { whatsappUrl } from "@/config/site";
import { Figure } from "@/components/media/Figure";
import type { Media } from "@/types";

type Props = {
  heading?: React.ReactNode;
  text?: string;
  /** Short non-sensitive context for the WhatsApp message, e.g. "villa interior". */
  context?: string;
  media?: Media;
  trackLabel?: string;
};

/**
 * Closing conversion band. Dark, image-flanked, typography-led.
 * Used once per page, always as the last content section.
 */
export function EnquiryBand({
  heading = (
    <>
      Let&rsquo;s start with <em>your space.</em>
    </>
  ),
  text = "Tell us a little about your project. We’ll help you understand the next steps.",
  context,
  media = { kind: "drawing", motif: "arch-stair", alt: "Drawing of an arched opening with a stair beyond", tone: "charcoal" },
  trackLabel = "enquiry_band",
}: Props) {
  return (
    <section aria-labelledby="enquiry-band-heading" className="bg-ink text-ivory">
      <div className="frame grid items-stretch gap-10 py-16 md:grid-cols-12 md:gap-0 md:py-0">
        <div className="flex flex-col justify-center md:col-span-7 md:py-28 md:pr-16">
          <p className="label text-canary">Start a project</p>
          <h2 id="enquiry-band-heading" className="mt-6 text-h1">
            {heading}
          </h2>
          <p className="mt-6 max-w-md text-lede text-stone/85">{text}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/start-a-project" className="btn btn-light" data-track="cta_click" data-track-label={trackLabel}>
              Discuss Your Project <ArrowUpRight size={16} aria-hidden />
            </Link>
            <a
              href={whatsappUrl(context)}
              target="_blank"
              rel="noopener"
              className="btn btn-outline-light"
              data-track="whatsapp_click"
              data-track-label={trackLabel}
            >
              WhatsApp Canary <ArrowUpRight size={16} aria-hidden />
            </a>
          </div>
        </div>
        <Figure media={media} className="hidden min-h-[28rem] md:col-span-5 md:block" sizes="40vw" />
      </div>
    </section>
  );
}
