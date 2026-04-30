import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";
import { studioStructure } from "./sanity/structure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "g3igmils";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = "2025-01-01";

export default defineConfig({
  name: "norcalmedtac",
  title: "NorCal MedTac",
  projectId,
  dataset,
  apiVersion,
  basePath: "/studio",
  plugins: [structureTool({ structure: studioStructure })],
  schema: {
    types: schemaTypes,
  },
});
