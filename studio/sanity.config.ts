import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { media } from "sanity-plugin-media";
import { schemaTypes, singletonTypes } from "./schemas";
import { structure } from "./structure";

export default defineConfig({
  name: "default",
  title: "Ella Marciano",
  projectId: "2jvwl47f",
  dataset: "production",
  plugins: [structureTool({ structure }), media()],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? actions.filter(({ action }) => action && ["publish", "discardChanges", "restore"].includes(action))
        : actions,
  },
});
