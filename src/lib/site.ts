import site from "../../data/site.json";

/** Site origin with no trailing slash, e.g. https://onlinesupplements.neoi.jp */
export const SITE_ORIGIN = `https://${site.domain}`;

/**
 * Absolute canonical URL with no trailing slash.
 * Home is the origin only. Paths may be passed with or without a trailing slash.
 */
export function canonicalAbsolute(path?: string | null): string {
  if (path == null || path === "" || path === "/") {
    return SITE_ORIGIN;
  }
  const trimmed = path.replace(/\/+$/, "").replace(/^\/+/, "");
  return `${SITE_ORIGIN}/${trimmed}`;
}
