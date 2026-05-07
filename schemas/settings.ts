import { defineField, defineType } from "sanity";

export default defineType({
  name: "settings",
  title: "Site Settings",
  type: "document",
  icon: () => "⚙️",
  fields: [
    defineField({
      name: "siteName",
      title: "Site name",
      type: "string",
      description: "Shown in the browser tab and optionally on the page.",
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "siteName" },
    prepare({ title }) {
      return { title: title ?? "Site Settings" };
    },
  },
});
