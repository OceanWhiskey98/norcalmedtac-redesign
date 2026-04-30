import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "@/sanity/schemaTypes";

export default defineConfig({
  name: "norcalmedtac",
  title: "NorCal MedTac",
  projectId:
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "replace-with-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  basePath: "/studio",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
