import { groq } from "next-sanity";
import {
  groupTrainingPageContent as fallbackGroupTrainingPageContent,
  type GroupTrainingPageContent,
  type TitledSummary,
} from "@/lib/data";
import { sanityClient } from "@/lib/sanity/client";

type SanityTitledSummary = Partial<TitledSummary>;
type SanityGroupTrainingPageDocument = Partial<
  Omit<
    GroupTrainingPageContent,
    "useCases" | "trainingOptions" | "steps"
  > & {
    useCases: SanityTitledSummary[];
    trainingOptions: SanityTitledSummary[];
    steps: SanityTitledSummary[];
  }
>;

const groupTrainingPageQuery = groq`
  *[_type == "groupTrainingPage"][0] {
    heroLabel,
    heroHeadline,
    heroBody,
    useCases[] {
      title,
      summary
    },
    trainingOptionsLabel,
    trainingOptionsHeadline,
    trainingOptions[] {
      title,
      summary
    },
    stepsLabel,
    stepsHeadline,
    steps[] {
      title,
      summary
    },
    credentialsLabel,
    credentialsHeadline,
    credentialsBody,
    formLabel,
    formHeadline,
    formBody
  }
`;

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

function normalizeGroupTrainingPageContent(
  document: SanityGroupTrainingPageDocument | null,
): GroupTrainingPageContent {
  return {
    heroLabel:
      document?.heroLabel ?? fallbackGroupTrainingPageContent.heroLabel,
    heroHeadline:
      document?.heroHeadline ??
      fallbackGroupTrainingPageContent.heroHeadline,
    heroBody: document?.heroBody ?? fallbackGroupTrainingPageContent.heroBody,
    useCases: mergeTitledSummaryList(
      document?.useCases,
      fallbackGroupTrainingPageContent.useCases,
    ),
    trainingOptionsLabel:
      document?.trainingOptionsLabel ??
      fallbackGroupTrainingPageContent.trainingOptionsLabel,
    trainingOptionsHeadline:
      document?.trainingOptionsHeadline ??
      fallbackGroupTrainingPageContent.trainingOptionsHeadline,
    trainingOptions: mergeTitledSummaryList(
      document?.trainingOptions,
      fallbackGroupTrainingPageContent.trainingOptions,
    ),
    stepsLabel:
      document?.stepsLabel ?? fallbackGroupTrainingPageContent.stepsLabel,
    stepsHeadline:
      document?.stepsHeadline ??
      fallbackGroupTrainingPageContent.stepsHeadline,
    steps: mergeTitledSummaryList(
      document?.steps,
      fallbackGroupTrainingPageContent.steps,
    ),
    credentialsLabel:
      document?.credentialsLabel ??
      fallbackGroupTrainingPageContent.credentialsLabel,
    credentialsHeadline:
      document?.credentialsHeadline ??
      fallbackGroupTrainingPageContent.credentialsHeadline,
    credentialsBody:
      document?.credentialsBody ??
      fallbackGroupTrainingPageContent.credentialsBody,
    formLabel: document?.formLabel ?? fallbackGroupTrainingPageContent.formLabel,
    formHeadline:
      document?.formHeadline ??
      fallbackGroupTrainingPageContent.formHeadline,
    formBody: document?.formBody ?? fallbackGroupTrainingPageContent.formBody,
  };
}

export async function getGroupTrainingPage(): Promise<GroupTrainingPageContent> {
  if (!sanityClient) {
    return fallbackGroupTrainingPageContent;
  }

  try {
    const document =
      await sanityClient.fetch<SanityGroupTrainingPageDocument | null>(
        groupTrainingPageQuery,
        {},
        { next: { revalidate: 60 } },
      );

    return normalizeGroupTrainingPageContent(document);
  } catch (error) {
    console.warn(
      "Sanity group training page fetch failed; falling back to local data.",
      error,
    );
    return fallbackGroupTrainingPageContent;
  }
}
