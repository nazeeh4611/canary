import Link from "next/link";
import { Logo } from "./Logo";
import { mailUrl, mainNav, site, telUrl, whatsappUrl } from "@/config/site";
import { services } from "@/data/services";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-stone">
      <div className="frame grid gap-14 py-16 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo inverted />
          <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-stone/80">
            Interior design, renovation, fit-out and joinery for homes and businesses. Studio in Ajman, working across the UAE.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/start-a-project" className="btn btn-light min-h-11">
              Discuss Your Project
            </Link>
            <a href={whatsappUrl()} className="btn btn-outline-light min-h-11" data-track="whatsapp_click" data-track-label="footer" target="_blank" rel="noopener">
              WhatsApp
            </a>
          </div>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8">
          <div>
            <h2 className="label text-stone/60">Studio</h2>
            <ul className="mt-5 space-y-2.5 text-[0.9375rem]">
              {mainNav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="hover:text-ivory">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/start-a-project" className="hover:text-ivory">
                  Start a Project
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="label text-stone/60">Services</h2>
            <ul className="mt-5 space-y-2.5 text-[0.9375rem]">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="hover:text-ivory">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h2 className="label text-stone/60">Visit &amp; contact</h2>
            <address className="mt-5 space-y-4 text-[0.9375rem] not-italic">
              <p>
                {site.name}
                <br />
                {site.address.street}
                <br />
                {site.address.locality}, {site.address.country}
              </p>
              <p>
                <a href={site.mapsUrl} target="_blank" rel="noopener" className="link-rule" data-track="directions_click" data-track-label="footer">
                  Get directions
                </a>
              </p>
              <p>
                <a href={telUrl} className="hover:text-ivory" data-track="phone_click" data-track-label="footer">
                  {site.phone.display}
                </a>
                <br />
                <a href={mailUrl} className="break-all hover:text-ivory" data-track="email_click" data-track-label="footer">
                  {site.email}
                </a>
              </p>
              <p>
                <a href={site.social.instagram} target="_blank" rel="noopener me" className="link-rule">
                  Instagram
                </a>
              </p>
            </address>
          </div>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="frame flex flex-col gap-3 py-6 text-[0.8125rem] text-stone/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Some photographs are illustrative stock images (Pexels) until project photography is published.
          </p>
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy-policy" className="hover:text-ivory">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-ivory">
                Terms &amp; Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
