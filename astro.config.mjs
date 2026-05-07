import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import sanity from "@sanity/astro";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import "dotenv/config";

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET;

if (!projectId || !dataset) {
  throw new Error(
    `Missing Sanity env vars at config time. projectId=${projectId} dataset=${dataset}`,
  );
}

export default defineConfig({
  site: "https://junelee.art",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sanity({
      projectId,
      dataset,
      useCdn: true,
      apiVersion: "2026-03-01",
      studioBasePath: "/studio",
      studioRouterHistory: "hash",
    }),
    react(),
    sitemap(),
  ],
});
