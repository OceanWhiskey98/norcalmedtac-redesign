# Sanity Fallback Content Seeding

Use this workflow to seed the local fallback instructors and scheduled classes
from `lib/data.ts` into Sanity as editable Studio documents.

## Required Environment

Set these values in `.env.local` or in the current shell:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
SANITY_API_WRITE_TOKEN=your_sanity_write_token
```

`SANITY_API_WRITE_TOKEN` must have permission to create and update documents in
the target dataset. Do not commit token values.

## Dry Run

Preview the target project, dataset, document IDs, slugs, and class statuses:

```bash
npm run sanity:seed:fallback:dry
```

Dry-run mode does not write to Sanity and does not require a token.

## Seed Documents

Create missing fallback instructors and classes:

```bash
npm run sanity:seed:fallback -- --yes
```

The default write mode uses `createIfNotExists()`, so running the seed more than
once will not duplicate documents and will not overwrite Studio edits.

## Replace Existing Seeded Documents

Only use this when you intentionally want fallback data to overwrite matching
Sanity documents with the same deterministic IDs:

```bash
npm run sanity:seed:fallback -- --replace --yes
```

## Document IDs And References

The seed script uses stable IDs:

- Instructors: `instructor.<fallback id>`, such as `instructor.alex-morgan`
- Scheduled classes: the fallback class `id`, such as `class-cpr-first-aid-may`

Class slugs are preserved exactly, so public URLs do not change. Scheduled class
documents reference instructor documents with Sanity references, and related
classes reference the seeded class document IDs.

## Verification

After seeding:

1. Start the dev server with `npm run dev`.
2. Open `/studio`.
3. Check `People > Instructors`.
4. Check `Classes > Scheduled Classes`.
5. Confirm the seeded class slugs match the fallback URLs.
6. Open `/classes` and a class detail page, such as
   `/classes/cpr-aed-first-aid-may`.

## Removing An Accidental Untitled Draft

Delete accidental drafts manually in Studio:

1. Open `/studio`.
2. Go to the document list where the Untitled draft appears.
3. Open the Untitled draft.
4. Use the document actions menu to delete or discard the draft.

Avoid deleting seeded documents with IDs matching fallback classes or
instructors unless you intentionally want the public site to fall back to local
data again.
