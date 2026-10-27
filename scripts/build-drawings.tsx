/**
 * Renders every architectural drawing to a static SVG file in public/drawings
 * (two inks: dark for light backgrounds, light for dark ones). Runs before
 * `next build`; the generated files are committed so deploys don't depend on it.
 *   npm run drawings
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { drawings } from "../src/components/media/drawings";

const inks = { ink: "#22231f", light: "#ece6dc" } as const;
const out = join(process.cwd(), "public", "drawings");
mkdirSync(out, { recursive: true });

let n = 0;
for (const [motif, Motif] of Object.entries(drawings)) {
  const body = renderToStaticMarkup(createElement(Motif));
  for (const [name, color] of Object.entries(inks)) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" color="${color}" stroke-linecap="square" font-family="Helvetica, Arial, sans-serif">${body}</svg>\n`;
    writeFileSync(join(out, `${motif}-${name}.svg`), svg);
    n++;
  }
}
console.log(`Wrote ${n} drawings to public/drawings`);
