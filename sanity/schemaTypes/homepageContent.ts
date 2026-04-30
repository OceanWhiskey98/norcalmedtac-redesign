import { defineField, defineType } from "sanity";

const stringListField = (name: string, title: string, description?: string) =>
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

export const homepageContentType = defineType({
  name: "homepageContent",
  title: "Homepage Content",
  type: "document",
  fields: [
    defineField({
      name: "heroLabel",
      title: "Hero Label",
      type: "string",
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroBody",
      title: "Hero Body",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroTrustLine",
      title: "Hero Trust Line",
      type: "string",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "heroImageAlt",
      title: "Hero Image Alt Text",
      type: "string",
    }),
    stringListField(
      "learningPoints",
      "Learning Points",
      "Short points shown in the homepage learning panel.",
    ),
    stringListField(
      "trustStats",
      "Trust Stats",
      "Short credibility statements shown near the top of the homepage.",
    ),
    stringListField(
      "valuePoints",
      "Value Points",
      "Short reasons to train with NorCal MedTac.",
    ),
    stringListField(
      "expectations",
      "Expectations",
      "Short preparation and class-expectation statements.",
    ),
    stringListField(
      "credentials",
      "Credentials",
      "Credential labels shown in the homepage credentials section.",
    ),
    defineField({
      name: "groupTrainingHeadline",
      title: "Group Training Headline",
      type: "string",
    }),
    defineField({
      name: "groupTrainingBody",
      title: "Group Training Body",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "finalCtaHeadline",
      title: "Final CTA Headline",
      type: "string",
    }),
    defineField({
      name: "finalCtaBody",
      title: "Final CTA Body",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: "heroHeadline",
      subtitle: "heroLabel",
      media: "heroImage",
    },
  },
});
