# NorCalMedTac Website Roadmap

**Last updated:** 2026-05-03  
**Recommended location:** `docs/ai/ROADMAP.md`  
**Project root:** `C:\Projects\norcalmedtac-redesign`

---

## 1. Purpose

This roadmap is the working plan for the NorCalMedTac website project.

It is intended for:

- Human project planning
- ChatGPT Project context
- Codex/AI coding sessions
- Branch planning
- Deployment readiness tracking
- Future handoffs

This file should be updated whenever the project changes phase, ships a major milestone, resolves a known risk, or intentionally changes direction.

---

## 2. Source-of-Truth Hierarchy

Use this roadmap together with the existing project docs.

Priority order:

1. `project-brief.md`  
   Product intent, audience, UX, copy rules, navigation, visual style, class-vs-merch language.

2. `AGENTS.md`  
   Repo-specific agent/development rules.

3. `docs/ai/PROJECT_CONTEXT.md`  
   Current AI operating context and implemented architecture.

4. `docs/ai/ARCHITECTURE_DECISIONS.md`  
   Durable product/technical decisions.

5. `docs/ai/KNOWN_RISKS.md`  
   Open risks, watch items, and mitigation paths.

6. Current code and branch state  
   Runtime truth for implementation details.

7. Older handoffs  
   Historical reference only.

Important nuance:

The original project brief described the project as a front-end/mock prototype. The repo has since evolved into a pre-deployment beta with Sanity CMS and Supabase-backed submissions. Keep using the brief for product/design/language truth, but do not remove implemented Sanity/Supabase functionality unless explicitly requested.

---

## 3. Project Principles

### Core product rule

NorCalMedTac is not a shop that sells classes. It is a professional training organization that accepts registrations.

Classes are:

- Scheduled training events
- Registration/request flows
- Waitlist-capable operational records

Classes are not:

- Products
- Cart items
- Checkout items
- Merchandise

Merchandise remains separate and may use ecommerce language.

### Current technical principles

- Next.js App Router, TypeScript, Tailwind
- Sanity CMS for editable content
- Local fallback data remains mandatory
- Supabase stores operational submissions
- Supabase service role is server-only
- Public forms submit to API routes
- Small, scoped changes over broad refactors
- No secrets in repo, logs, screenshots, or chat

---

## 4. Status Legend

Use these status markers throughout the roadmap:

| Status | Meaning |
|---|---|
| `Done` | Implemented and merged or otherwise considered complete |
| `Current` | Active or next immediate milestone |
| `Next` | Planned soon after current milestone |
| `Later` | Intended future work, not immediate |
| `Blocked` | Cannot proceed without a decision/dependency |
| `Deferred` | Intentionally not in current phase |
| `Watch` | Known issue or risk to monitor |

---

## 5. Current Project State

### Implemented

- Public multi-page site
- Next.js App Router structure
- Shared UI/component system
- Sanity Studio embedded at `/studio`
- Studio isolated from public header/footer
- CMS-driven content for major page shells
- Local fallback data for classes/content
- Scheduled classes editable in Sanity
- Instructors editable in Sanity
- Merch products editable in Sanity
- Supabase registration backend
- Waitlist request storage
- Contact inquiry backend
- Group training inquiry backend
- Class status normalization
- Sanity fallback seeding workflow
- Deployment readiness docs/checklists

### Not implemented yet

- Stripe/payments
- User authentication
- Email notifications
- CAPTCHA/Turnstile
- Admin dashboard
- Real merch checkout
- Full analytics/SEO strategy
- Blog/resource migration

### Known important risks

- `/studio` production access policy still needs a final decision.
- `/studio` production access policy should be revisited later if business/security needs change.
- Inquiry and registration records currently require staff to check Supabase manually.
- Documentation can drift from runtime behavior if not updated after feature work.
- Any exposed Sanity write token should be revoked.

---

## 6. Roadmap Overview

