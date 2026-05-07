import { defineField, defineType } from "sanity";

export default defineType({
  name: "photo",
  title: "Media",
  type: "document",
  fields: [
    defineField({
      name: "mediaType",
      title: "Media type",
      type: "string",
      options: {
        list: [
          { title: "Image (still, GIF, or animated WebP)", value: "image" },
          { title: "Video (mp4 or webm)", value: "video" },
        ],
        layout: "radio",
      },
      initialValue: "image",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.mediaType !== "image",
      validation: (r) =>
        r.custom((value, context) => {
          const parent = context.parent as { mediaType?: string } | undefined;
          if (parent?.mediaType === "image" && !value) {
            return "Required when media type is Image";
          }
          return true;
        }),
    }),
    defineField({
      name: "video",
      title: "Video file",
      description:
        "Upload an mp4 or webm. For autoplay-friendly looping clips, mute the audio in the source.",
      type: "file",
      options: {
        accept: "video/mp4,video/webm",
      },
      hidden: ({ parent }) => parent?.mediaType !== "video",
      validation: (r) =>
        r.custom((value, context) => {
          const parent = context.parent as { mediaType?: string } | undefined;
          if (parent?.mediaType === "video" && !value) {
            return "Required when media type is Video";
          }
          return true;
        }),
    }),
    defineField({
      name: "videoPoster",
      title: "Video poster image",
      description: "(Optional) Still frame shown before the video plays.",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.mediaType !== "video",
    }),
    defineField({
      name: "aspectWidth",
      title: "Aspect width",
      description: "Used to lay out the video tile (e.g. 16 for a 16:9 clip).",
      type: "number",
      hidden: ({ parent }) => parent?.mediaType !== "video",
      validation: (r) => r.positive(),
    }),
    defineField({
      name: "aspectHeight",
      title: "Aspect height",
      description: "Used to lay out the video tile (e.g., 9 for a 16:9 clip).",
      type: "number",
      hidden: ({ parent }) => parent?.mediaType !== "video",
      validation: (r) => r.positive(),
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      description: "Brief description for screen readers and SEO",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: "(Optional) Shown in the lightbox",
    }),
  ],
  preview: {
    select: {
      title: "alt",
      subtitle: "caption",
      mediaType: "mediaType",
      image: "image",
      poster: "videoPoster",
    },
    prepare({ title, subtitle, mediaType, image, poster }) {
      return {
        title: title ?? "Untitled",
        subtitle:
          mediaType === "video"
            ? `Video${subtitle ? ` · ${subtitle}` : ""}`
            : subtitle,
        media: image ?? poster,
      };
    },
  },
});
