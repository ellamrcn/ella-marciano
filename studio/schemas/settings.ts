import { defineArrayMember, defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons/Cog";
import { photoList } from "./fields";

export const settings = defineType({
  name: "settings",
  title: "Site settings & About Me",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "about", title: "About Me", default: true },
    { name: "home", title: "Homepage" },
    { name: "contact", title: "Contact" },
    { name: "credits", title: "Credit lines" },
  ],
  fields: [
    defineField({
      name: "about",
      title: "About Me text",
      type: "array",
      group: "about",
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "Paragraph", value: "normal" }],
          lists: [],
          marks: { decorators: [], annotations: [] },
        }),
      ],
    }),
    defineField({
      name: "portrait",
      title: "About Me photo",
      type: "image",
      group: "about",
      fields: [defineField({ name: "alt", title: "Description for screen readers", type: "string" })],
    }),
    { ...photoList("introPhotos", "Homepage intro photos", "The photos dealt onto the screen when the homepage opens. Drag to reorder."), group: "home" },
    defineField({
      name: "description",
      title: "Search engine description",
      type: "text",
      rows: 3,
      group: "home",
      description: "One or two sentences shown under the site name in Google and in link previews.",
    }),
    defineField({ name: "email", title: "Email", type: "string", group: "contact", validation: (rule) => rule.required().email() }),
    defineField({ name: "instagramHandle", title: "Instagram handle", type: "string", group: "contact" }),
    defineField({ name: "instagramUrl", title: "Instagram link", type: "url", group: "contact" }),
    defineField({
      name: "personalCredit",
      title: "Credit line on Fashion and Anthropological Perspectives",
      type: "text",
      rows: 2,
      group: "credits",
    }),
    defineField({ name: "videosCredit", title: "Credit line on Videos", type: "text", rows: 2, group: "credits" }),
  ],
  preview: { prepare: () => ({ title: "Site settings & About Me" }) },
});
