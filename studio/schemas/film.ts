import { defineField, defineType } from "sanity";
import { DocumentVideoIcon } from "@sanity/icons/DocumentVideo";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export const film = defineType({
  name: "film",
  title: "Video",
  type: "document",
  icon: DocumentVideoIcon,
  orderings: [orderRankOrdering],
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "url",
      title: "YouTube or Vimeo link",
      type: "url",
      validation: (rule) =>
        rule.required().custom((url) =>
          !url || /youtube\.com\/watch\?v=|youtu\.be\/|vimeo\.com\/\d+/.test(url) ? true : "Paste a YouTube or Vimeo link",
        ),
    }),
    defineField({ name: "subject", title: "Description", type: "string" }),
    defineField({ name: "place", title: "Place", type: "string" }),
    defineField({
      name: "aspect",
      title: "Shape",
      type: "string",
      initialValue: "16 / 9",
      options: {
        list: [
          { title: "Widescreen (16:9)", value: "16 / 9" },
          { title: "Classic TV (4:3)", value: "4 / 3" },
        ],
        layout: "radio",
      },
    }),
    orderRankField({ type: "film", hidden: true }),
  ],
  preview: { select: { title: "title", subtitle: "subject" } },
});
