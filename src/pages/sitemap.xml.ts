import site from "../../data/site.json";
import { listArticleIds } from "../lib/content";

export const prerender = true;

// Article publication dates — must match the dates in articles/[id].astro
const articleDates: Record<string, string> = {
  "01-what-is": "2024-10-01",
  "02-how-singaporeans-choose": "2024-10-03",
  "03-pharmacy-vs-online": "2024-10-07",
  "04-reading-labels": "2024-10-10",
  "05-common-misconceptions": "2024-10-14",
  "06-japan-perspective": "2024-10-17",
  "07-buying-checklist": "2024-10-21",
  "08-reddit-questions": "2024-10-24",
  "09-safety-no-hype": "2024-10-28",
  "10-faq-expansion": "2024-10-31",
};

type UrlEntry = {
  path: string;
  lastmod: string;
  changefreq: string;
  priority: string;
};

function locFromPath(base: string, path: string): string {
  const normalized = path.replace(/\/+$/, "");
  return normalized === "" ? base : `${base}${normalized}`;
}

export async function GET() {
  const base = `https://${site.domain}`;
  const staticEntries: UrlEntry[] = [
    { path: "/",                         lastmod: "2026-03-18", changefreq: "weekly",  priority: "1.0" },
    { path: "/about",                    lastmod: "2026-03-18", changefreq: "monthly", priority: "0.7" },
    { path: "/faq",                      lastmod: "2026-03-18", changefreq: "monthly", priority: "0.8" },
    { path: "/verification-checklist",   lastmod: "2026-03-18", changefreq: "monthly", priority: "0.8" },
    { path: "/seller-transparency-signals", lastmod: "2026-03-18", changefreq: "monthly", priority: "0.8" },
  ];

  const articleEntries: UrlEntry[] = listArticleIds().map((id) => ({
    path: `/articles/${id}`,
    lastmod: "2026-03-18",
    changefreq: "monthly",
    priority: "0.6",
  }));

  const allEntries = [...staticEntries, ...articleEntries];

  const urls = allEntries
    .map(
      (e) =>
        `<url>` +
        `<loc>${locFromPath(base, e.path)}</loc>` +
        `<lastmod>${e.lastmod}</lastmod>` +
        `<changefreq>${e.changefreq}</changefreq>` +
        `<priority>${e.priority}</priority>` +
        `</url>`
    )
    .join("");

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    urls +
    `</urlset>`;

  return new Response(body, {
    status: 200,
    headers: { "Content-Type": "application/xml" },
  });
}
