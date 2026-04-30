import { defineField, defineType } from "sanity";

export const calendarPageType = defineType({
  name: "calendarPage",
  title: "Calendar Page",
  type: "document",
  fieldsets: [
    {
      name: "hero",
      title: "Hero",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "filters",
      title: "Filters",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "emptyState",
      title: "Empty State",
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
      name: "filterIntroCopy",
      title: "Filter Intro Copy",
      type: "text",
      rows: 2,
      fieldset: "filters",
    }),
    defineField({
      name: "emptyStateHeadline",
      title: "Empty-State Headline",
      type: "string",
      fieldset: "emptyState",
    }),
    defineField({
      name: "emptyStateBody",
      title: "Empty-State Body",
      type: "text",
      rows: 3,
      fieldset: "emptyState",
    }),
  ],
  preview: {
    select: {
      title: "heroHeadline",
      subtitle: "heroLabel",
    },
  },
});