| Phase | Name | Status | Goal |
|---|---|---|---|
| Phase 0 | Foundation / Prototype | Done | Build core public site and front-end structure |
| Phase 1 | CMS + Operational Backends | Done | Add Sanity CMS and Supabase-backed submissions |
| Phase 2 | Deployment Stabilization | Done | Prepare stable Vercel/Supabase/Sanity preview/production path |
| Phase 3 | Production Readiness Hardening | Next | Resolve high-risk operational gaps before real public use |
| Phase 4 | Business Operations Workflow | Next/Later | Improve staff visibility and follow-up workflow |
| Phase 5 | Payments Planning | Later | Plan payment flow without turning classes into products |
| Phase 6 | Growth / Content / SEO | Later | Expand resources, credibility, content, and analytics |

---

# Phase 0 — Foundation / Prototype

**Status:** Done

## Goal

Create the redesigned public site experience and validate the core product direction.

## Completed

- Multi-page Next.js site
- Approved primary navigation
- Homepage structure
- Classes listing
- Class detail pages
- Calendar page
- Group Training page
- About page
- Contact page
- Merch page
- Registration page
- Shared components for cards, buttons, badges, sections, and forms
- Professional tactical-medical visual direction
- Class registration language separated from merch shopping language

## Notes

The original brief framed this phase as a front-end prototype. The project has since moved beyond this phase.

---

# Phase 1 — CMS + Operational Backends

**Status:** Done

## Goal

Move from static prototype toward a manageable pre-deployment beta.

## Completed

### Sanity CMS

- Embedded Studio at `/studio`
- Studio layout isolation
- CMS schemas for site/page content
- CMS schemas for scheduled classes
- CMS schemas for instructors
- CMS schemas for merch products
- Studio navigation organized for non-technical editing
- Fallback-to-Sanity content flow
- Sanity seed workflow restored/documented

### Supabase

- `public.registrations`
- `public.contact_inquiries`
- `public.group_training_inquiries`
- Server-side API routes
- RLS enabled
- `anon` / `authenticated` access revoked
- service-role writes only

### Registration and waitlist behavior

- Open/limited classes store `registrationStatus = pending`
- Waitlist classes store `registrationStatus = waitlist_requested`
- Waitlist requests bypass live remaining-seat checks
- Full/closed classes block normal registration

### Inquiry behavior

- Contact form stores submissions
- Group training form stores submissions
- Honeypot/timing/rate-limit style spam controls
- IP hash stored instead of raw IP

---

# Phase 2 — Deployment Stabilization

**Status:** Done

## Goal

Get the project into a stable preview/production-ready deployment posture without adding major new features.

## Primary outcomes

- Vercel environment configured
- Supabase production readiness verified
- Sanity production readiness verified
- Public routes smoke-tested
- Form submissions smoke-tested
- Docs aligned with runtime behavior
- Studio access policy decided or explicitly accepted
- Known launch risks documented

## Tasks

### 2.1 Documentation sync

**Status:** Current

- [ ] Confirm README reflects current registration/waitlist behavior
- [ ] Document that open/limited registrations store `pending`
- [ ] Document that waitlist requests store `waitlist_requested`
- [ ] Remove any stale “front-end only / not stored” inquiry language
- [ ] Add or link deployment checklist
- [ ] Add or link this roadmap
- [ ] Confirm docs mention no payment collection

### 2.2 Environment variable readiness

**Status:** Current

- [ ] Confirm Vercel Production env vars
- [ ] Confirm Vercel Preview env vars
- [ ] Confirm Vercel Development env vars if used
- [ ] Confirm `SUPABASE_SERVICE_ROLE_KEY` is server-only
- [ ] Confirm no secret is prefixed with `NEXT_PUBLIC_`
- [ ] Confirm `INQUIRY_IP_HASH_SALT` exists in production
- [ ] Confirm any exposed Sanity write token has been revoked

Required/recommended variables:

```text
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_SANITY_API_VERSION
NEXT_PUBLIC_SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
INQUIRY_IP_HASH_SALT
SANITY_API_WRITE_TOKEN      # seed-only, not runtime
```

### 2.3 Supabase verification

**Status:** Current

