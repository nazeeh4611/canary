import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { telUrl, whatsappUrl } from "@/config/site";

/**
 * Fixed contact bar on small screens. The body reserves matching bottom
 * padding (see globals.css) so it never covers content or form controls.
 */
export function MobileActionBar() {
  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-ivory/97 pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="grid h-16 grid-cols-[1fr_1fr_1.5fr] text-[0.8125rem] font-semibold">
        <li>
          <a href={whatsappUrl()} target="_blank" rel="noopener" data-track="whatsapp_click" data-track-label="mobile_bar" className="flex h-full items-center justify-center gap-2 border-r border-line">
            <MessageCircle size={17} aria-hidden /> WhatsApp
          </a>
        </li>
        <li>
          <a href={telUrl} data-track="phone_click" data-track-label="mobile_bar" className="flex h-full items-center justify-center gap-2 border-r border-line">
            <Phone size={16} aria-hidden /> Call
          </a>
        </li>
        <li>
          <Link href="/start-a-project" data-track="cta_click" data-track-label="mobile_bar" className="flex h-full items-center justify-center bg-ink text-ivory">
            Discuss Project
          </Link>
        </li>
      </ul>
    </nav>
  );
}
