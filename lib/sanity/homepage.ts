import { groq } from "next-sanity";
import {
  homepageContent as fallbackHomepageContent,
  type HomepageContent,
} from "@/lib/data";
import { sanityClient } from "@/lib/sanity/client";

type SanityHomepageContentDocument = Partial<HomepageContent>;

const homepageContentQuery = groq`
  *[_type == "homepageContent"][0] {
    heroLabel,
    heroHeadline,
    heroBody,
    heroTrustLine,
    "heroImage": heroImage.asset->url,
    heroImageAlt,
    learningPoints,
    trustStats,
    valuePoints,
    expectations,
    credentials,
    groupTrainingHeadline,
    groupTrainingBody,
    finalCtaHeadline,
    finalCtaBody
  }
`;

function stringListOrFallback(
  value: string[] | undefined,
  fallback: string[],
): string[] {
  return Array.isArray(value) && value.length > 0 ? value : fallback;
}

function normalizeHomepageContent(
  document: SanityHomepageContentDocument | null,
): HomepageContent {
  return {
    heroLabel: document?.heroLabel ?? fallbackHomepageContent.heroLabel,
    heroHeadline:
      document?.heroHeadline ?? fallbackHomepageContent.heroHeadline,
    heroBody: document?.heroBody ?? fallbackHomepageContent.heroBody,
    heroTrustLine:
      document?.heroTrustLine ?? fallbackHomepageContent.heroTrustLine,
    heroImage: document?.heroImage ?? fallbackHomepageContent.heroImage,
    heroImageAlt:
      document?.heroImageAlt ?? fallbackHomepageContent.heroImageAlt,
    learningPoints: stringListOrFallback(
      document?.learningPoints,
      fallbackHomepageContent.learningPoints,
    ),
    trustStats: stringListOrFallback(
      document?.trustStats,
      fallbackHomepageContent.trustStats,
    ),
    valuePoints: stringListOrFallback(
      document?.valuePoints,
      fallbackHomepageContent.valuePoints,
    ),
    expectations: stringListOrFallback(
      document?.expectations,
      fallbackHomepageContent.expectations,
    ),
    credentials: stringListOrFallback(
      document?.credentials,
      fallbackHomepageContent.credentials,
    ),
    groupTrainingHeadline:
      document?.groupTrainingHeadline ??
      fallbackHomepageContent.groupTrainingHeadline,
    groupTrainingBody:
      document?.groupTrainingBody ?? fallbackHomepageContent.groupTrainingBody,
    finalCtaHeadline:
      document?.finalCtaHeadline ?? fallbackHomepageContent.finalCtaHeadline,
    finalCtaBody:
      document?.finalCtaBody ?? fallbackHomepageContent.finalCtaBody,
  };
}

export async function getHomepageContent(): Promise<HomepageContent> {
  if (!sanityClient) {
    return fallbackHomepageContent;
  }

  try {
    const document =
      await sanityClient.fetch<SanityHomepageContentDocument | null>(
        homepageContentQuery,
        {},
        { next: { revalidate: 60 } },
      );

    return normalizeHomepageContent(document);
  } catch (error) {
    console.warn(
      "Sanity homepage content fetch failed; falling back to local data.",
      error,
    );
    return fallbackHomepageContent;
  }
}
