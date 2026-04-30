export type ClassStatus = "open" | "limited" | "waitlist" | "soldOut" | "closed";
export type SkillLevel = "beginner" | "intermediate" | "advanced" | "allLevels";
export type CertificationBody =
  | "AHA"
  | "ASHI"
  | "ITLS"
  | "EMT"
  | "NRA"
  | "CCW"
  | "Internal"
  | "none";

export type TrainingClass = {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  summary: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: string;
  locationName: string;
  locationCity: string;
  locationState: string;
  locationAddress: string;
  price: number;
  currency: "USD";
  capacity: number;
  seatsAvailable: number;
  status: ClassStatus;
  skillLevel: SkillLevel;
  certification: string | "none";
  certificationBody: CertificationBody;
  audience: string[];
  prerequisites: string[];
  whatYouWillLearn: string[];
  whatToBring: string[];
  safetyRequirements: string[];
  legalRequirements: string[];
  instructorIds: string[];
  image: string;
  imageAlt: string;
  relatedClassIds: string[];
};

export type Instructor = {
  id: string;
  name: string;
  role: string;
  bio: string;
  credentials: string[];
  specialties: string[];
  certificationBodies: string[];
  image: string;
  imageAlt: string;
  featured: boolean;
};

export type SiteSettings = {
  businessName: string;
  tagline: string;
  serviceArea: string;
  contactEmail: string;
  phone: string;
  logo: string;
  logoAlt: string;
  socialLinks: Array<{
    label: string;
    url: string;
  }>;
};

export type HomepageContent = {
  heroLabel: string;
  heroHeadline: string;
  heroBody: string;
  heroTrustLine: string;
  heroImage: string;
  heroImageAlt: string;
  learningPoints: string[];
  trustStats: string[];
  valuePoints: string[];
  expectations: string[];
  credentials: string[];
  groupTrainingHeadline: string;
  groupTrainingBody: string;
  finalCtaHeadline: string;
  finalCtaBody: string;
};

export type TitledSummary = {
  title: string;
  summary: string;
};

export type GroupTrainingPageContent = {
  heroLabel: string;
  heroHeadline: string;
  heroBody: string;
  useCases: TitledSummary[];
  trainingOptionsLabel: string;
  trainingOptionsHeadline: string;
  trainingOptions: TitledSummary[];
  stepsLabel: string;
  stepsHeadline: string;
  steps: TitledSummary[];
  credentialsLabel: string;
  credentialsHeadline: string;
  credentialsBody: string;
  formLabel: string;
  formHeadline: string;
  formBody: string;
};

export type BadgeTone = "olive" | "red" | "gold" | "graphite" | "neutral";

export type ContactCard = {
  label: string;
  title: string;
  body: string;
  tone: BadgeTone;
};

export type FaqSummary = {
  question: string;
  answer: string;
};

export type ContactPageContent = {
  heroLabel: string;
  heroHeadline: string;
  heroBody: string;
  formLabel: string;
  formHeadline: string;
  formBody: string;
  faqLabel: string;
  faqHeadline: string;
  contactCards: ContactCard[];
  faqs: FaqSummary[];
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  summary: string;
  parentCategoryId: string | null;
  accent: "olive" | "red" | "gold" | "graphite";
  sortOrder: number;
};

export type Merchandise = {
  id: string;
  title: string;
  slug: string;
  category: "Apparel" | "Patches" | "Gear" | "Gift Certificates" | "Accessories";
  description: string;
  price: number;
  currency: "USD";
  images: string[];
  variants: string[];
  inventoryStatus: "inStock" | "lowStock" | "outOfStock";
  shoppingUrl: string;
  featured: boolean;
};

