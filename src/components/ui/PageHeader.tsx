import { Breadcrumbs } from "./Breadcrumbs";

type Props = {
  crumbs: { name: string; path: string }[];
  sheet: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  aside?: React.ReactNode;
};

/** Interior page header: breadcrumbs, sheet number, oversized title, short intro. */
export function PageHeader({ crumbs, sheet, title, intro, aside }: Props) {
  return (
    <header className="frame pb-14 pt-10 md:pb-20 md:pt-14">
      <Breadcrumbs items={crumbs} />
      <div className="mt-12 grid gap-10 lg:grid-cols-12 md:mt-20">
        <div className="lg:col-span-8">
          <p className="sheet text-ink-soft">{sheet}</p>
          <h1 className="mt-4 text-h1">{title}</h1>
        </div>
        {(intro || aside) && (
          <div className="self-end lg:col-span-4">
            {intro && <p className="text-lede text-ink-soft">{intro}</p>}
            {aside}
          </div>
        )}
      </div>
    </header>
  );
}
