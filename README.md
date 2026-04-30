# NorCal MedTac Redesign

Next.js App Router prototype for the NorCal MedTac website redesign.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Sanity CMS Setup

This project can read scheduled classes from Sanity. If Sanity environment
variables are missing, the site automatically falls back to the local mock class
data in `lib/data.ts`.

### Create a Sanity project

1. Create or log into a Sanity account.
2. From this project folder, run:

```bash
npx sanity@latest init
```

3. Choose or create a Sanity project.
4. Use the `production` dataset unless you intentionally create another one.
5. Keep the existing Studio configuration in this repo.

### Environment variables

Create `.env.local` with:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
```

Only published Sanity class documents are read by the public site.

### Run Sanity Studio

Start the Next.js dev server:

```bash
npm run dev
```

Then open [http://localhost:3000/studio](http://localhost:3000/studio).

### How an admin adds a scheduled class

1. Open `/studio`.
2. Choose `Scheduled Class`.
3. Create a new document.
4. Fill out the class fields: title, slug, category, summary, description, date,
   time, location, price, seats, status, skill level, certification details,
   audience, prerequisites, learning outcomes, what to bring, safety
   requirements, legal requirements, instructor, image, and related classes.
5. Publish the document.
6. The class appears on the homepage, `/classes`, `/calendar`,
   `/classes/[slug]`, and `/register/[slug]`.

To close or remove a class, update its `status` to `Registration Closed`, unpublish
it, or delete it in Sanity Studio. Closed classes stay visible with disabled
registration CTAs; unpublished or deleted classes are removed from the public
Sanity-powered list.

## Build

```bash
npm run build
```