export const categories: Category[] = [
  {
    id: "medical-certification",
    name: "Medical & Certification Courses",
    slug: "medical-certification-courses",
    summary: "CPR, first aid, emergency care, and certification-focused training.",
    parentCategoryId: null,
    accent: "red",
    sortOrder: 1,
  },
  {
    id: "tactical-medicine",
    name: "Tactical Medicine",
    slug: "tactical-medicine",
    summary: "Practical casualty care for austere and high-pressure environments.",
    parentCategoryId: null,
    accent: "olive",
    sortOrder: 2,
  },
  {
    id: "defensive-firearms",
    name: "Defensive Firearms",
    slug: "defensive-firearms",
    summary: "Safety-first defensive skill development for responsible students.",
    parentCategoryId: null,
    accent: "graphite",
    sortOrder: 3,
  },
  {
    id: "concealed-carry",
    name: "Concealed Carry",
    slug: "concealed-carry",
    summary: "Concealed carry preparation with legal and practical requirements.",
    parentCategoryId: null,
    accent: "gold",
    sortOrder: 4,
  },
  {
    id: "private-instruction",
    name: "Private Instruction",
    slug: "private-instruction",
    summary: "Focused instruction for individual skill goals.",
    parentCategoryId: null,
    accent: "olive",
    sortOrder: 5,
  },
  {
    id: "group-workplace",
    name: "Group / Workplace Training",
    slug: "group-workplace-training",
    summary: "Mobile and custom training for businesses, clubs, and organizations.",
    parentCategoryId: null,
    accent: "red",
    sortOrder: 6,
  },
  {
    id: "special-events",
    name: "Special Events",
    slug: "special-events",
    summary: "Scheduled workshops and limited-format training events.",
    parentCategoryId: null,
    accent: "gold",
    sortOrder: 7,
  },
  {
    id: "handgun",
    name: "Handgun",
    slug: "handgun",
    summary: "Defensive handgun training.",
    parentCategoryId: "defensive-firearms",
    accent: "graphite",
    sortOrder: 8,
  },
  {
    id: "rifle",
    name: "Rifle",
    slug: "rifle",
    summary: "Defensive rifle training.",
    parentCategoryId: "defensive-firearms",
    accent: "graphite",
    sortOrder: 9,
  },
  {
    id: "shotgun",
    name: "Shotgun",
    slug: "shotgun",
    summary: "Defensive shotgun training.",
    parentCategoryId: "defensive-firearms",
    accent: "graphite",
    sortOrder: 10,
  },
];

export const instructors: Instructor[] = [
  {
    id: "alex-morgan",
    name: "Alex Morgan",
    role: "Lead Medical Instructor",
    bio: "Alex teaches practical emergency care with a calm, skills-first approach for civilians, teams, and working professionals.",
    credentials: ["AHA Instructor", "ASHI Instructor", "EMT Skills Evaluator"],
    specialties: ["CPR", "First Aid", "Workplace Training"],
    certificationBodies: ["AHA", "ASHI", "EMT"],
    image: "",
    imageAlt: "",
    featured: true,
  },
  {
    id: "jordan-reyes",
    name: "Jordan Reyes",
    role: "Defensive Skills Instructor",
    bio: "Jordan focuses on safety, fundamentals, and practical decision-making for defensive training environments.",
    credentials: ["CCW Instructor", "Range Safety Officer", "Defensive Firearms Instructor"],
    specialties: ["Concealed Carry", "Handgun", "Safety Procedures"],
    certificationBodies: ["CCW", "Internal"],
    image: "",
    imageAlt: "",
    featured: true,
  },
];

export const siteSettings: SiteSettings = {
  businessName: "NorCal MedTac",
  tagline: "Professional medical and defensive training.",
  serviceArea: "Northern California",
  contactEmail: "",
  phone: "",
  logo: "",
  logoAlt: "NorCal MedTac",
  socialLinks: [],
};

export const homepageContent: HomepageContent = {
  heroLabel: "Northern California Training Provider",
  heroHeadline:
    "Medical and defensive training built for real-world situations.",
  heroBody:
    "Practical, safety-first, real-world readiness training for individuals, professionals, and groups.",
  heroTrustLine:
    "Trusted training aligned with AHA, ASHI, and real-world field experience.",
  heroImage: "",
  heroImageAlt: "",
  learningPoints: [
    "Bleeding control & trauma response",
    "Situational awareness & decision-making",
    "Real-world scenario training",
    "Certification-ready skills",
  ],
  trustStats: [
    "500+ students trained",
    "AHA & ASHI certified instruction",
    "10+ years field experience",
    "Used by EMS, security, and civilians",
  ],
  valuePoints: [
    "Practical curriculum",
    "Mobile instruction",
    "Medical and defensive expertise",
    "Calm instruction",
    "Safety-first environment",
    "Clear student expectations",
  ],
  expectations: [
    "Preparation details are shown before registration.",
    "Class environment and safety expectations are stated clearly.",
    "Prerequisites are listed before students reserve a seat.",
    "Registration details stay separate from merchandise shopping.",
  ],
  credentials: ["AHA", "ASHI", "ITLS", "EMT skills", "Instructor credentials"],
  groupTrainingHeadline:
    "Custom training for businesses, clubs, and organizations.",
  groupTrainingBody:
    "Workplace CPR and first aid, emergency preparedness, tactical medicine, defensive skills, and team refreshers can be structured around group needs.",
  finalCtaHeadline: "Ready to train with confidence?",
  finalCtaBody:
    "View upcoming classes or contact NorCal MedTac to find the right training for you.",
};

