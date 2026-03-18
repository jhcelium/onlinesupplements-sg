import site from "../../data/site.json";

export const prerender = true;

export async function GET() {
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    "# AI training crawlers — allowed (educational public content)",
    "User-agent: GPTBot",
    "Allow: /",
    "",
    "User-agent: ClaudeBot",
    "Allow: /",
    "",
    "User-agent: PerplexityBot",
    "Allow: /",
    "",
    "User-agent: CCBot",
    "Allow: /",
    "",
    "User-agent: Google-Extended",
    "Allow: /",
    "",
    `Sitemap: https://${site.domain}/sitemap.xml`,
  ].join("\n");

  return new Response(body, {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
}
