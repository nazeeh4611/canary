import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Figure } from "@/components/media/Figure";
import { services } from "@/data/services";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="frame grid gap-12 py-16 md:py-24 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <p className="sheet text-ink-soft">Sheet 404 — not in this set</p>
        <h1 className="mt-4 text-h1">
          This page isn&rsquo;t <em>on the plan.</em>
        </h1>
        <p className="mt-6 max-w-md text-lede text-ink-soft">
          The page may have moved when our website was redesigned. These links should help you find what you need.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn btn-solid">
            Home <ArrowUpRight size={16} aria-hidden />
          </Link>
          <Link href="/start-a-project" className="btn btn-ghost">
            Discuss Your Project <ArrowUpRight size={16} aria-hidden />
          </Link>
        </div>
        <ul className="mt-12 grid gap-x-6 border-t border-line pt-6 text-[0.9375rem] sm:grid-cols-2">
          {[{ slug: "", name: "All services" }, ...services.slice(0, 5)].map((s) => (
            <li key={s.slug} className="py-1.5">
              <Link href={`/services${s.slug ? `/${s.slug}` : ""}`} className="link-rule">
                {s.name}
              </Link>
            </li>
          ))}
          <li className="py-1.5">
            <Link href="/projects" className="link-rule">
              Projects
            </Link>
          </li>
        </ul>
      </div>
      <div className="lg:col-span-5 lg:col-start-8">
        <Figure media={{ kind: "drawing", motif: "arch-stair", alt: "Drawing of an arched opening", tone: "stone" }} aspect="aspect-[4/5]" sizes="40vw" />
      </div>
    </section>
  );
}
