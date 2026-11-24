import { defineArrayMember, defineField } from "sanity";
import { BatchImageUpload } from "../components/batch-image-upload";

export const photo = defineArrayMember({
  type: "image",
  fields: [
    defineField({
      name: "alt",
      title: "Description for screen readers",
      type: "string",
      description: "A short description of what is in the photo. It is never shown on the page.",
    }),
  ],
});

export function photoList(name: string, title: string, description?: string) {
  return defineField({
    name,
    title,
    description,
    type: "array",
    of: [photo],
    options: { layout: "grid" },
    components: { input: BatchImageUpload },
  });
}
