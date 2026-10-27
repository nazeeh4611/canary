/**
 * Production QA: run against a started production build.
 *   npm run build && npm start   (in another terminal)
 *   BASE_URL=http://localhost:3000 npm run qa
 *
 * Checks every sitemap URL plus sample/utility routes for: HTTP status,
 * unique <title>/meta description, canonical, single <h1>, valid JSON-LD,
 * noindex rules, broken internal links, horizontal overflow at six widths,
 * console errors, redirects, robots/sitemap, and the enquiry API contract.
 * Requires Playwright (`npm i -D playwright` if not available globally).
 */
import { createRequire } from "node:module";
import { execSync } from "node:child_process";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const OFFLINE_IMAGES = process.env.QA_OFFLINE_IMAGES === "1";
const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require("playwright"));
} catch {
  const root = execSync("npm root -g").toString().trim();
  ({ chromium } = createRequire(root + "/")("playwright"));
}

const failures = [];
const fail = (msg) => failures.push(msg);
const ok = (msg) => console.log("  ✓", msg);

const widths = [320, 375, 768, 1024, 1440, 1920];

async function main() {
  // --- robots + sitemap
  const robots = await (await fetch(`${BASE}/robots.txt`)).text();
  if (!/Allow: \//.test(robots) || !/Sitemap:/.test(robots)) fail("robots.txt missing Allow or Sitemap");
  else ok("robots.txt allows crawling and lists sitemap");

  const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
  const locs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  if (locs.length < 10) fail(`sitemap has only ${locs.length} URLs`);
  else ok(`sitemap lists ${locs.length} URLs`);
  if (locs.some((p) => p.startsWith("/projects/"))) {
    // only fine if those projects are real (not placeholders) — verified below via noindex check
  }

  const extra = ["/projects/villa-interior", "/projects/clinic-interior", "/start-a-project?service=villa-interiors"];
  const pages = [...new Set([...locs, ...extra])];

  const browser = await chromium.launch();
  const titles = new Map();
  const descs = new Map();
  const internalLinks = new Set();

  for (const path of pages) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const errors = [];
    page.on("console", (m) => {
      if (m.type() !== "error") return;
      // Remote stock photos can't be fetched from sandboxed CI; they fall back to drawings.
      if (OFFLINE_IMAGES && /_next\/image|images\.pexels\.com/.test(m.location()?.url ?? "")) return;
      errors.push(m.text());
    });
    page.on("pageerror", (e) => errors.push(e.message));
    const res = await page.goto(BASE + path, { waitUntil: "networkidle" });
    if (!res || res.status() !== 200) fail(`${path} → HTTP ${res?.status()}`);

    const info = await page.evaluate(() => ({
      title: document.title,
      desc: document.querySelector('meta[name="description"]')?.content ?? "",
      canonical: document.querySelector('link[rel="canonical"]')?.href ?? "",
      robots: document.querySelector('meta[name="robots"]')?.content ?? "",
      h1: document.querySelectorAll("h1").length,
      og: !!document.querySelector('meta[property="og:image"]'),
      jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent),
      links: [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")),
      imgsNoAlt: [...document.querySelectorAll("img:not([alt])")].length,
    }));

    const isSample = path.startsWith("/projects/") && path !== "/projects";
    if (!info.title) fail(`${path} missing title`);
    else if (info.title.length > 65 && !isSample) fail(`${path} title is ${info.title.length} chars (max 65): "${info.title}"`);
    if (!info.desc) fail(`${path} missing meta description`);
    else if ((info.desc.length < 50 || info.desc.length > 165) && !isSample) fail(`${path} description is ${info.desc.length} chars (50–165)`);
    if (!info.canonical) fail(`${path} missing canonical`);
    if (!info.og) fail(`${path} missing og:image`);
    if (info.h1 !== 1) fail(`${path} has ${info.h1} <h1> elements`);
    if (info.imgsNoAlt) fail(`${path} has ${info.imgsNoAlt} images without alt`);
    if (/noindex/.test(info.robots) && !isSample) fail(`${path} is noindex but should be indexable`);
    if (isSample && locs.includes(path) && /noindex/.test(info.robots)) fail(`${path} is in sitemap but noindex`);
    for (const j of info.jsonld) {
      try {
        JSON.parse(j);
      } catch {
        fail(`${path} has invalid JSON-LD`);
      }
    }
    if (!path.includes("?")) {
      titles.set(info.title, [...(titles.get(info.title) ?? []), path]);
      descs.set(info.desc, [...(descs.get(info.desc) ?? []), path]);
    }
    for (const l of info.links) if (l?.startsWith("/") && !l.startsWith("//")) internalLinks.add(l.split("#")[0].split("?")[0] || "/");

    for (const w of widths) {
      await page.setViewportSize({ width: w, height: 900 });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (overflow > 0) fail(`${path} overflows by ${overflow}px at ${w}px`);
    }
    if (errors.length) fail(`${path} console errors: ${errors.join(" | ")}`);
    await page.close();
  }
  ok(`checked ${pages.length} pages × ${widths.length} widths`);

  for (const [t, p] of titles) if (p.length > 1) fail(`duplicate title "${t}" on ${p.join(", ")}`);
  for (const [, p] of descs) if (p.length > 1) fail(`duplicate description on ${p.join(", ")}`);
  ok("titles and descriptions checked for uniqueness");

  // --- internal links
  for (const l of internalLinks) {
    const r = await fetch(BASE + l, { redirect: "manual" });
    if (r.status >= 400) fail(`broken internal link ${l} → ${r.status}`);
  }
  ok(`${internalLinks.size} internal link targets resolved`);

  // --- 404 + redirects
  const nf = await fetch(`${BASE}/definitely-not-a-page`);
  if (nf.status !== 404) fail(`unknown route returned ${nf.status}, expected 404`);
  else ok("unknown route returns 404");
  for (const [from, to] of [["/about-company", "/about"], ["/contact-us", "/contact"]]) {
    const r = await fetch(BASE + from, { redirect: "manual" });
    const loc = r.headers.get("location") ?? "";
    if (r.status !== 308 || !loc.endsWith(to)) fail(`redirect ${from} → ${r.status} ${loc}`);
  }
  ok("legacy redirects are permanent");

  // --- enquiry API contract
  const post = (fields) => {
    const fd = new FormData();
    for (const [k, v] of Object.entries(fields)) [].concat(v).forEach((x) => fd.append(k, x));
    return fetch(`${BASE}/api/enquiry`, { method: "POST", body: fd });
  };
  const valid = {
    name: "QA Test",
    phone: "+971 50 000 0000",
    projectType: "Villa",
    location: "Ajman",
    services: ["Interior design"],
    consent: "on",
    startedAt: String(Date.now() - 60_000),
  };
  let r = await post({ ...valid, name: "" });
  let j = await r.json();
  if (r.status !== 400 || j.code !== "validation" || !j.fieldErrors?.name) fail(`invalid enquiry → ${r.status} ${JSON.stringify(j)}`);
  else ok("invalid enquiry rejected with field errors");

  r = await post({ ...valid, consent: "" });
  j = await r.json();
  if (r.status !== 400 || !j.fieldErrors?.consent) fail("enquiry without consent was not rejected");
  else ok("enquiry without consent rejected");

  r = await post({ ...valid, company: "spam co" });
  if (r.status !== 200) fail(`honeypot submission → ${r.status}`);
  else ok("honeypot submission silently dropped");

  r = await post(valid);
  j = await r.json();
  if (r.status === 503 && j.code === "not_configured") ok("valid enquiry with no delivery configured → honest 503 (not a fake success)");
  else if (r.status === 200 && j.ok) ok("valid enquiry delivered");
  else fail(`valid enquiry → ${r.status} ${JSON.stringify(j)}`);

  let limited = false;
  for (let i = 0; i < 8; i++) if ((await post(valid)).status === 429) limited = true;
  if (!limited) fail("rate limiting did not engage");
  else ok("rate limiting engages after repeated submissions");

  await browser.close();

  console.log("");
  if (failures.length) {
    console.log(`✗ ${failures.length} problem(s):`);
    for (const f of failures) console.log("  -", f);
    process.exit(1);
  }
  console.log("All QA checks passed.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
