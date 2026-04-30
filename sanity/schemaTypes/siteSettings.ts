import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  description:
    "Global business details reused across multiple public pages when page-specific copy is not set.",
  fields: [
    defineField({
      name: "businessName",
      title: "Business Name",
      description: "Primary business name shown in headings and supporting copy.",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      description: "Short brand line used in selected hero/support sections.",
      type: "string",
    }),
    defineField({
      name: "serviceArea",
      title: "Service Area",
      description: "Public service region (for example: Sacramento & Northern California).",
      type: "string",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      description: "Used by Contact page fallback content and support cards.",
      type: "string",
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: "phone",
      title: "Phone",
      description: "Public-facing phone number shown in contact contexts.",
      type: "string",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      description: "Brand logo used for Studio preview and optional site contexts.",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "logoAlt",
      title: "Logo Alt Text",
      description: "Accessible description for the logo image.",
      type: "string",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      description: "Optional social links for footer/support usage.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "businessName",
      subtitle: "tagline",
      media: "logo",
    },
  },
});
