import { defineField, defineType } from "sanity";

export const calendarPageType = defineType({
  name: "calendarPage",
  title: "Calendar Page",
  type: "document",
  description:
    "Copy for the calendar page shell, filters intro, and empty-state messaging.",
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
      description: "Small label above the Calendar page headline.",
      type: "string",
      fieldset: "hero",
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      description: "Main Calendar page headline.",
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
      description: "Short helper copy for navigating months and class dates.",
      type: "text",
      rows: 2,
      fieldset: "filters",
    }),
    defineField({
      name: "emptyStateHeadline",
      title: "Empty-State Headline",
      description: "Shown when no upcoming classes are available in the selected view.",
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
