import { defineField, defineType } from "sanity";

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

export const groupTrainingPageType = defineType({
  name: "groupTrainingPage",
  title: "Group Training Page",
  type: "document",
  fieldsets: [
    {
      name: "hero",
      title: "Hero",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "trainingOptionsIntro",
      title: "Training Options Intro",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "howItWorksIntro",
      title: "How It Works Intro",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "credentials",
      title: "Credentials",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "formIntro",
      title: "Form Intro",
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
      type: "text",
      rows: 3,
      fieldset: "hero",
    }),
    titledSummaryArray(
      "useCases",
      "Use Cases",
      "Common group, workplace, club, and organization training needs.",
    ),
    defineField({
      name: "trainingOptionsLabel",
      title: "Training Options Label",
      type: "string",
      fieldset: "trainingOptionsIntro",
    }),
    defineField({
      name: "trainingOptionsHeadline",
      title: "Training Options Headline",
      type: "string",
      fieldset: "trainingOptionsIntro",
    }),
    titledSummaryArray(
      "trainingOptions",
      "Training Options",
      "Training formats available for groups.",
    ),
    defineField({
      name: "stepsLabel",
      title: "Steps Label",
      type: "string",
      fieldset: "howItWorksIntro",
    }),
    defineField({
      name: "stepsHeadline",
      title: "Steps Headline",
      type: "string",
      fieldset: "howItWorksIntro",
    }),
    titledSummaryArray(
      "steps",
      "How It Works Steps",
      "Steps from inquiry to training.",
    ),
    defineField({
      name: "credentialsLabel",
      title: "Credentials Label",
      type: "string",
      fieldset: "credentials",
    }),
    defineField({
      name: "credentialsHeadline",
      title: "Credentials Headline",
      type: "string",
      fieldset: "credentials",
    }),
    defineField({
      name: "credentialsBody",
      title: "Credentials Body",
      type: "text",
      rows: 3,
      fieldset: "credentials",
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
  ],
  preview: {
    select: {
      title: "heroHeadline",
      subtitle: "heroLabel",
    },
  },
});
