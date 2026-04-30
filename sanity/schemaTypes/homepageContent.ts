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
  description:
    "Controls homepage-only copy blocks. Scheduled classes are managed separately in Scheduled Classes.",
  fields: [
    defineField({
      name: "heroLabel",
      title: "Hero Label",
      description: "Small label above the homepage headline.",
      type: "string",
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      description: "Main homepage headline.",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroBody",
      title: "Hero Body",
      description: "Supporting paragraph under the homepage headline.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroTrustLine",
      title: "Hero Trust Line",
      description: "Short trust statement below the hero body.",
      type: "string",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      description: "Optional homepage hero image.",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "heroImageAlt",
      title: "Hero Image Alt Text",
      description: "Accessible description for the hero image.",
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
      description: "Headline for the homepage group training callout section.",
      type: "string",
    }),
    defineField({
      name: "groupTrainingBody",
      title: "Group Training Body",
      description: "Supporting copy for the homepage group training callout.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "finalCtaHeadline",
      title: "Final CTA Headline",
      description: "Final homepage call-to-action headline.",
      type: "string",
    }),
    defineField({
      name: "finalCtaBody",
      title: "Final CTA Body",
      description: "Final homepage call-to-action supporting text.",
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
