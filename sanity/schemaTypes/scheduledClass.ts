import { defineField, defineType } from "sanity";

const statusOptions = [
  { title: "Open", value: "open" },
  { title: "Limited Seats", value: "limited" },
  { title: "Waitlist", value: "waitlist" },
  { title: "Sold Out", value: "soldOut" },
  { title: "Registration Closed", value: "closed" },
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

const stringListField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "array",
    of: [{ type: "string" }],
    options: {
      layout: "tags",
    },
  });

export const scheduledClassType = defineType({
  name: "scheduledClass",
  title: "Scheduled Class",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: categoryOptions,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 6,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "startTime",
      title: "Start Time",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "endTime",
      title: "End Time",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "locationName",
      title: "Location Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "locationCity",
      title: "Location City",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "locationState",
      title: "Location State",
      type: "string",
      initialValue: "CA",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "locationAddress",
      title: "Location Address",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "capacity",
      title: "Capacity",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "seatsAvailable",
      title: "Seats Available",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: statusOptions,
      },
      initialValue: "open",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "skillLevel",
      title: "Skill Level",
      type: "string",
      options: {
        list: skillLevelOptions,
      },
      initialValue: "allLevels",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "certification",
      title: "Certification",
      type: "string",
      initialValue: "none",
    }),
    defineField({
      name: "certificationBody",
      title: "Certification Body",
      type: "string",
      options: {
        list: certificationBodyOptions,
      },
      initialValue: "none",
      validation: (rule) => rule.required(),
    }),
    stringListField("audience", "Audience"),
    stringListField("prerequisites", "Prerequisites"),
    stringListField("whatYouWillLearn", "What You Will Learn"),
    stringListField("whatToBring", "What To Bring"),
    stringListField("safetyRequirements", "Safety Requirements"),
    stringListField("legalRequirements", "Legal Requirements"),
    defineField({
      name: "instructor",
      title: "Instructor",
      type: "string",
      description:
        "Temporary instructor ID matching the site mock data, such as alex-morgan or jordan-reyes.",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "relatedClasses",
      title: "Related Classes",
      type: "array",
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
