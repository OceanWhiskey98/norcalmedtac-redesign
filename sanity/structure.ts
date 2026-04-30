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

export const studioStructure: StructureResolver = (S) => {
  const singletonItems = [
    S.listItem()
      .title("Site Settings")
      .id("siteSettings")
      .child(
        S.document().schemaType("siteSettings").documentId("siteSettings"),
      ),
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

  const collectionItems = [
    S.listItem()
      .title("Merch Products")
      .id("merchProducts")
      .child(S.documentTypeList("merchProduct").title("Merch Products")),
    S.listItem()
      .title("Scheduled Classes")
      .id("scheduledClasses")
      .child(S.documentTypeList("scheduledClass").title("Scheduled Classes")),
    S.listItem()
      .title("Instructors")
      .id("instructors")
      .child(S.documentTypeList("instructor").title("Instructors")),
  ];

  return S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Page Content")
        .id("pageContent")
        .child(S.list().title("Page Content").items(singletonItems)),
      ...collectionItems,
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !singletonTypes.has(listItem.getId() ?? ""),
      ),
    ]);
};

