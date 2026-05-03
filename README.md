# NorCal MedTac Redesign

Next.js App Router implementation for the NorCal MedTac website redesign.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

## Deployment Docs

For Phase 2 deployment stabilization and review workflows, use:

- `docs/ai/ROADMAP.md`
- `docs/ai/DEPLOYMENT_READINESS_CHECKLIST.md`
- `docs/ai/PROJECT_CONTEXT.md`
- `docs/ai/ARCHITECTURE_DECISIONS.md`
- `docs/ai/KNOWN_RISKS.md`

## Environment

Create `.env.local` from `.env.example`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
INQUIRY_IP_HASH_SALT=replace_with_a_long_random_secret
```

Use the Supabase service role key only on the server. Do not expose it in
client components or browser code. `INQUIRY_IP_HASH_SALT` is used to hash
request IPs for inquiry rate limiting without storing raw IP addresses.
`SANITY_API_WRITE_TOKEN` is for seeding workflows only and is not required at
runtime.

## Sanity CMS

When Sanity environment variables are configured, published Sanity documents
drive the editable site content. If Sanity is not configured, has no matching
documents, or a fetch fails, the site falls back to local data in `lib/data.ts`.

CMS-backed areas include:

- Homepage content
- About, Classes, Calendar, Group Training, Contact, and Registration page copy
- Scheduled classes
- Instructors
- Merchandise products
- Site settings

Run the dev server and open [http://localhost:3000/studio](http://localhost:3000/studio)
to edit content. Classes are registrations, not products. Merchandise remains
separate from class registration.

### Scheduled Classes

Scheduled class documents power the homepage, `/classes`, `/calendar`,
`/classes/[slug]`, and `/register/[slug]`. Homepage, Classes, and Calendar show
upcoming classes. Detail and registration routes can still load past or closed
classes by slug.

Class instructors are modeled as references to `Instructor` documents. The
frontend preserves fallback behavior and can normalize instructor links by
Sanity document id or instructor slug.

## Supabase

Run the SQL files in the Supabase SQL editor:

- `supabase/registrations.sql`
- `supabase/contact_inquiries.sql`
- `supabase/group_training_inquiries.sql`

These files create or update the required tables, constraints, row-level
security posture, and indexes.

### Registration Storage

Class registration requests from `/register/[slug]` are stored in
`public.registrations`.

Registration and waitlist behavior:

1. The form posts to `/api/registrations`.
2. The route validates attendee fields and class slug.
3. The route checks remaining seats from saved registration requests.
4. For `open` and `limited` classes, the route saves the request with
   `registrationStatus: pending` and `paymentStatus: unpaid`.
5. For `waitlist` classes, the route saves the request with
   `registrationStatus: waitlist_requested` and `paymentStatus: unpaid`.
6. Waitlist requests bypass live remaining-seat checks.
7. Full/closed classes do not allow normal registration.
8. The page shows the registration confirmation state.

No payment is collected. There is no Stripe integration, checkout, account
system, email notification system, or admin dashboard yet.

Known limitation: the registration seat check is not transaction-safe yet. Two
near-simultaneous submissions can both pass the availability check before either
insert is visible to the other request. This should be addressed before relying
on seat counts for high-volume public registration.

### Inquiry Backend

Contact inquiries from `/contact` are stored in `public.contact_inquiries`.
Group training inquiries from `/group-training` are stored in
`public.group_training_inquiries`.

Inquiry routes validate submitted fields, apply a simple honeypot/timing spam
signal, hash the request IP for rate limiting, truncate the user agent before
storage, and save the inquiry with `status: new` and `source: website`.

The inquiry backend does not send email notifications and does not include
CAPTCHA or Turnstile.
