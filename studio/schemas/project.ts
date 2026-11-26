import { defineField, defineType } from "sanity";
import { ImagesIcon } from "@sanity/icons/Images";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { photoList } from "./fields";

export const project = defineType({
  name: "project",
  title: "Personal project",
  type: "document",
  icon: ImagesIcon,
  orderings: [orderRankOrdering],
  fields: [
    defineField({ name: "title", title: "Project name", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "Page address",
      type: "slug",
      description: "Generated from the project name. Lowercase letters, numbers and dashes only.",
      options: {
        source: "title",
        maxLength: 80,
        slugify: (input) =>
          input
            .normalize("NFKD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "")
            .slice(0, 80),
      },
      validation: (rule) =>
        rule.required().custom((value) =>
          !value?.current || /^[a-z0-9]+(-[a-z0-9]+)*$/.test(value.current)
            ? true
            : "Use lowercase letters, numbers and dashes only. Press Generate to fix it.",
        ),
    }),
    defineField({
      name: "category",
      title: "Section",
      type: "string",
      options: {
        list: [
          { title: "Fashion", value: "fashion" },
          { title: "Anthropological Perspectives", value: "anthropological" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    {
      ...photoList("photos", "Photos", "The first photo is the cover. Drag to reorder."),
      validation: (rule) => rule.required().min(1),
    },
    orderRankField({ type: "project", hidden: true }),
  ],
  preview: {
    select: { title: "title", media: "photos.0", count: "photos" },
    prepare: ({ title, media, count }) => ({
      title,
      media,
      subtitle: Array.isArray(count) ? `${count.length} photo${count.length === 1 ? "" : "s"}` : undefined,
    }),
  },
});
