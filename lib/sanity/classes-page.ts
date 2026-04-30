import { groq } from "next-sanity";
import {
  classesPageContent as fallbackClassesPageContent,
  type ClassesPageContent,
  type LinkSummary,
} from "@/lib/data";
import { sanityClient } from "@/lib/sanity/client";

type SanityLinkSummary = Partial<LinkSummary>;
type SanityClassesPageDocument = Partial<
  Omit<ClassesPageContent, "supportCards"> & {
    supportCards: SanityLinkSummary[];
  }
>;

const classesPageQuery = groq`
  *[_type == "classesPage"][0] {
    heroLabel,
    heroHeadline,
    heroBody,
    filterHelperText,
    featuredClassLabel,
    groupTrainingCtaHeadline,
    groupTrainingCtaBody,
    supportSectionHeadline,
    supportCards[] {
      title,
      summary,
      href
    }
  }
`;

function mergeSupportCards(
  value: SanityLinkSummary[] | undefined,
  fallback: LinkSummary[],
): LinkSummary[] {
  if (!Array.isArray(value) || value.length === 0) {
    return fallback;
  }

  const normalized = value.reduce<LinkSummary[]>((acc, item, index) => {
      const fallbackItem = fallback[index];
      const title = item.title ?? fallbackItem?.title;

      if (!title) {
        return acc;
      }

      acc.push({
        title,
        summary: item.summary ?? fallbackItem?.summary ?? "",
        href: item.href ?? fallbackItem?.href,
      });

      return acc;
    }, []);

  return normalized.length > 0 ? normalized : fallback;
}

function normalizeClassesPageContent(
  document: SanityClassesPageDocument | null,
): ClassesPageContent {
  return {
    heroLabel: document?.heroLabel ?? fallbackClassesPageContent.heroLabel,
    heroHeadline:
      document?.heroHeadline ?? fallbackClassesPageContent.heroHeadline,
    heroBody: document?.heroBody ?? fallbackClassesPageContent.heroBody,
    filterHelperText:
      document?.filterHelperText ?? fallbackClassesPageContent.filterHelperText,
    featuredClassLabel:
      document?.featuredClassLabel ??
      fallbackClassesPageContent.featuredClassLabel,
    groupTrainingCtaHeadline:
      document?.groupTrainingCtaHeadline ??
      fallbackClassesPageContent.groupTrainingCtaHeadline,
    groupTrainingCtaBody:
      document?.groupTrainingCtaBody ??
      fallbackClassesPageContent.groupTrainingCtaBody,
    supportSectionHeadline:
      document?.supportSectionHeadline ??
      fallbackClassesPageContent.supportSectionHeadline,
    supportCards: mergeSupportCards(
      document?.supportCards,
      fallbackClassesPageContent.supportCards,
    ),
  };
}

export async function getClassesPage(): Promise<ClassesPageContent> {
  if (!sanityClient) {
    return fallbackClassesPageContent;
  }

  try {
    const document =
      await sanityClient.fetch<SanityClassesPageDocument | null>(
        classesPageQuery,
        {},
        { next: { revalidate: 60 } },
      );

    return normalizeClassesPageContent(document);
  } catch (error) {
    console.warn(
      "Sanity classes page fetch failed; falling back to local data.",
      error,
    );
    return fallbackClassesPageContent;
  }
}
