export const PLACEHOLDER_IMAGES = {
  hero: {
    primary: "/images/placeholders/hero/hero-training-classroom-01.webp",
    medicalSkills: "/images/placeholders/hero/hero-medical-skills-01.webp",
  },

  classes: {
    cpr: "/images/placeholders/classes/class-cpr-01.webp",
    firstAid: "/images/placeholders/classes/class-first-aid-01.webp",
    stopTheBleed: "/images/placeholders/classes/class-stop-the-bleed-01.webp",
    defensiveMedicine: "/images/placeholders/classes/class-defensive-medicine-01.webp",
    firearmsSafety: "/images/placeholders/classes/class-firearms-safety-01.webp",
    tacticalMedicine: "/images/placeholders/classes/class-tactical-medicine-01.webp",
    fallback: "/images/placeholders/classes/class-general-training-01.webp",
  },

  instructors: {
    fallbackOne: "/images/placeholders/instructors/instructor-placeholder-01.webp",
    fallbackTwo: "/images/placeholders/instructors/instructor-placeholder-02.webp",
    fallbackThree: "/images/placeholders/instructors/instructor-placeholder-03.webp",
  },

  groupTraining: {
    workplace: "/images/placeholders/group-training/group-workplace-training-01.webp",
    privateClass: "/images/placeholders/group-training/group-private-class-01.webp",
    teamTraining: "/images/placeholders/group-training/group-team-medical-training-01.webp",
  },

  about: {
    trainingEnvironment: "/images/placeholders/about/about-training-environment-01.webp",
    equipmentLayout: "/images/placeholders/about/about-equipment-layout-01.webp",
    instructorDemo: "/images/placeholders/about/about-instructor-demo-01.webp",
  },

  merch: {
    medicalKit: "/images/placeholders/merch/merch-medical-kit-01.webp",
    patch: "/images/placeholders/merch/merch-patch-01.webp",
    shirt: "/images/placeholders/merch/merch-shirt-01.webp",
    gear: "/images/placeholders/merch/merch-gear-01.webp",
    fallback: "/images/placeholders/merch/merch-gear-01.webp",
  },

  backgrounds: {
    darkTrainingTable: "/images/placeholders/backgrounds/bg-dark-training-table-01.webp",
    medicalGearFlatlay: "/images/placeholders/backgrounds/bg-medical-gear-flatlay-01.webp",
    classroomWide: "/images/placeholders/backgrounds/bg-classroom-wide-01.webp",
  },
} as const;

function normalizePlaceholderInput(value?: string): string {
  return value?.toLowerCase().replace(/[_-]+/g, " ").trim() ?? "";
}

function matchesAny(text: string, terms: string[]): boolean {
  return terms.some((term) => text.includes(term));
}

export function getClassPlaceholderImage(
  primaryInput?: string,
  secondaryInput?: string,
) {
  const normalizedPrimary = normalizePlaceholderInput(primaryInput);
  const normalizedSecondary = normalizePlaceholderInput(secondaryInput);
  const normalized = [normalizedPrimary, normalizedSecondary]
    .filter(Boolean)
    .join(" ");

  if (matchesAny(normalized, ["cpr"])) {
    return PLACEHOLDER_IMAGES.classes.cpr;
  }

  if (matchesAny(normalized, ["first aid", "firstaid"])) {
    return PLACEHOLDER_IMAGES.classes.firstAid;
  }

  if (matchesAny(normalized, ["bleed", "trauma"])) {
    return PLACEHOLDER_IMAGES.classes.stopTheBleed;
  }

  if (matchesAny(normalized, ["tactical"])) {
    return PLACEHOLDER_IMAGES.classes.tacticalMedicine;
  }

  if (matchesAny(normalized, ["firearm", "handgun", "rifle", "shotgun", "ccw"])) {
    return PLACEHOLDER_IMAGES.classes.firearmsSafety;
  }

  if (matchesAny(normalized, ["defensive"])) {
    return PLACEHOLDER_IMAGES.classes.defensiveMedicine;
  }

  return PLACEHOLDER_IMAGES.classes.fallback;
}

export function getMerchPlaceholderImage(input?: string) {
  const normalized = normalizePlaceholderInput(input);

  if (matchesAny(normalized, ["shirt", "tee", "apparel"])) {
    return PLACEHOLDER_IMAGES.merch.shirt;
  }

  if (matchesAny(normalized, ["patch"])) {
    return PLACEHOLDER_IMAGES.merch.patch;
  }

  if (matchesAny(normalized, ["kit", "medical", "trauma", "aid"])) {
    return PLACEHOLDER_IMAGES.merch.medicalKit;
  }

  if (matchesAny(normalized, ["gear", "pouch", "equipment"])) {
    return PLACEHOLDER_IMAGES.merch.gear;
  }

  return PLACEHOLDER_IMAGES.merch.fallback;
}