- [ ] Verify `public.registrations`
- [ ] Verify `public.contact_inquiries`
- [ ] Verify `public.group_training_inquiries`
- [ ] Verify registration status constraint includes `waitlist_requested`
- [ ] Verify indexes exist
- [ ] Verify RLS is enabled
- [ ] Verify anon/auth access revoked
- [ ] Verify server-side writes work from deployed preview

### 2.4 Sanity verification

**Status:** Current

- [ ] Verify `/studio` loads in deployed preview
- [ ] Verify `/studio` does not render public header/footer
- [ ] Verify Sanity project/dataset env vars
- [ ] Verify scheduled classes render from Sanity
- [ ] Verify fallback behavior still works
- [ ] Verify seed workflow docs/scripts exist
- [ ] Decide Studio access policy for production

### 2.5 Route smoke tests

**Status:** Current

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

### 2.6 Form smoke tests

**Status:** Current

- [ ] Submit open/limited registration
- [ ] Confirm row stores `registrationStatus = pending`
- [ ] Submit waitlist request
- [ ] Confirm row stores `registrationStatus = waitlist_requested`
- [ ] Submit contact inquiry
- [ ] Confirm row in `public.contact_inquiries`
- [ ] Submit group training inquiry
- [ ] Confirm row in `public.group_training_inquiries`

### 2.7 Product language QA

**Status:** Current

- [ ] No “Shop Classes”
- [ ] No class “Add to Cart”
- [ ] No class checkout/payment language
- [ ] No stale prototype-only form copy
- [ ] Merch remains separate from class registration
- [ ] CTAs align with project brief
- [ ] Tone remains professional, calm, safety-first

## Exit criteria

Phase 2 is complete when:

- Build passes
- Preview deployment works
- All public routes smoke-test cleanly
- Registration/waitlist/contact/group forms submit successfully
- Supabase rows are verified
- Sanity content/fallback behavior is verified
- Studio access decision is documented
- README and docs are synced

### Verification closeout (2026-05-03)

- Vercel production deployment confirmed working.
- Production environment variables confirmed present.
- Public routes confirmed loading.
- `/studio` confirmed loading, Sanity-connected, and isolated from public header/footer.
- Supabase write verification confirmed:
  - Open/limited registration requests store `registrationStatus = pending`, `paymentStatus = unpaid`, `source = website`.
  - Waitlist requests store `registrationStatus = waitlist_requested`, `paymentStatus = unpaid`, `source = website`.
  - Contact inquiries store `status = new`, `source = website`, with `ipHash` present.
  - Group training inquiries store `status = new`, `source = website`, with `ipHash` present.
- Initial production Studio policy documented: rely on Sanity authentication without additional Vercel/middleware gate; revisit later if needed.

---

# Phase 3 — Production Readiness Hardening

**Status:** Current

## Goal

Address operational risks before relying on the site for real public traffic.

## 3.1 Transaction-safe registration capacity

**Status:** Done

### Problem

Current registration seat checking is not transaction-safe. Two near-simultaneous submissions may oversubscribe a class.

### Options to evaluate

- Supabase RPC function for atomic registration insert
- Postgres transaction with row locking
- Capacity ledger table
- Reservation holds with expiration
- Manual approval queue

### Preferred near-term direction

Implement an atomic server-side registration/write path, likely with a Supabase RPC or database function, while preserving the current user-facing registration flow.

### Guardrails

- Do not add payments during this task
- Do not add auth during this task
- Do not remodel classes as products
- Preserve waitlist behavior
- Preserve existing public form UX unless required

### Exit criteria

- Concurrent submissions cannot exceed capacity
- Waitlist behavior still works
- Full/closed classes remain blocked
- Build passes
- Supabase SQL/docs updated

### Verification closeout (2026-05-03)

- Atomic Supabase RPC is implemented for registration inserts.
- Transaction-scoped advisory locking by `classSlug` is in use.
- Active capacity counting uses `pending` + `confirmed` and excludes canceled rows.
- Live registration writes verified:
  - Open/limited -> `registrationStatus = pending`, `paymentStatus = unpaid`, `source = website`
  - Waitlist -> `registrationStatus = waitlist_requested`, `paymentStatus = unpaid`, `source = website`
