import { defineField, defineType } from "sanity";

const statusOptions = [
  { title: "Open", value: "open" },
  { title: "Full", value: "full" },
  { title: "Waitlist", value: "waitlist" },
  { title: "Closed", value: "closed" },
];

const skillLevelOptions = [
  { title: "Beginner", value: "beginner" },
  { title: "Intermediate", value: "intermediate" },
  { title: "Advanced", value: "advanced" },
  { title: "All Levels", value: "allLevels" },
];

const certificationBodyOptions = [
  { title: "AHA", value: "AHA" },
  { title: "ASHI", value: "ASHI" },
  { title: "ITLS", value: "ITLS" },
  { title: "EMT", value: "EMT" },
  { title: "NRA", value: "NRA" },
  { title: "CCW", value: "CCW" },
  { title: "Internal", value: "Internal" },
  { title: "None", value: "none" },
];

const categoryOptions = [
  { title: "Medical & Certification Courses", value: "medical-certification" },
  { title: "Tactical Medicine", value: "tactical-medicine" },
  { title: "Defensive Firearms", value: "defensive-firearms" },
  { title: "Concealed Carry", value: "concealed-carry" },
  { title: "Private Instruction", value: "private-instruction" },
  { title: "Group / Workplace Training", value: "group-workplace" },
  { title: "Special Events", value: "special-events" },
  { title: "Handgun", value: "handgun" },
  { title: "Rifle", value: "rifle" },
  { title: "Shotgun", value: "shotgun" },
];

const instructorOptions = [
  { title: "Alex Morgan", value: "alex-morgan" },
  { title: "Jordan Reyes", value: "jordan-reyes" },
];

const stringListField = (
  name: string,
  title: string,
  description: string,
  fieldset: string,
) =>
  defineField({
    name,
    title,
    description,
    type: "array",
    of: [{ type: "string" }],
    fieldset,
    options: {
      layout: "tags",
    },
  });

export const scheduledClassType = defineType({
  name: "scheduledClass",
  title: "Scheduled Class",
  type: "document",
  fieldsets: [
    {
      name: "basics",
      title: "Class Basics",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "schedule",
      title: "Schedule",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "location",
      title: "Location",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "registration",
      title: "Registration & Availability",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "content",
      title: "Student-Facing Details",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "relationships",
      title: "Instructor, Image & Related Classes",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      description: "The public class title shown on cards and detail pages.",
      type: "string",
      fieldset: "basics",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description:
        "Used in the class URL. Click Generate from the title, then keep it stable after publishing.",
      type: "slug",
      fieldset: "basics",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      description:
        "Choose the primary training category for browsing and badges.",
      type: "string",
      fieldset: "basics",
      options: {
        list: categoryOptions,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      description:
        "One or two concise sentences for cards and page introductions.",
      type: "text",
      fieldset: "basics",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      description: "Full overview shown on the class detail page.",
      type: "text",
      fieldset: "content",
      rows: 6,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      description: "Scheduled class date.",
      type: "date",
      fieldset: "schedule",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "startTime",
      title: "Start Time",
      description: "Use a readable local time, such as 09:00 AM.",
      type: "string",
      fieldset: "schedule",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "endTime",
      title: "End Time",
      description: "Use a readable local time, such as 01:00 PM.",
      type: "string",
      fieldset: "schedule",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      description: "Human-readable duration, such as 4 hours or 8 hours.",
      type: "string",
      fieldset: "schedule",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "locationName",
      title: "Location Name",
      description: "Venue or training location name.",
      type: "string",
      fieldset: "location",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "locationCity",
      title: "Location City",
      description: "City shown on class cards and detail pages.",
      type: "string",
      fieldset: "location",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "locationState",
      title: "Location State",
      description: "State abbreviation shown with the city.",
      type: "string",
      fieldset: "location",
      initialValue: "CA",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "locationAddress",
      title: "Location Address",
      description: "Public-safe address or display-safe location details.",
      type: "string",
      fieldset: "location",
    }),
    defineField({
      name: "price",
      title: "Price",
      description: "Class registration price in USD. Enter numbers only.",
      type: "number",
      fieldset: "registration",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "capacity",
      title: "Capacity",
      description: "Total number of seats available for this class.",
      type: "number",
      fieldset: "registration",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "seatsAvailable",
      title: "Seats Available",
      description:
        "Current available seats. Update this as registrations change.",
      type: "number",
      fieldset: "registration",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "status",
      title: "Status",
      description:
        "Controls the public registration CTA: Open, Full, Waitlist, or Closed.",
      type: "string",
      fieldset: "registration",
      options: {
        list: statusOptions,
      },
      initialValue: "open",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "skillLevel",
      title: "Skill Level",
      description: "Skill level shown in the class snapshot.",
      type: "string",
      fieldset: "registration",
      options: {
        list: skillLevelOptions,
      },
      initialValue: "allLevels",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "certification",
      title: "Certification",
      description:
        "Certification name, or none if the class is not certification-based.",
      type: "string",
      fieldset: "registration",
      initialValue: "none",
    }),
    defineField({
      name: "certificationBody",
      title: "Certification Body",
      description: "Credentialing or internal body associated with the class.",
      type: "string",
      fieldset: "registration",
      options: {
        list: certificationBodyOptions,
      },
      initialValue: "none",
      validation: (rule) => rule.required(),
    }),
    stringListField(
      "audience",
      "Audience",
      "Who this class is intended for.",
      "content",
    ),
    stringListField(
      "prerequisites",
      "Prerequisites",
      "Requirements students should meet before attending.",
      "content",
    ),
    stringListField(
      "whatYouWillLearn",
      "What You Will Learn",
      "Learning outcomes shown on the class detail page.",
      "content",
    ),
    stringListField(
      "whatToBring",
      "What To Bring",
      "Items students should bring to class.",
      "content",
    ),
    stringListField(
      "safetyRequirements",
      "Safety Requirements",
      "Safety expectations and class/range conduct requirements.",
      "content",
    ),
    stringListField(
      "legalRequirements",
      "Legal Requirements",
      "Legal or eligibility requirements when relevant.",
      "content",
    ),
    defineField({
      name: "instructor",
      title: "Instructor",
      type: "string",
      description: "Choose the instructor shown on the class detail page.",
      fieldset: "relationships",
      options: {
        list: instructorOptions,
      },
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description: "Optional class image for future visual treatment.",
      fieldset: "relationships",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "imageAlt",
      title: "Image Alt Text",
      type: "string",
      description:
        "Short accessible description for the class image. Leave blank only if the image is decorative.",
      fieldset: "relationships",
    }),
    defineField({
      name: "relatedClasses",
      title: "Related Classes",
      type: "array",
      description:
        "Optional related classes shown at the bottom of the detail page.",
      fieldset: "relationships",
      of: [{ type: "reference", to: [{ type: "scheduledClass" }] }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "date",
      media: "image",
    },
  },
});
