"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { mainNav, site, telUrl, whatsappUrl } from "@/config/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer on navigation
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      data-header={solid ? "solid" : "top"}
      className="sticky top-0 z-40 border-b border-transparent transition-colors duration-300"
    >
      <div className="frame flex h-[var(--header-h)] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative py-2 text-[0.9375rem] transition-colors hover:text-ink",
                    isActive(item.href) ? "text-ink" : "text-ink-soft",
                  )}
                >
                  {item.label}
                  {isActive(item.href) && <span aria-hidden className="absolute -bottom-0.5 left-0 h-px w-full bg-canary" />}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/start-a-project"
            data-track="cta_click"
            data-track-label="header_discuss"
            className="btn btn-solid hidden min-h-11 md:inline-flex"
          >
            Discuss Your Project <ArrowUpRight size={16} aria-hidden />
          </Link>
          <button
            type="button"
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center lg:hidden"
            aria-haspopup="dialog"
            aria-controls="mobile-nav"
            onClick={() => dialogRef.current?.showModal()}
          >
            <Menu size={22} aria-hidden />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </div>

      <dialog
        id="mobile-nav"
        ref={dialogRef}
        aria-label="Menu"
        className="m-0 h-dvh max-h-none w-full max-w-none bg-ivory p-0 text-ink backdrop:bg-ink/40 lg:hidden"
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
      >
        <div className="flex h-full flex-col">
          <div className="frame flex h-[var(--header-h)] items-center justify-between border-b border-line">
            <Logo />
            <button
              type="button"
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center"
              onClick={() => dialogRef.current?.close()}
              autoFocus
            >
              <X size={22} aria-hidden />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <nav aria-label="Mobile" className="frame flex-1 overflow-y-auto py-6">
            <ul>
              {mainNav.map((item, i) => (
                <li key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="flex items-baseline justify-between py-4"
                    onClick={() => dialogRef.current?.close()}
                  >
                    <span className="font-display text-[2.25rem] leading-none">{item.label}</span>
                    <span className="sheet text-ink-soft">0{i + 1}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="frame grid gap-3 border-t border-line py-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
            <Link href="/start-a-project" className="btn btn-solid" onClick={() => dialogRef.current?.close()}>
              Discuss Your Project <ArrowUpRight size={16} aria-hidden />
            </Link>
            <div className="grid grid-cols-2 gap-3">
              <a href={whatsappUrl()} className="btn btn-ghost" data-track="whatsapp_click" data-track-label="menu" target="_blank" rel="noopener">
                WhatsApp
              </a>
              <a href={telUrl} className="btn btn-ghost" data-track="phone_click" data-track-label="menu">
                Call
              </a>
            </div>
            <p className="sheet pt-1 text-ink-soft">{site.phone.display}</p>
          </div>
        </div>
      </dialog>
    </header>
  );
}
