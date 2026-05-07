import { colorInput } from "@sanity/color-input";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";
import { structure } from "./sanity-structure";

export default defineConfig({
  name: "default",
  title: "Illustrator Portfolio",
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  basePath: "/studio",
  plugins: [structureTool({ structure }), colorInput()],
  schema: { types: schemaTypes },
});
