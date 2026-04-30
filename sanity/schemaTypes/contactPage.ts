import { defineField, defineType } from "sanity";

const toneOptions = [
  { title: "Red", value: "red" },
  { title: "Olive", value: "olive" },
  { title: "Gold", value: "gold" },
  { title: "Graphite", value: "graphite" },
  { title: "Neutral", value: "neutral" },
];

export const contactPageType = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  description:
    "Page-level copy for Contact page sections. Contact form is display-only/front-end in this phase.",
  fieldsets: [
    {
      name: "hero",
      title: "Hero",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "formIntro",
      title: "Form Intro",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "faqIntro",
      title: "FAQ Intro",
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: "heroLabel",
      title: "Hero Label",
      description: "Small label above the Contact page headline.",
      type: "string",
      fieldset: "hero",
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      description: "Main Contact page headline.",
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
      name: "formLabel",
      title: "Form Label",
      type: "string",
      fieldset: "formIntro",
    }),
    defineField({
      name: "formHeadline",
      title: "Form Headline",
      description: "Headline shown above the contact form.",
      type: "string",
      fieldset: "formIntro",
    }),
    defineField({
      name: "formBody",
      title: "Form Body",
      type: "text",
      rows: 3,
      fieldset: "formIntro",
    }),
    defineField({
      name: "contactCards",
      title: "Contact Cards",
      description:
        "Short cards shown below the contact form for quick contact paths.",
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
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "body",
              title: "Body",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "tone",
              title: "Badge Tone",
              description: "Visual accent style used for this card.",
              type: "string",
              options: {
                list: toneOptions,
              },
              initialValue: "neutral",
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "label",
            },
          },
        },
      ],
    }),
    defineField({
      name: "faqLabel",
      title: "FAQ Label",
      type: "string",
      fieldset: "faqIntro",
    }),
    defineField({
      name: "faqHeadline",
      title: "FAQ Headline",
      type: "string",
      fieldset: "faqIntro",
    }),
    defineField({
      name: "faqs",
      title: "FAQ Summaries",
      description: "Common questions and short answers shown on the contact page.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 3,
            }),
          ],
          preview: {
            select: {
              title: "question",
              subtitle: "answer",
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
