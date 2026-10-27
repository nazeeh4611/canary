import { PageHeader } from "./PageHeader";

/** Shared layout for policy pages: readable measure, numbered sections. */
export function LegalPage({
  title,
  path,
  sheet,
  updated,
  sections,
}: {
  title: string;
  path: string;
  sheet: string;
  updated: string;
  sections: { h: string; body: React.ReactNode }[];
}) {
  return (
    <>
      <PageHeader crumbs={[{ name: title, path }]} sheet={sheet} title={title} intro={`Last updated ${updated}.`} />
      <div className="frame grid gap-10 pb-24 lg:grid-cols-12">
        <nav aria-label="Sections" className="hidden lg:col-span-3 lg:block">
          <ol className="sticky top-[calc(var(--header-h)+2rem)] space-y-2 text-[0.875rem] text-ink-soft">
            {sections.map((s, i) => (
              <li key={s.h}>
                <a href={`#s${i + 1}`} className="hover:text-ink">
                  {i + 1}. {s.h}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="max-w-[68ch] border-t border-ink lg:col-span-8 lg:col-start-5">
          {sections.map((s, i) => (
            <section key={s.h} id={`s${i + 1}`} className="border-b border-line py-8">
              <h2 className="font-display text-h3">
                <span className="sheet mr-3 align-middle text-ink-soft">{String(i + 1).padStart(2, "0")}</span>
                {s.h}
              </h2>
              <div className="prose-canary mt-4 text-ink-soft [&_a]:text-ink [&_a]:underline [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">{s.body}</div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
