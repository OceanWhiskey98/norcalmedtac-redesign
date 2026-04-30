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

Only published Sanity class documents are read by the public site. When the
environment variables above are present, Sanity is the source of truth for
scheduled classes across the homepage, `/classes`, `/calendar`,
`/classes/[slug]`, and `/register/[slug]`.

### Class data behavior

- Sanity is the class content source when `NEXT_PUBLIC_SANITY_PROJECT_ID` and
  `NEXT_PUBLIC_SANITY_DATASET` are configured.
- Local mock classes in `lib/data.ts` are fallback only when Sanity is not
  configured or a Sanity fetch fails.
- Homepage, `/classes`, and `/calendar` show upcoming classes only.
- Class detail and registration routes can still load past or closed classes by
  slug.

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

To close or remove a class, update its `status` to `Closed`, unpublish it, or
delete it in Sanity Studio. Full and closed classes stay visible with disabled
registration CTAs; unpublished or deleted classes are removed from the public
Sanity-powered list.

## Build

```bash
npm run build
```

## Supabase Registration Storage

Class registration requests from `/register/[slug]` are stored in Supabase.
There is no authentication, payment processing, Stripe, or admin UI yet.

### Create a Supabase project

1. Create a Supabase account or log into an existing account.
2. Create a new project.
3. Open the Supabase SQL editor.
4. Run the SQL in `supabase/registrations.sql` to create the `registrations`
   table.

The table stores:

- `id`
- `classSlug`
- `firstName`
- `lastName`
- `email`
- `phone`
- `seats`
- `notes`
- `createdAt`

### Supabase environment variables

Add these values to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

Use the service role key only on the server. Do not expose it in client
components or browser code.

### Registration behavior

When a student submits the registration form:

1. The form posts to `/api/registrations`.
2. The route validates the attendee fields and class slug.
3. The route writes the registration request to Supabase.
4. The page shows the existing registration confirmation state.

Registration records are stored, but seats are not enforced, authentication is
not enabled, and no payment is collected yet.
