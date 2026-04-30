import { defineField, defineType } from "sanity";

const textArray = (name: string, title: string, description: string) =>
  defineField({
    name,
    title,
    description,
    type: "array",
    of: [
      {
        type: "object",
        fields: [
          defineField({
            name: "text",
            title: "Text",
            type: "string",
            validation: (rule) => rule.required(),
          }),
        ],
        preview: {
          select: {
            title: "text",
          },
        },
      },
    ],
  });

const titledSummaryArray = (name: string, title: string, description: string) =>
  defineField({
    name,
    title,
    description,
    type: "array",
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
        ],
        preview: {
          select: {
            title: "title",
            subtitle: "summary",
          },
        },
      },
    ],
  });

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fieldsets: [
    {
      name: "hero",
      title: "Hero",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "mission",
      title: "Mission",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "audienceIntro",
      title: "Audience Intro",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "instructorIntro",
      title: "Instructor Intro",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "finalCta",
      title: "Final Trust CTA",
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
      type: "text",
      rows: 2,
      fieldset: "hero",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroBody",
      title: "Hero Body",
      description:
        "You may use {businessName} to insert the business name from Site Settings.",
      type: "text",
      rows: 3,
      fieldset: "hero",
    }),
    defineField({
      name: "missionLabel",
      title: "Mission Label",
      type: "string",
      fieldset: "mission",
    }),
    defineField({
      name: "missionHeadline",
      title: "Mission Headline",
      type: "string",
      fieldset: "mission",
    }),
    defineField({
      name: "missionBody",
      title: "Mission Body",
      description:
        "You may use {businessName} and {serviceArea} from Site Settings.",
      type: "text",
      rows: 4,
      fieldset: "mission",
    }),
    defineField({
      name: "audiencesLabel",
      title: "Audiences Label",
      type: "string",
      fieldset: "audienceIntro",
    }),
    defineField({
      name: "audiencesHeadline",
      title: "Audiences Headline",
      type: "string",
      fieldset: "audienceIntro",
    }),
    textArray(
      "audiences",
      "Audiences",
      "Who the training serves.",
    ),
    titledSummaryArray(
      "philosophyPoints",
      "Philosophy Points",
      "Short principles shown below the audience section.",
    ),
    defineField({
      name: "instructorLabel",
      title: "Instructor Label",
      type: "string",
      fieldset: "instructorIntro",
    }),
    defineField({
      name: "instructorHeadline",
      title: "Instructor Headline",
      type: "string",
      fieldset: "instructorIntro",
    }),
    defineField({
      name: "finalCtaLabel",
      title: "Final CTA Label",
      type: "string",
      fieldset: "finalCta",
    }),
    defineField({
      name: "finalCtaHeadline",
      title: "Final CTA Headline",
      type: "string",
      fieldset: "finalCta",
    }),
    defineField({
      name: "finalCtaBody",
      title: "Final CTA Body",
      type: "text",
      rows: 3,
      fieldset: "finalCta",
    }),
  ],
  preview: {
    select: {
      title: "heroHeadline",
      subtitle: "heroLabel",
    },
  },
});
