# NorCalMedTac Architecture Decisions

This file records durable technical/product decisions. It should be updated when the project intentionally changes direction.

---

## ADR-001: Classes Are Registrations, Not Products

Decision:
Classes are modeled as registration/waitlist flows, not ecommerce products.

Reason:
- Current site does not collect payment.
- Class enrollment is operational, not checkout-driven.
- Avoids cart/checkout complexity.
- Matches project brief language rules.

Consequences:
- Do not use class “Add to Cart” language.
- Do not merge class registration with merch.
- Payment planning, if added later, must preserve registration semantics.

---

## ADR-002: Sanity CMS With Local Fallback Data

Decision:
Use Sanity as the editing layer while preserving local fallback data.

Reason:
- Non-technical editing is a primary project goal.
- Fallback data keeps the site usable if Sanity is empty or unavailable.
- CMS migration can happen incrementally.

Context:
The original project brief described static/mock data only, but the repo has evolved into a CMS-backed implementation. Do not remove Sanity just to match the old prototype constraint.

Consequences:
- Do not remove `lib/data.ts` fallback behavior yet.
- CMS helpers should degrade gracefully.
- New CMS-driven pages should preserve fallback copy/data.

---

## ADR-003: Supabase Server-Side Writes Only

Decision:
Use Supabase for operational submissions through server-side API routes.

Reason:
- Protects service role key.
- Prevents client-side tampering.
- Keeps validation centralized.

Context:
The original project brief described front-end placeholder interactions only. The repo has evolved to include Supabase-backed operational submissions.

Consequences:
- No direct client writes to Supabase.
- `SUPABASE_SERVICE_ROLE_KEY` must stay server-only.
- Form components submit to API routes, not Supabase directly.

---

## ADR-004: Waitlists Use the Registrations Table

Decision:
Waitlist requests are stored in `public.registrations` using `registrationStatus = waitlist_requested`.

Reason:
- Keeps class interest and registration requests unified.
- Avoids premature schema complexity.
- Allows simple filtering in Supabase.

Consequences:
- Supabase status constraint must include `waitlist_requested`.
- Waitlist requests should bypass remaining-seat checks.
- README/docs must explain pending vs waitlist_requested behavior.

---

## ADR-005: No App User Authentication Yet

Decision:
Do not add app-level user accounts/auth in the current phase.

Reason:
- Not needed for public browsing, registration requests, or inquiries.
- Avoids unnecessary complexity.
- Admin workflows are not yet implemented.

Consequences:
- No protected user dashboard.
- No account-specific registration tracking.
- Sanity Studio relies on Sanity auth.

---

## ADR-006: No Payments Yet

Decision:
Do not implement Stripe or payment collection in the current phase.

Reason:
- Current goal is request/intake workflow.
- Payment architecture should be planned after content, registration, inquiry, and deployment foundations are stable.
- Avoids legal/UX confusion around unpaid registration requests.

Consequences:
- Registration success should not imply payment completion.
- Copy should clearly distinguish request submission from paid enrollment if needed.
- Payment roadmap should be handled as a separate milestone.

---

## ADR-007: Inquiry Forms Use Server Routes and Supabase Tables

Decision:
Contact and group training forms submit to dedicated API routes and tables.

Routes:

```text
/api/contact-inquiries
/api/group-training-inquiries
```

Tables:

```text
public.contact_inquiries
public.group_training_inquiries
```

Reason:
- Keeps inquiries separate from class registration.
- Supports future workflow/status tracking.
- Enables basic spam/rate-limit controls.

Consequences:
- Copy should no longer claim forms are front-end-only or not stored.
- `INQUIRY_IP_HASH_SALT` should be set in production.
- No email notification is currently assumed.

---

## ADR-008: Studio Is Embedded at `/studio`

Decision:
Embed Sanity Studio inside the Next.js app at `/studio`.

Reason:
- Simple non-technical editing access.
- Keeps content workflow close to app.

Consequences:
- `/studio` must be isolated from public site chrome.
- Production access policy must be decided.
- Do not casually bump Sanity package versions due to prior version-sensitive behavior.

---

## ADR-009: Small Scoped Changes Over Broad Refactors

Decision:
Use small, milestone-based commits and avoid unrelated refactors.

Reason:
- Project is being developed through AI-assisted sessions.
- Small diffs are easier to validate, merge, and hand off.
- Reduces regression risk.

Consequences:
- Prompts should specify scope and guardrails.
- Large features should start with a plan-only step.
- Handoffs should include exact branch state and next commands.

---

## ADR-010: Project Brief Remains Product Truth, Not Runtime Freeze

Decision:
Continue using `project-brief.md` as the product and UX source of truth, but do not treat its original front-end-only/non-goal section as a command to remove implemented backend/CMS features.

Reason:
- The brief captured the initial redesign target.
- The implementation has progressed to a pre-deployment beta with Sanity and Supabase.
- Product language and IA remain valid; prototype-only constraints have been superseded by current project state.

Consequences:
- Check copy, navigation, CTA labels, visual design, and content hierarchy against the brief.
- Check runtime/backend behavior against current code and `/docs/ai`.
- When there is conflict, preserve implemented architecture unless explicitly asked to roll it back.
