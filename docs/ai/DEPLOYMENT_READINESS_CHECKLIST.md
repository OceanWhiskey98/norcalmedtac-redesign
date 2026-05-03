# NorCalMedTac Deployment Readiness Checklist

Use this before Vercel preview or production deployment.

Related planning docs:

- `docs/ai/ROADMAP.md` (Phase 2: Deployment Stabilization)
- `docs/ai/PROJECT_CONTEXT.md`
- `docs/ai/KNOWN_RISKS.md`
- `docs/operations/SUPABASE_WORKFLOW.md`

## Verification Results (2026-05-03)

- [x] Vercel production deployment works
- [x] Production env vars are added
- [x] Public routes load
- [x] `/studio` loads, is Sanity-connected, and is isolated from public header/footer
- [x] Contact inquiries write with `status = new`, `source = website`, and `ipHash` present
- [x] Group training inquiries write with `status = new`, `source = website`, and `ipHash` present
- [x] Open/limited registrations write `registrationStatus = pending`, `paymentStatus = unpaid`, `source = website`
- [x] Waitlist requests write `registrationStatus = waitlist_requested`, `paymentStatus = unpaid`, `source = website`
- [x] Initial `/studio` production policy documented (Sanity auth only; revisit later if needed)

---

## 1. Build and Runtime

- [ ] `npm.cmd run build` passes locally
- [ ] Known Node `--localstorage-file` warning is non-blocking only
- [ ] No unexpected TypeScript errors
- [ ] No server/client boundary errors
- [ ] No debug logs or temporary console noise
- [ ] No `vercel.json` requirement unless intentionally added
- [ ] Vercel framework preset is Next.js
- [ ] Node version supports Next 16 (`>=20.9.0`)

---

## 2. Environment Variables

Required/recommended:

| Variable | Required | Exposure | Notes |
|---|---:|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | Public | Sanity project |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes | Public | Sanity dataset |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Recommended | Public | Pin stable API version |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Public | Supabase URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Secret | Server-only writes |
| `INQUIRY_IP_HASH_SALT` | Strongly recommended | Secret | Production IP hashing |
| `SANITY_API_WRITE_TOKEN` | Seed only | Secret | Not runtime-required |

Checklist:

- [ ] Production env vars set
- [ ] Preview env vars set
- [ ] Development env vars set if needed
- [ ] No service role key in `NEXT_PUBLIC_*`
- [ ] `.env.local` not committed
- [ ] Any exposed old Sanity write token has been revoked

---

## 3. Supabase Readiness

Required tables:

- [ ] `public.registrations`
- [ ] `public.contact_inquiries`
- [ ] `public.group_training_inquiries`

Required registration behavior:

- [ ] Open/limited registrations store `registrationStatus = pending`
- [ ] Waitlist requests store `registrationStatus = waitlist_requested`
- [ ] Waitlist requests are not blocked by live remaining-seat check
- [ ] Full/closed classes do not allow normal registration

Required constraints/indexes:

- [ ] `registrations_registration_status_check` includes `waitlist_requested`
- [ ] `registrations_class_slug_idx`
- [ ] `contact_inquiries_ip_hash_created_at_idx`
- [ ] `group_training_inquiries_ip_hash_created_at_idx`
- [ ] status/source/currency/payment/amount constraints are current

RLS posture:

- [ ] RLS enabled on all operational tables
- [ ] `anon` revoked
- [ ] `authenticated` revoked
- [ ] Writes happen through server-side service role only

Known risk:

- [ ] Registration seat check concurrency risk accepted or mitigated before high-volume use

---

## 4. Sanity Readiness

- [ ] `/studio` loads
- [ ] `/studio` does not render public header/footer
- [ ] Sanity project/dataset env vars correct
- [ ] Hardcoded fallback defaults do not mask production misconfiguration
- [ ] Scheduled classes exist or fallback behavior is confirmed
- [ ] Instructors exist or fallback behavior is confirmed
- [ ] Page singleton content exists or fallback behavior is confirmed
- [ ] Seed workflow present:
  - [ ] `SANITY_SEEDING.md`
  - [ ] `scripts/seed-sanity-fallback.mjs`
- [ ] Seed script supports dry run
- [ ] Seed writes require `--yes`
- [ ] `--replace` is explicit only
- [ ] Studio access policy decision documented

---

## 5. Public Route Smoke Test

Check:

- [ ] `/`
- [ ] `/about`
- [ ] `/classes`
- [ ] `/classes/[slug]`
- [ ] `/calendar`
- [ ] `/group-training`
- [ ] `/contact`
- [ ] `/merch`
- [ ] `/register/[slug]`
- [ ] `/studio`

---

## 6. Form Smoke Test

Submit and verify DB rows:

- [ ] Open/limited class registration
- [ ] Waitlist request
- [ ] Contact inquiry
- [ ] Group training inquiry

Expected rows:

```text
registrations.registrationStatus = pending
registrations.registrationStatus = waitlist_requested
contact_inquiries.status = new
group_training_inquiries.status = new
source = website
ipHash stored, not raw IP
```

---

## 7. Language and Product Guardrail Scan

- [ ] No class `Add to Cart`
- [ ] No `Shop Classes`
- [ ] No class checkout/payment copy
- [ ] No claims that contact/group forms are prototype-only or not stored
- [ ] No payment collection language beyond “No payment is collected” where appropriate
- [ ] Merch remains separate from classes
- [ ] Copy aligns with `project-brief.md`

---

## 8. Production Risks to Decide

- [ ] Studio access policy revisit timeline (if business/security posture changes)
- [ ] Registration concurrency monitoring cadence (mitigation is live)
- [ ] Inquiry notification workflow
- [ ] Admin/roster viewing workflow
- [ ] Payment roadmap timing

---

## 9. Secret/Token Hygiene Closeout

- [ ] Confirm any previously exposed Sanity write token is revoked.
- [ ] Confirm `SANITY_API_WRITE_TOKEN` is not required for runtime deployment.
- [ ] Confirm seed token usage is temporary and rotated/revoked after use.
- [ ] Confirm no secrets are present in docs, screenshots, logs, or committed files.
