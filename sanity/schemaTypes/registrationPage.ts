import { defineField, defineType } from "sanity";

export const registrationPageType = defineType({
  name: "registrationPage",
  title: "Registration Page",
  type: "document",
  description:
    "Page-shell copy around class registration. This does not change registration, seat checks, or payment behavior.",
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
      description: "Small label above the registration page headline.",
      type: "string",
      fieldset: "hero",
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      description: "Main registration page headline.",
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
      description: "Clarifies that submitting the form does not charge payment.",
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
      description: "Short instructions for completing the registration form.",
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
      description: "Post-submit confirmation text shown after successful registration.",
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