export const groupTrainingPageContent: GroupTrainingPageContent = {
  heroLabel: "Group Training",
  heroHeadline:
    "Custom training for teams, workplaces, clubs, and organizations.",
  heroBody:
    "NorCal MedTac provides mobile and custom training for groups that need practical medical, preparedness, tactical medicine, or defensive skills instruction.",
  useCases: [
    {
      title: "Workplace CPR/first aid",
      summary:
        "Certification-focused medical training for teams that need clear emergency response skills.",
    },
    {
      title: "Business emergency preparedness",
      summary:
        "Practical readiness instruction for organizations building safer workplace response plans.",
    },
    {
      title: "Club or private group training",
      summary:
        "Private classes structured around the group's goals, experience level, and schedule.",
    },
    {
      title: "Security or armed professional training",
      summary:
        "Safety-first medical and defensive skills refreshers for professional environments.",
    },
    {
      title: "Public safety or medical team refreshers",
      summary:
        "Focused refreshers for teams that need practical repetition and instructor-led skills review.",
    },
  ],
  trainingOptionsLabel: "Training Options",
  trainingOptionsHeadline: "Build a class around your group needs.",
  trainingOptions: [
    {
      title: "Medical & certification training",
      summary:
        "CPR, AED, first aid, bleeding control, and emergency care formats for teams.",
    },
    {
      title: "Tactical medicine",
      summary:
        "Hands-on casualty care and practical medical response for austere or higher-risk settings.",
    },
    {
      title: "Defensive skills",
      summary:
        "Structured defensive training built around safety, fundamentals, and group readiness.",
    },
    {
      title: "Custom emergency preparedness",
      summary:
        "Preparedness sessions tailored to your workplace, club, or organizational context.",
    },
  ],
  stepsLabel: "How It Works",
  stepsHeadline: "A simple path from inquiry to training.",
  steps: [
    {
      title: "Submit inquiry",
      summary:
        "Share your group size, location, training goals, and preferred timing.",
    },
    {
      title: "Define group needs",
      summary:
        "NorCal MedTac helps align the format, prerequisites, equipment, and outcomes.",
    },
    {
      title: "Schedule training",
      summary:
        "Choose a practical date, class length, and venue plan for your group.",
    },
    {
      title: "Train on-site or at an agreed location",
      summary:
        "Instruction can be delivered at a workplace, partner location, or other suitable site.",
    },
  ],
  credentialsLabel: "Credentials",
  credentialsHeadline:
    "Instruction aligned with recognized standards and real field experience.",
  credentialsBody:
    "Group training can reference AHA, ASHI, ITLS, EMT skills, instructor credentials, and class-specific safety expectations where applicable.",
  formLabel: "Inquiry Form",
  formHeadline: "Request Group Training",
  formBody:
    "This form is front-end only for the prototype and does not send email or store submissions.",
};

