import { orderRankField } from "@sanity/orderable-document-list";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "section",
  title: "Section",
  type: "document",
  icon: () => "🗂️",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "backgroundColor",
      title: "Background color",
      type: "color",
      description: "Background color shown behind this section",
      options: { disableAlpha: true },
    }),
    defineField({
      name: "titleColor",
      title: "Title color",
      type: "color",
      description:
        "Optional — leave empty to auto-pick a color with good contrast against the background",
      options: { disableAlpha: true },
    }),
    defineField({
      name: "photos",
      title: "Photos",
      description:
        "Drag items to reorder. Drag handle on the left of each row.",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "photo" }],
        }),
      ],
    }),
    // Drag-and-drop ordering rank used by orderable-document-list
    orderRankField({ type: "section" }),
  ],
  preview: {
    select: {
      title: "title",
      photos: "photos",
      bg: "backgroundColor.hex",
    },
    prepare({ title, photos, bg }) {
      const count = Array.isArray(photos) ? photos.length : 0;
      return {
        title: title ?? "Untitled section",
        subtitle: `${count} photo${count === 1 ? "" : "s"}${
          bg ? ` · ${bg}` : ""
        }`,
      };
    },
  },
});
