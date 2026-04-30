import { groq } from "next-sanity";
import { instructors as fallbackInstructors, type Instructor } from "@/lib/data";
import { sanityClient } from "@/lib/sanity/client";

type SanityInstructorDocument = {
  id?: string | null;
  name?: string | null;
  slug?: string | null;
  role?: string | null;
  bio?: string | null;
  credentials?: string[] | null;
  specialties?: string[] | null;
  certificationBodies?: string[] | null;
  image?: string | null;
  imageAlt?: string | null;
  featured?: boolean | null;
};

const instructorsQuery = groq`
  *[_type == "instructor"] | order(sortOrder asc, name asc) {
    "id": coalesce(slug.current, _id),
    name,
    "slug": slug.current,
    role,
    bio,
    credentials,
    specialties,
    certificationBodies,
    "image": image.asset->url,
    imageAlt,
    featured
  }
`;

function asStringList(value: string[] | null | undefined): string[] {
  return Array.isArray(value) ? value : [];
}

function normalizeInstructor(document: SanityInstructorDocument): Instructor {
  return {
    id: document.slug ?? document.id ?? "",
    name: document.name ?? "",
    role: document.role ?? "",
    bio: document.bio ?? "",
    credentials: asStringList(document.credentials),
    specialties: asStringList(document.specialties),
    certificationBodies: asStringList(document.certificationBodies),
    image: document.image ?? "",
    imageAlt: document.imageAlt ?? "",
    featured: document.featured ?? false,
  };
}

export async function getInstructors(): Promise<Instructor[]> {
  if (!sanityClient) {
    return fallbackInstructors;
  }

  try {
    const documents =
      await sanityClient.fetch<SanityInstructorDocument[]>(
        instructorsQuery,
        {},
        { next: { revalidate: 60 } },
      );

    const normalizedInstructors = documents
      .map(normalizeInstructor)
      .filter((instructor) => instructor.id && instructor.name);

    return normalizedInstructors.length > 0
      ? normalizedInstructors
      : fallbackInstructors;
  } catch (error) {
    console.warn(
      "Sanity instructor fetch failed; falling back to local data.",
      error,
    );
    return fallbackInstructors;
  }
}