export const contactPageContent: ContactPageContent = {
  heroLabel: "Contact",
  heroHeadline: "Contact NorCal MedTac",
  heroBody:
    "Ask a question before registering, request training guidance, or start a conversation about group instruction.",
  formLabel: "Contact Form",
  formHeadline: "Send a training question.",
  formBody:
    "This form is front-end only for the prototype and does not send email or store submissions.",
  faqLabel: "FAQ Summary",
  faqHeadline: "Common questions before registering.",
  contactCards: [
    {
      label: "Training Inquiry",
      title: "Individual class questions",
      body:
        "Ask about prerequisites, class expectations, what to bring, or registration details.",
      tone: "red",
    },
    {
      label: "Service Area",
      title: "Northern California",
      body:
        "Training is centered on Northern California with scheduled, partner-location, and group training options.",
      tone: "olive",
    },
    {
      label: "Group Training",
      title: "Workplace and private groups",
      body:
        "Use the group training page for custom class inquiries and mobile training requests.",
      tone: "gold",
    },
  ],
  faqs: [
    {
      question: "How do I choose the right class?",
      answer:
        "Share your goals, experience level, and any certification needs so NorCal MedTac can point you toward the most practical option.",
    },
    {
      question: "What should I bring to training?",
      answer:
        "Each class page lists prerequisites, required equipment, what to bring, and arrival expectations before registration.",
    },
    {
      question: "Can NorCal MedTac train my workplace or group?",
      answer:
        "Yes. Use the group training inquiry path for workplace, club, private group, and organization training requests.",
    },
  ],
};

export const classes: TrainingClass[] = [
  {
    id: "class-cpr-first-aid-may",
    title: "CPR, AED & First Aid",
    slug: "cpr-aed-first-aid-may",
    categoryId: "medical-certification",
    summary:
      "A practical certification-focused course covering CPR, AED use, and first aid fundamentals.",
    description:
      "Students build confidence with emergency recognition, CPR skills, AED use, and first aid response through hands-on practice.",
    date: "2026-05-16",
    startTime: "09:00 AM",
    endTime: "01:00 PM",
    duration: "4 hours",
    locationName: "NorCal MedTac Training Center",
    locationCity: "Sacramento",
    locationState: "CA",
    locationAddress: "Sacramento, CA",
    price: 125,
    currency: "USD",
    capacity: 18,
    seatsAvailable: 7,
    status: "open",
    skillLevel: "beginner",
    certification: "CPR, AED & First Aid",
    certificationBody: "ASHI",
    audience: ["Civilians", "Workplace teams", "Students needing certification"],
    prerequisites: ["No prior medical training required"],
    whatYouWillLearn: ["CPR fundamentals", "AED operation", "First aid priorities"],
    whatToBring: ["Photo ID", "Comfortable clothing", "Notebook"],
    safetyRequirements: ["Follow instructor directions during hands-on skills"],
    legalRequirements: [],
    instructorIds: ["alex-morgan"],
    image: "",
    imageAlt: "",
    relatedClassIds: ["class-stop-the-bleed-may"],
  },
  {
    id: "class-stop-the-bleed-may",
    title: "Trauma Care Fundamentals",
    slug: "trauma-care-fundamentals-may",
    categoryId: "tactical-medicine",
    summary:
      "Hands-on training for bleeding control, patient assessment, and immediate trauma response.",
    description:
      "This course introduces practical trauma care skills for students who want to respond effectively before advanced care arrives.",
    date: "2026-05-24",
    startTime: "08:30 AM",
    endTime: "12:30 PM",
    duration: "4 hours",
    locationName: "NorCal MedTac Training Center",
    locationCity: "Sacramento",
    locationState: "CA",
    locationAddress: "Sacramento, CA",
    price: 150,
    currency: "USD",
    capacity: 16,
    seatsAvailable: 3,
    status: "limited",
    skillLevel: "allLevels",
    certification: "none",
    certificationBody: "Internal",
    audience: ["Civilians", "Armed professionals", "Public safety personnel"],
    prerequisites: ["No prior medical training required"],
    whatYouWillLearn: ["Bleeding control", "Tourniquet use", "Patient assessment"],
    whatToBring: ["Photo ID", "Durable clothing", "Water"],
    safetyRequirements: ["Use training medical equipment only as directed"],
    legalRequirements: [],
    instructorIds: ["alex-morgan"],
    image: "",
    imageAlt: "",
    relatedClassIds: ["class-cpr-first-aid-may"],
  },
  {
    id: "class-ccw-june",
    title: "Concealed Carry Preparation",
    slug: "concealed-carry-preparation-june",
    categoryId: "concealed-carry",
    summary:
      "A structured class covering safety, legal expectations, equipment, and practical concealed carry considerations.",
    description:
      "Students review practical concealed carry skills, documentation expectations, safe handling, and decision-making.",
    date: "2026-06-07",
    startTime: "09:00 AM",
    endTime: "05:00 PM",
    duration: "8 hours",
    locationName: "Partner Range",
    locationCity: "Lincoln",
    locationState: "CA",
    locationAddress: "Lincoln, CA",
    price: 225,
    currency: "USD",
    capacity: 14,
    seatsAvailable: 0,
    status: "waitlist",
    skillLevel: "intermediate",
    certification: "CCW",
    certificationBody: "CCW",
    audience: ["Concealed carry applicants", "Responsible armed citizens"],
    prerequisites: ["Meet applicable legal requirements", "Safe firearm handling"],
    whatYouWillLearn: ["Safety procedures", "Legal considerations", "Range expectations"],
    whatToBring: ["Photo ID", "Required documentation", "Approved equipment"],
    safetyRequirements: ["Follow all range safety procedures"],
    legalRequirements: ["Students must meet applicable eligibility requirements"],
    instructorIds: ["jordan-reyes"],
    image: "",
    imageAlt: "",
    relatedClassIds: ["class-defensive-handgun-june"],
  },
  {
    id: "class-defensive-handgun-june",
    title: "Defensive Handgun Skills",
    slug: "defensive-handgun-skills-june",
    categoryId: "handgun",
    summary:
      "A safety-first defensive handgun class focused on fundamentals, handling, and practical skill development.",
    description:
      "Students work through safe handling, marksmanship fundamentals, movement considerations, and structured range drills.",
    date: "2026-06-21",
    startTime: "08:00 AM",
    endTime: "04:00 PM",
    duration: "8 hours",
    locationName: "Partner Range",
    locationCity: "Lincoln",
    locationState: "CA",
    locationAddress: "Lincoln, CA",
    price: 250,
    currency: "USD",
    capacity: 12,
    seatsAvailable: 0,
    status: "soldOut",
    skillLevel: "intermediate",
    certification: "none",
    certificationBody: "Internal",
    audience: ["Responsible armed citizens", "Armed professionals"],
    prerequisites: ["Safe firearm handling", "Prior handgun fundamentals"],
    whatYouWillLearn: ["Safe handling", "Range procedures", "Defensive fundamentals"],
    whatToBring: ["Photo ID", "Approved handgun", "Range gear"],
    safetyRequirements: ["Follow all range commands and safety rules"],
    legalRequirements: ["Students must legally possess required equipment"],
    instructorIds: ["jordan-reyes"],
    image: "",
    imageAlt: "",
    relatedClassIds: ["class-ccw-june"],
  },
];

