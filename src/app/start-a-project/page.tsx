import { Suspense } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";
import { site, telUrl, whatsappUrl } from "@/config/site";

const description =
  "Tell Canary Interior Design about your villa, apartment or commercial project in Ajman or elsewhere in the UAE. Share the essentials and we'll get back to you.";

export const metadata = pageMetadata({ title: "Start a Project", description, path: "/start-a-project" });

const next = [
  { t: "We read your brief", d: "Someone from the studio reviews what you’ve shared." },
  { t: "We get in touch", d: "We contact you to talk through the project and any questions." },
  { t: "We agree next steps", d: "Usually a site visit or a meeting, then a proposal for the agreed scope." },
];

export default function StartAProjectPage() {
  return (
    <>
      <div className="frame pt-10 md:pt-14">
        <Breadcrumbs items={[{ name: "Start a Project", path: "/start-a-project" }]} />
      </div>
      <div className="frame grid gap-16 pb-24 pt-12 md:pt-20 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <p className="sheet text-ink-soft">E-01 — Project enquiry</p>
            <h1 className="mt-4 text-h1">
              Let&rsquo;s start with <em>your space.</em>
            </h1>
            <p className="mt-6 text-lede text-ink-soft">
              Tell us a little about your project. It takes about three minutes, and only a few fields are required.
            </p>

            <ol className="mt-12 border-t border-ink">
              {next.map((n, i) => (
                <li key={n.t} className="grid grid-cols-[2.25rem_1fr] border-b border-line py-4">
                  <span className="sheet text-ink-soft">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-semibold">{n.t}</span>
                    <span className="block text-[0.9375rem] text-ink-soft">{n.d}</span>
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-10 space-y-3 text-[0.9375rem]">
              <p className="label text-ink-soft">Rather talk directly?</p>
              <a href={whatsappUrl()} target="_blank" rel="noopener" className="flex items-center gap-3 hover:text-umber" data-track="whatsapp_click" data-track-label="start_aside">
                <MessageCircle size={18} aria-hidden /> WhatsApp Our Team
              </a>
              <a href={telUrl} className="flex items-center gap-3 hover:text-umber" data-track="phone_click" data-track-label="start_aside">
                <Phone size={18} aria-hidden /> {site.phone.display}
              </a>
            </div>
          </div>
        </aside>

        <div className="lg:col-span-7 lg:col-start-6">
          <Suspense fallback={<div className="h-[60rem]" aria-hidden />}>
            <EnquiryForm />
          </Suspense>
        </div>
      </div>
      <JsonLd data={webPageSchema({ name: "Start a Project", description, path: "/start-a-project" })} />
    </>
  );
}
