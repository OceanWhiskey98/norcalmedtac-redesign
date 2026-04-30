import { groq } from "next-sanity";
import { sanityClient } from "@/lib/sanity/client";
import {
  classes as fallbackClasses,
  type TrainingClass,
} from "@/lib/data";

type SanityClass = Omit<TrainingClass, "currency" | "status"> & {
  currency?: "USD";
  status?: TrainingClass["status"] | "full";
};

const scheduledClassProjection = groq`
  _id,
  "id": _id,
  title,
  "slug": slug.current,
  "categoryId": category,
  summary,
  description,
  date,
  startTime,
  endTime,
  duration,
  locationName,
  locationCity,
  locationState,
  locationAddress,
  price,
  "currency": "USD",
  capacity,
  seatsAvailable,
  status,
  skillLevel,
  certification,
  certificationBody,
  audience,
  prerequisites,
  whatYouWillLearn,
  whatToBring,
  safetyRequirements,
  legalRequirements,
  "instructorIds": select(defined(instructor) => [instructor], []),
  "image": image.asset->url,
  "relatedClassIds": relatedClasses[]->_id
`;

const scheduledClassesQuery = groq`
  *[_type == "scheduledClass" && defined(slug.current)] | order(date asc) {
    ${scheduledClassProjection}
  }
`;

const scheduledClassBySlugQuery = groq`
  *[_type == "scheduledClass" && slug.current == $slug][0] {
    ${scheduledClassProjection}
  }
`;

function normalizeStringList(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function normalizeStatus(status: SanityClass["status"]): TrainingClass["status"] {
  if (status === "full") {
    return "soldOut";
  }

  return status ?? "open";
}

function normalizeClass(item: SanityClass): TrainingClass {
  return {
    ...item,
    currency: "USD",
    status: normalizeStatus(item.status),
    locationAddress: item.locationAddress ?? "",
    certification: item.certification ?? "none",
    audience: normalizeStringList(item.audience),
    prerequisites: normalizeStringList(item.prerequisites),
    whatYouWillLearn: normalizeStringList(item.whatYouWillLearn),
    whatToBring: normalizeStringList(item.whatToBring),
    safetyRequirements: normalizeStringList(item.safetyRequirements),
    legalRequirements: normalizeStringList(item.legalRequirements),
    instructorIds: normalizeStringList(item.instructorIds),
    image: item.image ?? "",
    relatedClassIds: normalizeStringList(item.relatedClassIds),
  };
}

async function fetchSanityClasses(): Promise<TrainingClass[] | null> {
  if (!sanityClient) {
    return null;
  }

  try {
    const results = await sanityClient.fetch<SanityClass[]>(
      scheduledClassesQuery,
      {},
      { next: { revalidate: 60 } },
    );

    return results.map(normalizeClass);
  } catch (error) {
    console.warn("Sanity class fetch failed; falling back to mock data.", error);
    return null;
  }
}

export async function getClasses(): Promise<TrainingClass[]> {
  const sanityClasses = await fetchSanityClasses();
  return sanityClasses ?? fallbackClasses;
}

export async function getClassBySlug(
  slug: string,
): Promise<TrainingClass | undefined> {
  if (sanityClient) {
    try {
      const result = await sanityClient.fetch<SanityClass | null>(
        scheduledClassBySlugQuery,
        { slug },
        { next: { revalidate: 60 } },
      );

      if (result) {
        return normalizeClass(result);
      }
    } catch (error) {
      console.warn(
        "Sanity class detail fetch failed; falling back to mock data.",
        error,
      );
    }
  }

  return fallbackClasses.find((trainingClass) => trainingClass.slug === slug);
}

export async function getClassStaticParams() {
  const trainingClasses = await getClasses();
  return trainingClasses.map((trainingClass) => ({
    slug: trainingClass.slug,
  }));
}