export const merchandise: Merchandise[] = [
  {
    id: "product-norcal-shirt",
    title: "NorCal MedTac Training Shirt",
    slug: "norcal-medtac-training-shirt",
    category: "Apparel",
    description: "A durable training shirt for range days and class weekends.",
    price: 32,
    currency: "USD",
    images: [],
    variants: ["Small", "Medium", "Large", "XL"],
    inventoryStatus: "inStock",
    shoppingUrl: "/merch/norcal-medtac-training-shirt",
    featured: true,
  },
  {
    id: "product-med-patch",
    title: "Medical Identification Patch",
    slug: "medical-identification-patch",
    category: "Patches",
    description: "A clean identification patch for training kit organization.",
    price: 12,
    currency: "USD",
    images: [],
    variants: ["Red", "Olive"],
    inventoryStatus: "lowStock",
    shoppingUrl: "/merch/medical-identification-patch",
    featured: true,
  },
  {
    id: "product-gift-certificate",
    title: "Training Gift Certificate",
    slug: "training-gift-certificate",
    category: "Gift Certificates",
    description: "A merchandise gift certificate placeholder for future purchase flow.",
    price: 100,
    currency: "USD",
    images: [],
    variants: ["$100", "$150", "$250"],
    inventoryStatus: "inStock",
    shoppingUrl: "/merch/training-gift-certificate",
    featured: true,
  },
];

export function getCategory(categoryId: string) {
  return categories.find((category) => category.id === categoryId);
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export const classStatusLabels: Record<ClassStatus, string> = {
  open: "Open",
  limited: "Limited Seats",
  waitlist: "Waitlist",
  soldOut: "Sold Out",
  closed: "Registration Closed",
};

export const classCtaLabels: Record<ClassStatus, string> = {
  open: "Register",
  limited: "Register",
  waitlist: "Join Waitlist",
  soldOut: "Sold Out",
  closed: "Registration Closed",
};
