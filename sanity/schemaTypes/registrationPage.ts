import { defineField, defineType } from "sanity";

export const registrationPageType = defineType({
  name: "registrationPage",
  title: "Registration Page",
  type: "document",
  fieldsets: [
    {
      name: "hero",
      title: "Hero",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "registrationNotes",
      title: "Registration Notes",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "formIntro",
      title: "Form Intro",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "success",
      title: "Success State",
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
      name: "noPaymentNote",
      title: "No-Payment Note",
      type: "string",
      fieldset: "registrationNotes",
    }),
    defineField({
      name: "seatAvailabilityFallbackMessage",
      title: "Seat Availability Fallback Message",
      description:
        "Shown when live seat availability cannot be loaded. This does not change seat checking behavior.",
      type: "string",
      fieldset: "registrationNotes",
    }),
    defineField({
      name: "formIntroHeadline",
      title: "Form Intro Headline",
      type: "string",
      fieldset: "formIntro",
    }),
    defineField({
      name: "formIntroHelpText",
      title: "Form Intro Help Text",
      type: "text",
      rows: 3,
      fieldset: "formIntro",
    }),
    defineField({
      name: "successLabel",
      title: "Success Label",
      type: "string",
      fieldset: "success",
    }),
    defineField({
      name: "successHeadline",
      title: "Success Headline",
      type: "string",
      fieldset: "success",
    }),
    defineField({
      name: "successBody",
      title: "Success Body",
      type: "text",
      rows: 3,
      fieldset: "success",
    }),
  ],
  preview: {
    select: {
      title: "heroHeadline",
      subtitle: "heroLabel",
    },
  },
});
