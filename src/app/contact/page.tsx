import { Suspense } from "react";
import { ArrowUpRight } from "lucide-react";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { FaqList } from "@/components/ui/FaqList";
import { SheetLabel } from "@/components/ui/SheetLabel";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";
import { mailUrl, site, telUrl, whatsappUrl } from "@/config/site";
import { generalFaqs } from "@/data/faqs";

const description =
  "Contact Canary Interior Design in Ajman Industrial 2, Ajman. Call +971 52 771 8853, message us on WhatsApp, email, or send your project details online.";

export const metadata = pageMetadata({ title: "Contact Our Ajman Design Studio", description, path: "/contact" });

export default function ContactPage() {
  const channels = [
    { label: "WhatsApp", value: "Message the team", href: whatsappUrl(), track: "whatsapp_click", external: true },
    { label: "Phone", value: site.phone.display, href: telUrl, track: "phone_click" },
    { label: "Email", value: site.email, href: mailUrl, track: "email_click" },
    { label: "Directions", value: "Open in Google Maps", href: site.mapsUrl, track: "directions_click", external: true },
  ];

  return (
    <>
      <PageHeader
        crumbs={[{ name: "Contact", path: "/contact" }]}
        sheet="C-00 — Contact"
        title={
          <>
            Talk to <em>the studio.</em>
          </>
        }
        intro="Message, call, visit, or send your project details using the form below."
      />

      <section aria-label="Contact details" className="frame">
        <ul className="grid border-t border-ink sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((c) => (
            <li key={c.label} className="border-b border-line sm:odd:border-r lg:border-r lg:last:border-r-0">
              <a
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noopener" } : {})}
                className="group flex h-full items-start justify-between gap-4 py-6 sm:px-6 sm:first:pl-0"
                data-track={c.track}
                data-track-label="contact_page"
              >
                <span>
                  <span className="label block text-ink-soft">{c.label}</span>
                  <span className="mt-2 block break-all font-display text-[1.5rem] leading-tight group-hover:text-umber">{c.value}</span>
                </span>
                <ArrowUpRight size={18} aria-hidden className="mt-1 shrink-0" />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="visit-heading" className="frame grid gap-12 py-20 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SheetLabel sheet="C-01">Visit</SheetLabel>
          <h2 id="visit-heading" className="mt-6 text-h2">
            The studio
          </h2>
          <address className="mt-6 text-lede not-italic">
            {site.name}
            <br />
            {site.address.street}
            <br />
            {site.address.locality}, {site.address.country}
          </address>
          {site.openingHours ? (
            <dl className="mt-8 border-t border-line">
              {site.openingHours.map((h) => (
                <div key={h.days} className="flex justify-between border-b border-line py-3">
                  <dt>{h.days}</dt>
                  <dd>{h.hours}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="mt-6 text-ink-soft">Please call or message ahead to arrange a visit to the studio.</p>
          )}
          <p className="mt-6 text-ink-soft">{site.serviceArea.summary}</p>
          <a href={site.mapsUrl} target="_blank" rel="noopener" className="btn btn-ghost mt-8" data-track="directions_click" data-track-label="contact_visit">
            Get Directions <ArrowUpRight size={16} aria-hidden />
          </a>
        </div>
        {/* A static location plate instead of an embedded map keeps the page fast; the link opens Google Maps. */}
        <a href={site.mapsUrl} target="_blank" rel="noopener" className="group relative block lg:col-span-7" data-track="directions_click" data-track-label="contact_map">
          <div className="relative aspect-[4/3] overflow-hidden bg-stone text-ink">
            <svg aria-hidden viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
              <g stroke="currentColor" fill="none">
                {Array.from({ length: 21 }, (_, i) => (
                  <line key={`v${i}`} x1={i * 40} y1={0} x2={i * 40} y2={600} strokeWidth={0.6} opacity={0.25} />
                ))}
                {Array.from({ length: 16 }, (_, i) => (
                  <line key={`h${i}`} x1={0} y1={i * 40} x2={800} y2={i * 40} strokeWidth={0.6} opacity={0.25} />
                ))}
                <circle cx={400} cy={300} r={70} strokeWidth={1} />
                <circle cx={400} cy={300} r={140} strokeWidth={0.8} opacity={0.5} strokeDasharray="4 6" />
                <line x1={400} y1={190} x2={400} y2={410} strokeWidth={1} />
                <line x1={290} y1={300} x2={510} y2={300} strokeWidth={1} />
              </g>
              <circle cx={400} cy={300} r={9} fill="#d4a72c" />
            </svg>
            <div className="absolute left-5 top-5">
              <p className="label text-ink-soft">Studio location</p>
              <p className="mt-2 font-display text-h3">
                {site.address.street.replace("S134, ", "")}
                <br />
                {site.address.locality}
              </p>
            </div>
          </div>
          <span className="label absolute bottom-0 right-0 bg-ivory px-4 py-3 group-hover:bg-ink group-hover:text-ivory">Open in Google Maps ↗</span>
        </a>
      </section>

      <section id="enquiry" aria-labelledby="form-heading" className="border-t border-ink bg-paper py-20 md:py-28">
        <div className="frame grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SheetLabel sheet="C-02">Enquiry</SheetLabel>
            <h2 id="form-heading" className="mt-6 text-h2">
              Send your project details
            </h2>
            <p className="mt-4 text-ink-soft">Only a few fields are required. The more you share, the more useful our first conversation will be.</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Suspense fallback={<div className="h-[60rem]" aria-hidden />}>
              <EnquiryForm />
            </Suspense>
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-heading" className="frame grid gap-10 py-20 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="faq-heading" className="text-h2">
            Before you get in touch
          </h2>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <FaqList faqs={generalFaqs} withSchema={false} />
        </div>
      </section>
      <JsonLd data={webPageSchema({ name: "Contact", description, path: "/contact" })} />
    </>
  );
}
