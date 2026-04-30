import { defineField, defineType } from "sanity";

const stringListField = (
  name: string,
  title: string,
  description?: string,
) =>
  defineField({
    name,
    title,
    description,
    type: "array",
    of: [{ type: "string" }],
    options: {
      layout: "tags",
    },
  });

export const instructorType = defineType({
  name: "instructor",
  title: "Instructor",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    stringListField("credentials", "Credentials"),
    stringListField("specialties", "Specialties"),
    stringListField(
      "certificationBodies",
      "Certification Bodies",
      "Organizations or certification bodies associated with this instructor.",
    ),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "imageAlt",
      title: "Image Alt Text",
      type: "string",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "image",
    },
  },
});
