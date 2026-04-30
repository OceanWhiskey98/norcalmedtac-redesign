import { groq } from "next-sanity";
import {
  contactPageContent as baseContactPageContent,
  type BadgeTone,
  type ContactCard,
  type ContactPageContent,
  type FaqSummary,
  type SiteSettings,
} from "@/lib/data";
import { sanityClient } from "@/lib/sanity/client";
import { getSiteSettings } from "@/lib/sanity/site-settings";

type SanityContactCard = Partial<ContactCard>;
type SanityFaqSummary = Partial<FaqSummary>;
type SanityContactPageDocument = Partial<
  Omit<ContactPageContent, "contactCards" | "faqs"> & {
    contactCards: SanityContactCard[];
    faqs: SanityFaqSummary[];
  }
>;

const badgeTones: BadgeTone[] = [
  "olive",
  "red",
  "gold",
  "graphite",
  "neutral",
];

const contactPageQuery = groq`
  *[_type == "contactPage"][0] {
    heroLabel,
    heroHeadline,
    heroBody,
    formLabel,
    formHeadline,
    formBody,
    contactCards[] {
      label,
      title,
      body,
      tone
    },
    faqLabel,
    faqHeadline,
    faqs[] {
      question,
      answer
    }
  }
`;

function isBadgeTone(value: string | undefined): value is BadgeTone {
  return badgeTones.includes(value as BadgeTone);
}

function getFallbackContactPageContent(
  siteSettings: SiteSettings,
): ContactPageContent {
  const contactMethods = [
    siteSettings.contactEmail ? `Email: ${siteSettings.contactEmail}` : "",
    siteSettings.phone ? `Phone: ${siteSettings.phone}` : "",
  ].filter(Boolean);
  const serviceArea =
    siteSettings.serviceArea || baseContactPageContent.contactCards[1].title;

  return {
    ...baseContactPageContent,
    contactCards: baseContactPageContent.contactCards.map((card) => {
      if (card.label === "Training Inquiry" && contactMethods.length > 0) {
        return {
          ...card,
          body: `${card.body} ${contactMethods.join(" ")}`,
        };
      }

      if (card.label === "Service Area") {
        return {
          ...card,
          title: serviceArea,
          body: `Training is centered on ${serviceArea} with scheduled, partner-location, and group training options.`,
        };
      }

      return card;
    }),
  };
}

function mergeContactCards(
  value: SanityContactCard[] | undefined,
  fallback: ContactCard[],
): ContactCard[] {
  if (!Array.isArray(value) || value.length === 0) {
    return fallback;
  }

  const normalized = value
    .map((item, index) => {
      const fallbackItem = fallback[index];
      const label = item.label ?? fallbackItem?.label;
      const title = item.title ?? fallbackItem?.title;

      if (!label || !title) {
        return null;
      }

      return {
        label,
        title,
        body: item.body ?? fallbackItem?.body ?? "",
        tone: isBadgeTone(item.tone) ? item.tone : fallbackItem?.tone ?? "neutral",
      };
    })
    .filter((item): item is ContactCard => item !== null);

  return normalized.length > 0 ? normalized : fallback;
}

function mergeFaqs(
  value: SanityFaqSummary[] | undefined,
  fallback: FaqSummary[],
): FaqSummary[] {
  if (!Array.isArray(value) || value.length === 0) {
    return fallback;
  }

  const normalized = value
    .map((item, index) => {
      const fallbackItem = fallback[index];
      const question = item.question ?? fallbackItem?.question;

      if (!question) {
        return null;
      }

      return {
        question,
        answer: item.answer ?? fallbackItem?.answer ?? "",
      };
    })
    .filter((item): item is FaqSummary => item !== null);

  return normalized.length > 0 ? normalized : fallback;
}

function normalizeContactPageContent(
  document: SanityContactPageDocument | null,
  fallback: ContactPageContent,
): ContactPageContent {
  return {
    heroLabel: document?.heroLabel ?? fallback.heroLabel,
    heroHeadline: document?.heroHeadline ?? fallback.heroHeadline,
    heroBody: document?.heroBody ?? fallback.heroBody,
    formLabel: document?.formLabel ?? fallback.formLabel,
    formHeadline: document?.formHeadline ?? fallback.formHeadline,
    formBody: document?.formBody ?? fallback.formBody,
    faqLabel: document?.faqLabel ?? fallback.faqLabel,
    faqHeadline: document?.faqHeadline ?? fallback.faqHeadline,
    contactCards: mergeContactCards(document?.contactCards, fallback.contactCards),
    faqs: mergeFaqs(document?.faqs, fallback.faqs),
  };
}

export async function getContactPage(): Promise<ContactPageContent> {
  const fallback = getFallbackContactPageContent(await getSiteSettings());

  if (!sanityClient) {
    return fallback;
  }

  try {
    const document =
      await sanityClient.fetch<SanityContactPageDocument | null>(
        contactPageQuery,
        {},
        { next: { revalidate: 60 } },
      );

    return normalizeContactPageContent(document, fallback);
  } catch (error) {
    console.warn(
      "Sanity contact page fetch failed; falling back to local data.",
      error,
    );
    return fallback;
  }
}
