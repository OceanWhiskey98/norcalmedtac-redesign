import { groq } from "next-sanity";
import {
  aboutPageContent as baseAboutPageContent,
  type AboutPageContent,
  type SiteSettings,
  type TextItem,
  type TitledSummary,
} from "@/lib/data";
import { sanityClient } from "@/lib/sanity/client";
import { getSiteSettings } from "@/lib/sanity/site-settings";

type SanityTextItem = Partial<TextItem>;
type SanityTitledSummary = Partial<TitledSummary>;
type SanityAboutPageDocument = Partial<
  Omit<AboutPageContent, "audiences" | "philosophyPoints"> & {
    audiences: SanityTextItem[];
    philosophyPoints: SanityTitledSummary[];
  }
>;

const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    heroLabel,
    heroHeadline,
    heroBody,
    missionLabel,
    missionHeadline,
    missionBody,
    audiencesLabel,
    audiencesHeadline,
    audiences[] {
      text
    },
    philosophyPoints[] {
      title,
      summary
    },
    instructorLabel,
    instructorHeadline,
    finalCtaLabel,
    finalCtaHeadline,
    finalCtaBody
  }
`;

function renderSiteTokens(value: string, siteSettings: SiteSettings): string {
  return value
    .replaceAll("{businessName}", siteSettings.businessName || "NorCal MedTac")
    .replaceAll(
      "{serviceArea}",
      siteSettings.serviceArea || "Northern California",
    );
}

function renderAboutPageTokens(
  content: AboutPageContent,
  siteSettings: SiteSettings,
): AboutPageContent {
  return {
    ...content,
    heroBody: renderSiteTokens(content.heroBody, siteSettings),
    missionBody: renderSiteTokens(content.missionBody, siteSettings),
  };
}

function mergeTextItems(
  value: SanityTextItem[] | undefined,
  fallback: TextItem[],
): TextItem[] {
  if (!Array.isArray(value) || value.length === 0) {
    return fallback;
  }

  const normalized = value
    .map((item, index) => {
      const text = item.text ?? fallback[index]?.text;
      return text ? { text } : null;
    })
    .filter((item): item is TextItem => item !== null);

  return normalized.length > 0 ? normalized : fallback;
}

function mergeTitledSummaryList(
  value: SanityTitledSummary[] | undefined,
  fallback: TitledSummary[],
): TitledSummary[] {
  if (!Array.isArray(value) || value.length === 0) {
    return fallback;
  }

  const normalized = value
    .map((item, index) => {
      const fallbackItem = fallback[index];
      const title = item.title ?? fallbackItem?.title;

      if (!title) {
        return null;
      }

      return {
        title,
        summary: item.summary ?? fallbackItem?.summary ?? "",
      };
    })
    .filter((item): item is TitledSummary => item !== null);

  return normalized.length > 0 ? normalized : fallback;
}

function normalizeAboutPageContent(
  document: SanityAboutPageDocument | null,
  fallback: AboutPageContent,
): AboutPageContent {
  return {
    heroLabel: document?.heroLabel ?? fallback.heroLabel,
    heroHeadline: document?.heroHeadline ?? fallback.heroHeadline,
    heroBody: document?.heroBody ?? fallback.heroBody,
    missionLabel: document?.missionLabel ?? fallback.missionLabel,
    missionHeadline: document?.missionHeadline ?? fallback.missionHeadline,
    missionBody: document?.missionBody ?? fallback.missionBody,
    audiencesLabel: document?.audiencesLabel ?? fallback.audiencesLabel,
    audiencesHeadline:
      document?.audiencesHeadline ?? fallback.audiencesHeadline,
    audiences: mergeTextItems(document?.audiences, fallback.audiences),
    philosophyPoints: mergeTitledSummaryList(
      document?.philosophyPoints,
      fallback.philosophyPoints,
    ),
    instructorLabel: document?.instructorLabel ?? fallback.instructorLabel,
    instructorHeadline:
      document?.instructorHeadline ?? fallback.instructorHeadline,
    finalCtaLabel: document?.finalCtaLabel ?? fallback.finalCtaLabel,
    finalCtaHeadline:
      document?.finalCtaHeadline ?? fallback.finalCtaHeadline,
    finalCtaBody: document?.finalCtaBody ?? fallback.finalCtaBody,
  };
}

export async function getAboutPage(): Promise<AboutPageContent> {
  const siteSettings = await getSiteSettings();
  const fallback = renderAboutPageTokens(baseAboutPageContent, siteSettings);

  if (!sanityClient) {
    return fallback;
  }

  try {
    const document =
      await sanityClient.fetch<SanityAboutPageDocument | null>(
        aboutPageQuery,
        {},
        { next: { revalidate: 60 } },
      );

    return renderAboutPageTokens(
      normalizeAboutPageContent(document, fallback),
      siteSettings,
    );
  } catch (error) {
    console.warn(
      "Sanity about page fetch failed; falling back to local data.",
      error,
    );
    return fallback;
  }
}