- Waitlist behavior remained unchanged.
- No payment/auth/email/CAPTCHA/admin features were added.

---

## 3.2 Studio access decision

**Status:** Next / Blocked pending decision

### Problem

`/studio` is publicly reachable, though protected by Sanity auth.

### Options

1. Accept Sanity auth as sufficient for initial production
2. Add platform-level protection
3. Add middleware gate
4. Deploy Studio separately

### Recommended decision style

Document the chosen approach in:

```text
docs/ai/ARCHITECTURE_DECISIONS.md
docs/ai/KNOWN_RISKS.md
README.md
```

### Exit criteria

- Production policy chosen
- Risk accepted or mitigated
- Docs updated

---

## 3.3 Secret/token hygiene

**Status:** Next

### Tasks

- [ ] Confirm exposed Sanity write token is revoked
- [ ] Confirm `.env.local` ignored
- [ ] Confirm no secrets in repo history, docs, screenshots, or logs
- [ ] Confirm Vercel secrets are scoped correctly
- [ ] Confirm seed token is not needed at runtime

### Exit criteria

- No known active exposed secrets
- Runtime secrets documented
- Seed token process documented

---

## 3.4 Error and abuse handling

**Status:** Later within Phase 3

### Tasks

- [ ] Review API error responses
- [ ] Confirm no sensitive error leakage
- [ ] Add structured logging plan if needed
- [ ] Decide whether lightweight spam controls are enough
- [ ] Defer CAPTCHA unless spam becomes real

### Guardrail

Do not add CAPTCHA/Turnstile unless explicitly requested.

---

# Phase 4 — Business Operations Workflow

**Status:** Next / Later

## Goal

Make registrations, waitlists, and inquiries easier for staff to manage.

## Current workflow

Staff currently use Supabase Table Editor:

- `public.registrations`
- `public.contact_inquiries`
- `public.group_training_inquiries`

## 4.1 Operational runbook

**Status:** Next

Create a staff-facing or internal runbook documenting:

- How to view registrations
- How to filter waitlist requests
- How to view contact inquiries
- How to view group training inquiries
- Meaning of statuses
- Suggested manual follow-up workflow
- How to export rows if needed

Recommended file:

```text
docs/operations/SUPABASE_WORKFLOW.md
```

## 4.2 Notification workflow

**Status:** Later

Potential options:

- Email notification on registration/inquiry
- Daily summary email
- Slack/Discord notification
- Supabase Edge Function
- Server route-triggered email provider
- Manual Supabase-only workflow for beta

Guardrail:

Do not add email notifications until explicitly requested as its own milestone.

## 4.3 Admin dashboard

**Status:** Deferred

Potential dashboard features:

- Registration roster
- Waitlist view
- Contact inquiry queue
- Group inquiry queue
- Status updates
- Export CSV
- Basic internal notes

Guardrail:

Do not build an admin dashboard until deployment baseline and operational workflow are stable.

---

# Phase 5 — Payments Planning

**Status:** Later

## Goal

Plan payment collection without breaking the core rule that classes are registrations, not products.

## Current state

- No Stripe
- No payment collection
- No real checkout
- `paymentStatus = unpaid`
- `amountDue` and `currency` fields exist for readiness
- Registration success should not imply payment completion

## Planning questions

- Should payment happen immediately after registration request?
- Should payment be manual/offline?
- Should staff confirm registration before payment?
- Should waitlists ever collect payment?
- Are refunds/transfers/cancellations defined?
- Are legal waivers required before payment?
- Should classes use Stripe Checkout, Payment Links, or custom PaymentIntents?
- How will payment status sync back to Supabase?

## Guardrails

- Do not make classes ecommerce products
- Do not introduce cart semantics for classes
- Do not mix merch checkout with class registration
- Do not add payment UI until policy and flow are decided
- Keep payment planning separate from merch planning

## Potential milestone sequence

1. Payment policy and business rules
2. Payment architecture decision record
3. Stripe sandbox proof of concept
4. Webhook design
5. Supabase payment status update path
6. UX copy review
7. Production rollout

