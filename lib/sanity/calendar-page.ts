import { groq } from "next-sanity";
import {
  calendarPageContent as fallbackCalendarPageContent,
  type CalendarPageContent,
} from "@/lib/data";
import { sanityClient } from "@/lib/sanity/client";

type SanityCalendarPageDocument = Partial<CalendarPageContent>;

const calendarPageQuery = groq`
  *[_type == "calendarPage"][0] {
    heroLabel,
    heroHeadline,
    heroBody,
    filterIntroCopy,
    emptyStateHeadline,
    emptyStateBody
  }
`;

function normalizeCalendarPageContent(
  document: SanityCalendarPageDocument | null,
): CalendarPageContent {
  return {
    heroLabel: document?.heroLabel ?? fallbackCalendarPageContent.heroLabel,
    heroHeadline:
      document?.heroHeadline ?? fallbackCalendarPageContent.heroHeadline,
    heroBody: document?.heroBody ?? fallbackCalendarPageContent.heroBody,
    filterIntroCopy:
      document?.filterIntroCopy ??
      fallbackCalendarPageContent.filterIntroCopy,
    emptyStateHeadline:
      document?.emptyStateHeadline ??
      fallbackCalendarPageContent.emptyStateHeadline,
    emptyStateBody:
      document?.emptyStateBody ?? fallbackCalendarPageContent.emptyStateBody,
  };
}

export async function getCalendarPage(): Promise<CalendarPageContent> {
  if (!sanityClient) {
    return fallbackCalendarPageContent;
  }

  try {
    const document =
      await sanityClient.fetch<SanityCalendarPageDocument | null>(
        calendarPageQuery,
        {},
        { next: { revalidate: 60 } },
      );

    return normalizeCalendarPageContent(document);
  } catch (error) {
    console.warn(
      "Sanity calendar page fetch failed; falling back to local data.",
      error,
    );
    return fallbackCalendarPageContent;
  }
}
