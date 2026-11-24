import { defineArrayMember, defineField, defineType } from "sanity";
import { UsersIcon } from "@sanity/icons/Users";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { photoList } from "./fields";

const publication = defineArrayMember({
  name: "publication",
  title: "Publication",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "url", title: "Link to the article", type: "url" }),
    defineField({
      name: "role",
      title: "Ella's role on this project",
      type: "string",
      description: "Leave empty when it is the same as her role for the client.",
    }),
    defineField({ name: "credit", title: "Credits", type: "string", description: "For example: Photography by Zoey Grossman" }),
    defineField({ name: "date", title: "Issue or date", type: "string" }),
    photoList("images", "Photos", "Drag to reorder."),
  ],
  preview: {
    select: { title: "title", subtitle: "role", media: "images.0" },
  },
});

export const client = defineType({
  name: "client",
  title: "Client",
  type: "document",
  icon: UsersIcon,
  orderings: [orderRankOrdering],
  fields: [
    defineField({ name: "name", title: "Client", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "role", title: "Ella's role", type: "string", validation: (rule) => rule.required() }),
    photoList("images", "Photos", "Shown next to the client name. Drag to reorder."),
    defineField({
      name: "publications",
      title: "Projects and publications",
      description: "Drag to reorder.",
      type: "array",
      of: [publication],
    }),
    orderRankField({ type: "client", hidden: true }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "images.0" } },
});
