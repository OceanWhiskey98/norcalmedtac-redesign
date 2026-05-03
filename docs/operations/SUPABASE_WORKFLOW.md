# Supabase Staff Operations Workflow

Last updated: 2026-05-03

This runbook covers daily staff operations using Supabase Table Editor for:

- class registrations
- waitlist requests
- contact inquiries
- group training inquiries

This is an interim workflow until a dedicated internal dashboard is explicitly scoped.

## 1. Access Scope

- Use Supabase project access with least privilege practical for staff roles.
- Do not share service-role keys with staff users.
- Use Supabase UI access for table viewing/filtering/export only unless update rights are intentionally granted.

## 2. Tables to Monitor

- `public.registrations`
- `public.contact_inquiries`
- `public.group_training_inquiries`

## 3. Registration Queue Triage

Open `public.registrations` and sort by newest first.

Recommended filters:

- Active class requests: `registrationStatus` in `pending, confirmed` and `canceledAt` is null
- Waitlist requests: `registrationStatus = waitlist_requested`
- Class-specific queue: filter by `classSlug`

Status meanings:

- `pending`: normal open/limited class registration request
- `waitlist_requested`: request for a waitlist class
- `confirmed`: staff-confirmed registration
- canceled row: `canceledAt` is present (excluded from active capacity count)

Capacity note:

- Active capacity counts `pending` + `confirmed` where `canceledAt` is null.
- Waitlist requests bypass capacity checks and are stored as `waitlist_requested`.

## 4. Inquiry Queue Triage

### Contact inquiries

Open `public.contact_inquiries` and filter `status = new`.

Expected intake fields:

- `source = website`
- `ipHash` present
- `userAgent` present (truncated)

### Group training inquiries

Open `public.group_training_inquiries` and filter `status = new`.

Expected intake fields:

- `source = website`
- `ipHash` present
- `userAgent` present (truncated)

## 5. Suggested Daily Cadence

1. Morning check: review new rows in all three tables.
2. Midday check: review new waitlist and inquiry rows.
3. End-of-day check: ensure no `new`/`pending` rows are unintentionally untouched.

## 6. Manual Follow-up Workflow

1. Review row details for completeness and contactability.
2. Reach out manually using business communication channels.
3. Update row status fields if your ops process includes explicit status transitions.
4. Capture notes in approved internal tools (not in public-site code/docs).

## 7. Exports

- Use Supabase Table Editor export for ad hoc CSV snapshots when needed.
- Name exports with date and table name (example: `registrations-2026-05-03.csv`).
- Store exports only in approved business storage locations.

## 8. Security and Hygiene Checks

- Never paste secrets into table text fields.
- Never commit `.env.local` or screenshots containing secrets.
- `SANITY_API_WRITE_TOKEN` is seed-only, not runtime-required.
- Revoke/rotate temporary seed tokens after use.

## 9. Escalation Triggers

Escalate for technical follow-up when:

- repeated 429s appear unexpectedly for legitimate inquiries
- registration rows fail to appear after successful form confirmation
- unusual error spikes appear in deployment logs
- unexpected status values appear in operational tables
