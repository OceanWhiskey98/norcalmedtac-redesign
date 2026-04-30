import { defineField, defineType } from "sanity";

const categoryOptions = [
  { title: "Apparel", value: "Apparel" },
  { title: "Patches", value: "Patches" },
  { title: "Gear", value: "Gear" },
  { title: "Gift Certificates", value: "Gift Certificates" },
  { title: "Accessories", value: "Accessories" },
];

const inventoryStatusOptions = [
  { title: "In Stock", value: "inStock" },
  { title: "Low Stock", value: "lowStock" },
  { title: "Out of Stock", value: "outOfStock" },
];

export const merchProductType = defineType({
  name: "merchProduct",
  title: "Merch Product",
  type: "document",
  fieldsets: [
    {
      name: "basics",
      title: "Product Basics",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "commerce",
      title: "Merch Display",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "media",
      title: "Images",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "organization",
      title: "Organization",
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      fieldset: "basics",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
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
      type: "string",
      fieldset: "basics",
      options: {
        list: categoryOptions,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      fieldset: "basics",
    }),
    defineField({
      name: "price",
      title: "Price",
      description: "Display price only. This does not enable checkout.",
      type: "number",
      fieldset: "commerce",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      fieldset: "commerce",
      initialValue: "USD",
      options: {
        list: [{ title: "USD", value: "USD" }],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "variants",
      title: "Variants",
      description: "Display-only variant groups such as size, color, or value.",
      type: "array",
      fieldset: "commerce",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "values",
              title: "Values",
              type: "array",
              of: [{ type: "string" }],
              options: {
                layout: "tags",
              },
            }),
          ],
          preview: {
            select: {
              title: "label",
              values: "values",
            },
            prepare(selection) {
              return {
                title: selection.title,
                subtitle: Array.isArray(selection.values)
                  ? selection.values.join(", ")
                  : undefined,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "inventoryStatus",
      title: "Inventory Status",
      description: "Display status only. This does not decrement inventory.",
      type: "string",
      fieldset: "commerce",
      options: {
        list: inventoryStatusOptions,
      },
      initialValue: "inStock",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shoppingUrl",
      title: "Shopping URL",
      description:
        "Placeholder or external link used by the merch card button. Leave blank to use /merch/[slug].",
      type: "string",
      fieldset: "commerce",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      fieldset: "media",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: "imageAlt",
      title: "Image Alt Text",
      type: "string",
      fieldset: "media",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      fieldset: "organization",
      initialValue: false,
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      fieldset: "organization",
      initialValue: 100,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "images.0",
    },
  },
});
