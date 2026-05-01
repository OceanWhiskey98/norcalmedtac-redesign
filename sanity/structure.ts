import type { StructureResolver } from "sanity/structure";

const singletonTypes = new Set([
  "siteSettings",
  "homepageContent",
  "aboutPage",
  "groupTrainingPage",
  "contactPage",
  "classesPage",
  "calendarPage",
  "registrationPage",
]);

const groupedDocumentTypes = new Set([
  "scheduledClass",
  "instructor",
  "merchProduct",
]);

export const studioStructure: StructureResolver = (S) => {
  const sitePageItems = [
    S.listItem()
      .title("Homepage Content")
      .id("homepageContent")
      .child(
        S.document()
          .schemaType("homepageContent")
          .documentId("homepageContent"),
      ),
    S.listItem()
      .title("About Page")
      .id("aboutPage")
      .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
    S.listItem()
      .title("Group Training Page")
      .id("groupTrainingPage")
      .child(
        S.document()
          .schemaType("groupTrainingPage")
          .documentId("groupTrainingPage"),
      ),
    S.listItem()
      .title("Contact Page")
      .id("contactPage")
      .child(S.document().schemaType("contactPage").documentId("contactPage")),
    S.listItem()
      .title("Classes Page")
      .id("classesPage")
      .child(S.document().schemaType("classesPage").documentId("classesPage")),
    S.listItem()
      .title("Calendar Page")
      .id("calendarPage")
      .child(
        S.document().schemaType("calendarPage").documentId("calendarPage"),
      ),
    S.listItem()
      .title("Registration Page")
      .id("registrationPage")
      .child(
        S.document()
          .schemaType("registrationPage")
          .documentId("registrationPage"),
      ),
  ];

  return S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Pages")
        .id("sitePages")
        .child(S.list().title("Site Pages").items(sitePageItems)),
      S.listItem()
        .title("Classes")
        .id("classesGroup")
        .child(
          S.list()
            .title("Classes")
            .items([
              S.listItem()
                .title("Scheduled Classes")
                .id("scheduledClasses")
                .child(
                  S.documentTypeList("scheduledClass").title(
                    "Scheduled Classes",
                  ),
                ),
            ]),
        ),
      S.listItem()
        .title("People")
        .id("peopleGroup")
        .child(
          S.list()
            .title("People")
            .items([
              S.listItem()
                .title("Instructors")
                .id("instructors")
                .child(S.documentTypeList("instructor").title("Instructors")),
            ]),
        ),
      S.listItem()
        .title("Merch")
        .id("merchGroup")
        .child(
          S.list()
            .title("Merch")
            .items([
              S.listItem()
                .title("Merch Products")
                .id("merchProducts")
                .child(
                  S.documentTypeList("merchProduct").title("Merch Products"),
                ),
            ]),
        ),
      S.listItem()
        .title("Settings")
        .id("settingsGroup")
        .child(
          S.list()
            .title("Settings")
            .items([
              S.listItem()
                .title("Site Settings")
                .id("siteSettings")
                .child(
                  S.document()
                    .schemaType("siteSettings")
                    .documentId("siteSettings"),
                ),
            ]),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => {
          const id = listItem.getId() ?? "";
          return !singletonTypes.has(id) && !groupedDocumentTypes.has(id);
        },
      ),
    ]);
};

