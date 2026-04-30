import { defineField, defineType } from "sanity";

export const classesPageType = defineType({
  name: "classesPage",
  title: "Classes Page",
  type: "document",
  fieldsets: [
    {
      name: "hero",
      title: "Hero",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "featured",
      title: "Featured Class",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "groupCta",
      title: "Group Training CTA",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "support",
      title: "Support Section",
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: "heroLabel",
      title: "Hero Label",
      type: "string",
      fieldset: "hero",
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
      fieldset: "hero",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroBody",
      title: "Hero Body",
      type: "text",
      rows: 3,
      fieldset: "hero",
    }),
    defineField({
      name: "filterHelperText",
      title: "Filter Helper Copy",
      type: "string",
      fieldset: "hero",
    }),
    defineField({
      name: "featuredClassLabel",
      title: "Featured Class Label",
      type: "string",
      fieldset: "featured",
    }),
    defineField({
      name: "groupTrainingCtaHeadline",
      title: "Group Training CTA Headline",
      type: "string",
      fieldset: "groupCta",
    }),
    defineField({
      name: "groupTrainingCtaBody",
      title: "Group Training CTA Body",
      type: "text",
      rows: 3,
      fieldset: "groupCta",
    }),
    defineField({
      name: "supportSectionHeadline",
      title: "Support Section Headline",
      type: "string",
      fieldset: "support",
    }),
    defineField({
      name: "supportCards",
      title: "Support Cards",
      description: "Cards shown below class listings for support resources.",
      type: "array",
      fieldset: "support",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "summary",
              title: "Summary",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "href",
              title: "Link (Optional)",
              type: "string",
              description: "Optional internal route such as /contact.",
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "href",
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "heroHeadline",
      subtitle: "heroLabel",
    },
  },
});