---

# Phase 6 — Content, SEO, Trust, and Growth

**Status:** Later

## Goal

Make the site more complete, useful, credible, and discoverable after the core operational workflow is stable.

## 6.1 Content population

- [ ] Real homepage copy
- [ ] Real class descriptions
- [ ] Real instructor bios
- [ ] Real credentials
- [ ] Real policies
- [ ] Real FAQs
- [ ] Real group training content
- [ ] Real merch content
- [ ] Real images or polished placeholders

## 6.2 Trust assets

- [ ] Testimonials
- [ ] Instructor credential blocks
- [ ] Certification references
- [ ] Training photos
- [ ] What-to-expect content
- [ ] Waiver/policy links
- [ ] Safety-first copy

## 6.3 Resource/blog strategy

Potential resource sections:

- CPR/first aid preparation
- Stop-the-bleed style readiness education
- CCW preparation overview
- What to bring to class
- Workplace preparedness guides
- Training pathway guides

Guardrail:

Do not start blog/resource migration until core site and CMS workflow are stable.

## 6.4 SEO and analytics

Later tasks:

- Metadata review
- Open Graph images
- Sitemap/robots check
- Local business schema
- Course/event structured data planning
- Analytics setup
- Search Console setup

Guardrail:

Do not over-optimize SEO before content and deployment are stable.

---

# Deferred / Explicit Non-Goals

These should not be implemented unless explicitly requested and scoped as their own milestone.

- Stripe/payment processing
- Real checkout for classes
- App user accounts
- Admin dashboard
- Email notification automation
- CAPTCHA/Turnstile
- Inventory management
- Full merch checkout
- Blog migration
- Deep SEO strategy
- Analytics setup
- Legal policy drafting
- WordPress/WooCommerce integration

---

# Current Recommended Next Milestone

## Milestone: Deployment Stabilization and Documentation Sync

### Objective

Prepare the project for reliable preview/production deployment without adding major features.

### Suggested branch

```text
deployment-stabilization
```

### Suggested prompt

```text
Read project-brief.md, AGENTS.md, and docs/ai.

Current task:
Perform the Deployment Stabilization milestone from docs/ai/ROADMAP.md.

Scope:
- README/docs sync
- deployment readiness review
- env var checklist
- Supabase verification checklist
- Sanity verification checklist
- smoke test checklist

Guardrails:
- Do not add Stripe/payments.
- Do not add auth.
- Do not add email notifications.
- Do not add CAPTCHA/Turnstile.
- Do not build an admin dashboard.
- Do not remove fallback data.
- Keep classes as registrations, not products.
- Keep merch separate from class registration.

Validation:
Run npm.cmd run build if any code changes are made.

Output:
Report files changed, commands run, assumptions, blockers, and next exact steps.
```

### Exit criteria

- README accurately reflects current behavior
- Docs link or mention roadmap/checklists
- Build passes
- Preview deployment plan is clear
- Supabase/Sanity readiness is verified or blockers listed
- Smoke test plan is ready

---

# Roadmap Maintenance Rules

Update this file when:

- A phase is completed
- A new milestone starts
- A major feature lands
- A major risk is resolved
- A guardrail changes
- A new architectural decision is made
- Deployment status changes
- Payment/admin/email/auth planning begins

Do not update this file for:

- Tiny UI copy changes
- Minor component polish
- One-off debugging notes
- Temporary branch-specific state

Branch-specific state belongs in a handoff, not this roadmap.

---

# Related Docs

Recommended companion files:

```text
project-brief.md
AGENTS.md
docs/ai/PROJECT_CONTEXT.md
docs/ai/ARCHITECTURE_DECISIONS.md
docs/ai/KNOWN_RISKS.md
docs/ai/PROJECT_BRIEF_ALIGNMENT.md
docs/ai/DEPLOYMENT_READINESS_CHECKLIST.md
docs/ai/OPERATOR_CHECKLISTS.md
docs/ai/CODEX_PROMPT_OPTIMIZATION_GUIDE.md
docs/ai/HANDOFF_TEMPLATE.md
```
