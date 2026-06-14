import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://onlinesupplements.neoi.jp",
  output: "static",
  trailingSlash: "never",
  integrations: [sitemap()],
});
