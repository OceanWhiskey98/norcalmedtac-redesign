import { groq } from "next-sanity";
import {
  registrationPageContent as fallbackRegistrationPageContent,
  type RegistrationPageContent,
} from "@/lib/data";
import { sanityClient } from "@/lib/sanity/client";

type SanityRegistrationPageDocument = Partial<RegistrationPageContent>;

const registrationPageQuery = groq`
  *[_type == "registrationPage"][0] {
    heroLabel,
    heroHeadline,
    heroBody,
    noPaymentNote,
    seatAvailabilityFallbackMessage,
    formIntroHeadline,
    formIntroHelpText,
    successLabel,
    successHeadline,
    successBody
  }
`;

function normalizeRegistrationPageContent(
  document: SanityRegistrationPageDocument | null,
): RegistrationPageContent {
  return {
    heroLabel:
      document?.heroLabel ?? fallbackRegistrationPageContent.heroLabel,
    heroHeadline:
      document?.heroHeadline ?? fallbackRegistrationPageContent.heroHeadline,
    heroBody: document?.heroBody ?? fallbackRegistrationPageContent.heroBody,
    noPaymentNote:
      document?.noPaymentNote ??
      fallbackRegistrationPageContent.noPaymentNote,
    seatAvailabilityFallbackMessage:
      document?.seatAvailabilityFallbackMessage ??
      fallbackRegistrationPageContent.seatAvailabilityFallbackMessage,
    formIntroHeadline:
      document?.formIntroHeadline ??
      fallbackRegistrationPageContent.formIntroHeadline,
    formIntroHelpText:
      document?.formIntroHelpText ??
      fallbackRegistrationPageContent.formIntroHelpText,
    successLabel:
      document?.successLabel ?? fallbackRegistrationPageContent.successLabel,
    successHeadline:
      document?.successHeadline ??
      fallbackRegistrationPageContent.successHeadline,
    successBody:
      document?.successBody ?? fallbackRegistrationPageContent.successBody,
  };
}

export async function getRegistrationPage(): Promise<RegistrationPageContent> {
  if (!sanityClient) {
    return fallbackRegistrationPageContent;
  }

  try {
    const document =
      await sanityClient.fetch<SanityRegistrationPageDocument | null>(
        registrationPageQuery,
        {},
        { next: { revalidate: 60 } },
      );

    return normalizeRegistrationPageContent(document);
  } catch (error) {
    console.warn(
      "Sanity registration page fetch failed; falling back to local data.",
      error,
    );
    return fallbackRegistrationPageContent;
  }
}
