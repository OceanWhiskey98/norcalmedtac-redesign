import { groq } from "next-sanity";
import { sanityClient } from "@/lib/sanity/client";
import {
  classes as fallbackClasses,
  type CertificationBody,
  type ClassStatus,
  type SkillLevel,
  type TrainingClass,
} from "@/lib/data";

type SanityClassStatus = "open" | "full" | "waitlist" | "closed";
export type NormalizedTrainingClass = TrainingClass;

export type SanityScheduledClassDocument = {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  summary: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  duration?: string | null;
  locationName: string;
  locationCity: string;
  locationState: string;
  locationAddress?: string | null;
  price: number;
  capacity: number;
  seatsAvailable: number;
  status?: SanityClassStatus | null;
  skillLevel?: SkillLevel | null;
  certification?: string | null;
  certificationBody?: CertificationBody | null;
  audience?: string[] | null;
  prerequisites?: string[] | null;
  whatYouWillLearn?: string[] | null;
  whatToBring?: string[] | null;
  safetyRequirements?: string[] | null;
  legalRequirements?: string[] | null;
  instructorIds?: string[] | null;
  image?: string | null;
  relatedClassIds?: string[] | null;
};

type SanityClassBySlugResult =
  | { status: "found"; trainingClass: NormalizedTrainingClass }
  | { status: "missing" }
  | { status: "fallback" };

const classFields = groq`
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

const allClassesQuery = groq`
  *[_type == "scheduledClass" && defined(slug.current)] | order(date asc) {
    ${classFields}
  }
`;

const classBySlugQuery = groq`
  *[_type == "scheduledClass" && slug.current == $slug][0] {
    ${classFields}
  }
`;

function asStringList(value: string[] | null | undefined): string[] {
  return Array.isArray(value) ? value : [];
}

function normalizeStatus(
  status: SanityScheduledClassDocument["status"],
): ClassStatus {
  switch (status) {
    case "full":
      return "soldOut";
    case "waitlist":
      return "waitlist";
    case "closed":
      return "closed";
    case "open":
    default:
      return "open";
  }
}

function normalizeClass(
  document: SanityScheduledClassDocument,
): NormalizedTrainingClass {
  return {
    id: document.id,
    title: document.title,
    slug: document.slug,
    categoryId: document.categoryId,
    summary: document.summary,
    description: document.description,
    date: document.date,
    startTime: document.startTime,
    endTime: document.endTime,
    duration: document.duration ?? "",
    locationName: document.locationName,
    locationCity: document.locationCity,
    locationState: document.locationState,
    locationAddress: document.locationAddress ?? "",
    price: document.price,
    currency: "USD",
    capacity: document.capacity,
    seatsAvailable: document.seatsAvailable,
    status: normalizeStatus(document.status),
    skillLevel: document.skillLevel ?? "allLevels",
    certification: document.certification ?? "none",
    certificationBody: document.certificationBody ?? "none",
    audience: asStringList(document.audience),
    prerequisites: asStringList(document.prerequisites),
    whatYouWillLearn: asStringList(document.whatYouWillLearn),
    whatToBring: asStringList(document.whatToBring),
    safetyRequirements: asStringList(document.safetyRequirements),
    legalRequirements: asStringList(document.legalRequirements),
    instructorIds: asStringList(document.instructorIds),
    image: document.image ?? "",
    relatedClassIds: asStringList(document.relatedClassIds),
  };
}

function sortByDateAscending(
  trainingClasses: NormalizedTrainingClass[],
): NormalizedTrainingClass[] {
  return [...trainingClasses].sort((a, b) => a.date.localeCompare(b.date));
}

function isUpcomingClass(
  trainingClass: NormalizedTrainingClass,
  now = new Date(),
): boolean {
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  const classDate = new Date(`${trainingClass.date}T00:00:00`);
  return classDate >= today;
}

async function fetchSanityClasses(): Promise<NormalizedTrainingClass[] | null> {
  if (!sanityClient) {
    return null;
  }

  try {
    const documents = await sanityClient.fetch<SanityScheduledClassDocument[]>(
      allClassesQuery,
      {},
      { next: { revalidate: 60 } },
    );

    return sortByDateAscending(documents.map(normalizeClass));
  } catch (error) {
    console.warn(
      "Sanity class fetch failed; falling back to mock data.",
      error,
    );
    return null;
  }
}

async function fetchSanityClassBySlug(
  slug: string,
): Promise<SanityClassBySlugResult> {
  if (!sanityClient) {
    return { status: "fallback" };
  }

  try {
    const document =
      await sanityClient.fetch<SanityScheduledClassDocument | null>(
        classBySlugQuery,
        { slug },
        { next: { revalidate: 60 } },
      );

    return document
      ? { status: "found", trainingClass: normalizeClass(document) }
      : { status: "missing" };
  } catch (error) {
    console.warn(
      "Sanity class detail fetch failed; falling back to mock data.",
      error,
    );
    return { status: "fallback" };
  }
}

function getFallbackClasses(): NormalizedTrainingClass[] {
  return sortByDateAscending(fallbackClasses);
}

export async function getClasses(): Promise<NormalizedTrainingClass[]> {
  const sanityClasses = await fetchSanityClasses();
  return sanityClasses ?? getFallbackClasses();
}

export async function getUpcomingClasses(): Promise<NormalizedTrainingClass[]> {
  const trainingClasses = await getClasses();
  return trainingClasses.filter((trainingClass) =>
    isUpcomingClass(trainingClass),
  );
}

export async function getClassBySlug(
  slug: string,
): Promise<NormalizedTrainingClass | undefined> {
  const result = await fetchSanityClassBySlug(slug);

  if (result.status === "found") {
    return result.trainingClass;
  }

  if (result.status === "missing") {
    return undefined;
  }

  return getFallbackClasses().find(
    (trainingClass) => trainingClass.slug === slug,
  );
}

export async function getClassStaticParams(): Promise<Array<{ slug: string }>> {
  const trainingClasses = await getClasses();
  return trainingClasses.map((trainingClass) => ({
    slug: trainingClass.slug,
  }));
}
