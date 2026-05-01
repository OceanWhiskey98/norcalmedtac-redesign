import { createClient } from "@sanity/client";
import { createRequire } from "module";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const ts = require("typescript");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

const args = new Set(process.argv.slice(2));
const isDryRun = args.has("--dry-run");
const shouldReplace = args.has("--replace");
const hasYes = args.has("--yes");

function loadDotEnvFile(filename) {
  const envPath = path.join(repoRoot, filename);

  if (!fs.existsSync(envPath)) {
    return;
  }

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");
    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] ??= value;
  }
}

function loadFallbackData() {
  const dataPath = path.join(repoRoot, "lib", "data.ts");
  const source = fs.readFileSync(dataPath, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  });
  const module = { exports: {} };
  const compiled = new Function(
    "exports",
    "require",
    "module",
    "__filename",
    "__dirname",
    transpiled.outputText,
  );

  compiled(module.exports, require, module, dataPath, path.dirname(dataPath));

  return {
    classes: module.exports.classes,
    instructors: module.exports.instructors,
  };
}

function instructorId(id) {
  return `instructor.${id}`;
}

function asSlug(slug) {
  return {
    _type: "slug",
    current: slug,
  };
}

function asStringArray(value) {
  return Array.isArray(value) ? value : [];
}

function mapStatus(status) {
  switch (status) {
    case "limited":
      return "limited";
    case "soldOut":
      return "full";
    case "waitlist":
    case "closed":
    case "open":
      return status;
    default:
      return "open";
  }
}

function mapInstructor(instructor, index) {
  return {
    _id: instructorId(instructor.id),
    _type: "instructor",
    name: instructor.name,
    slug: asSlug(instructor.id),
    role: instructor.role,
    bio: instructor.bio,
    credentials: asStringArray(instructor.credentials),
    specialties: asStringArray(instructor.specialties),
    certificationBodies: asStringArray(instructor.certificationBodies),
    imageAlt: instructor.imageAlt,
    featured: Boolean(instructor.featured),
    sortOrder: index,
  };
}

function mapClass(trainingClass) {
  const primaryInstructorId = trainingClass.instructorIds?.[0];
  const instructor = primaryInstructorId
    ? {
        _type: "reference",
        _ref: instructorId(primaryInstructorId),
      }
    : undefined;
  const relatedClasses = asStringArray(trainingClass.relatedClassIds).map(
    (relatedClassId) => ({
      _key: relatedClassId,
      _type: "reference",
      _ref: relatedClassId,
    }),
  );

  return {
    _id: trainingClass.id,
    _type: "scheduledClass",
    title: trainingClass.title,
    slug: asSlug(trainingClass.slug),
    category: trainingClass.categoryId,
    summary: trainingClass.summary,
    description: trainingClass.description,
    date: trainingClass.date,
    startTime: trainingClass.startTime,
    endTime: trainingClass.endTime,
    duration: trainingClass.duration,
    locationName: trainingClass.locationName,
    locationCity: trainingClass.locationCity,
    locationState: trainingClass.locationState,
    locationAddress: trainingClass.locationAddress,
    price: trainingClass.price,
    capacity: trainingClass.capacity,
    seatsAvailable: trainingClass.seatsAvailable,
    status: mapStatus(trainingClass.status),
    skillLevel: trainingClass.skillLevel,
    certification: trainingClass.certification,
    certificationBody: trainingClass.certificationBody,
    audience: asStringArray(trainingClass.audience),
    prerequisites: asStringArray(trainingClass.prerequisites),
    whatYouWillLearn: asStringArray(trainingClass.whatYouWillLearn),
    whatToBring: asStringArray(trainingClass.whatToBring),
    safetyRequirements: asStringArray(trainingClass.safetyRequirements),
    legalRequirements: asStringArray(trainingClass.legalRequirements),
    ...(instructor ? { instructor } : {}),
    imageAlt: trainingClass.imageAlt,
    relatedClasses,
  };
}

async function writeDocuments(client, documents) {
  for (const document of documents) {
    if (shouldReplace) {
      await client.createOrReplace(document);
      console.log(`Replaced ${document._type}: ${document._id}`);
    } else {
      await client.createIfNotExists(document);
      console.log(`Created if missing ${document._type}: ${document._id}`);
    }
  }
}

loadDotEnvFile(".env.local");
loadDotEnvFile(".env");

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? process.env.SANITY_PROJECT_ID;
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? process.env.SANITY_DATASET;
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ??
  process.env.SANITY_API_VERSION ??
  "2025-01-01";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID/SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET/SANITY_DATASET.",
  );
  process.exit(1);
}

const { classes, instructors } = loadFallbackData();

if (!Array.isArray(classes) || !Array.isArray(instructors)) {
  console.error("Could not load fallback classes and instructors from lib/data.ts.");
  process.exit(1);
}

const instructorDocuments = instructors.map(mapInstructor);
const classDocuments = classes.map(mapClass);

console.log("Sanity fallback content seed");
console.log(`Project: ${projectId}`);
console.log(`Dataset: ${dataset}`);
console.log(`API version: ${apiVersion}`);
console.log(`Mode: ${isDryRun ? "dry-run" : shouldReplace ? "replace" : "create-if-missing"}`);
console.log(`Instructors: ${instructorDocuments.length}`);
console.log(`Scheduled classes: ${classDocuments.length}`);

if (isDryRun) {
  console.log("\nDry run only. No Sanity writes will be made.");
  console.log("\nInstructor documents:");
  for (const document of instructorDocuments) {
    console.log(`- ${document._id} (${document.slug.current})`);
  }
  console.log("\nScheduled class documents:");
  for (const document of classDocuments) {
    console.log(
      `- ${document._id} (${document.slug.current}) status=${document.status}`,
    );
  }
  process.exit(0);
}

if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN. Refusing to write.");
  process.exit(1);
}

if (!hasYes) {
  console.error(
    "Refusing to write without --yes. Re-run with --yes after reviewing --dry-run output.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

await writeDocuments(client, instructorDocuments);
await writeDocuments(client, classDocuments);

console.log("Sanity fallback content seed complete.");
