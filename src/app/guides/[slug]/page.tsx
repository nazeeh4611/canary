import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { getGuide, guides } from "@/data/guides";
import { getService } from "@/data/services";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Figure } from "@/components/media/Figure";
import { FaqList } from "@/components/ui/FaqList";
import { EnquiryBand } from "@/components/sections/EnquiryBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { articleSchema } from "@/lib/schema";
import { whatsappUrl } from "@/config/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  const meta = pageMetadata({ title: g.seoTitle, description: g.description, path: `/guides/${g.slug}`, type: "article" });
  return { ...meta, openGraph: { ...meta.openGraph, type: "article", publishedTime: g.published, modifiedTime: g.updated } };
}

const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });
const anchor = (h: string) => h.toLowerCase().replace(/^\d+\.\s*/, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default async function GuidePage({ params }: Params) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();

  const path = `/guides/${g.slug}`;
  const related = g.services.map(getService).filter((s): s is NonNullable<typeof s> => Boolean(s));
  const more = guides.filter((x) => x.slug !== g.slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="frame pt-10 md:pt-14">
          <Breadcrumbs items={[{ name: "Guides", path: "/guides" }, { name: g.title, path }]} />
          <div className="mt-12 max-w-4xl md:mt-16">
            <p className="label text-ink-soft">
              Guide · <time dateTime={g.updated}>Updated {dateFmt.format(new Date(g.updated))}</time> · {g.readingMinutes} min read
            </p>
            <h1 className="mt-5 text-h1">{g.title}</h1>
            <p className="mt-6 max-w-2xl text-lede text-ink-soft">{g.excerpt}</p>
          </div>
        </header>

        <div className="frame mt-12">
          <Figure media={g.cover} priority aspect="aspect-[16/9] md:aspect-[21/9]" sizes="(min-width: 1440px) 1360px, 100vw" showProvenance />
        </div>

        <div className="frame grid gap-12 py-16 md:py-24 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <nav aria-label="In this guide" className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <p className="label text-ink-soft">In this guide</p>
              <ol className="mt-4 space-y-2 border-l border-line pl-4 text-[0.875rem] text-ink-soft">
                {g.sections.map((s) => (
                  <li key={s.h}>
                    <a href={`#${anchor(s.h)}`} className="hover:text-ink">
                      {s.h.replace(/^\d+\.\s*/, "")}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="max-w-[68ch] lg:col-span-7 lg:col-start-5">
            {g.sections.map((s) => (
              <section key={s.h} id={anchor(s.h)} className="mb-12 scroll-mt-28">
                <h2 className="text-h3">{s.h}</h2>
                <div className="prose-canary mt-4 text-[1.0625rem] leading-relaxed text-ink-soft">
                  {s.paras.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>
                {s.list && (
                  <ul className="mt-5 space-y-2 border-l-2 border-canary pl-5 text-[1rem]">
                    {s.list.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {g.faqs.length > 0 && (
              <section aria-labelledby="faq-heading" className="mt-16">
                <h2 id="faq-heading" className="text-h3">
                  Questions
                </h2>
                <div className="mt-6">
                  <FaqList faqs={g.faqs} />
                </div>
              </section>
            )}

            <aside className="mt-16 bg-sand p-6 md:p-8" aria-label="Related services">
              <p className="label text-ink-soft">Working on a project like this?</p>
              <ul className="mt-4 space-y-2">
                {related.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="inline-flex items-center gap-2 font-semibold hover:text-umber">
                      {s.name} in Ajman <ArrowUpRight size={15} aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/start-a-project" className="btn btn-solid min-h-11" data-track="cta_click" data-track-label={`guide:${g.slug}`}>
                  Discuss Your Project <ArrowUpRight size={16} aria-hidden />
                </Link>
                <a href={whatsappUrl()} target="_blank" rel="noopener" className="btn btn-ghost min-h-11" data-track="whatsapp_click" data-track-label={`guide:${g.slug}`}>
                  WhatsApp Our Team
                </a>
              </div>
            </aside>
          </div>
        </div>
      </article>

      <section aria-labelledby="more-heading" className="border-t border-line py-16 md:py-24">
        <div className="frame">
          <h2 id="more-heading" className="text-h2">
            More guides
          </h2>
          <ul className="mt-10 grid gap-8 md:grid-cols-3">
            {more.map((m) => (
              <li key={m.slug}>
                <Link href={`/guides/${m.slug}`} className="group block border-t border-ink pt-4">
                  <p className="label text-ink-soft">{m.readingMinutes} min read</p>
                  <h3 className="mt-2 text-h3 group-hover:text-umber">{m.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <EnquiryBand />
      <JsonLd
        data={articleSchema({
          title: g.title,
          description: g.description,
          path,
          image: g.cover.src,
          published: g.published,
          updated: g.updated,
        })}
      />
    </>
  );
}
