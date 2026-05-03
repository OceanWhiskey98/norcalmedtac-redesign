# NorCalMedTac Website — Project Context

## Purpose

NorCalMedTac is a Northern California training provider offering practical medical, defensive, firearms-related, workplace, and group training.

The website is being rebuilt from an outdated WordPress/WooCommerce-style experience into a premium training platform where the main user journey is class discovery and registration, not shopping.

The public site should help users:

- Discover upcoming classes
- Review class details
- Submit class registration requests
- Join waitlists when classes are not openly registering
- Submit contact inquiries
- Submit group training inquiries
- Learn about the company and instructors
- Browse merchandise separately from class registration

The product should feel professional, safety-first, credible, restrained, practical, and easy for a non-technical business owner or staff member to manage.

---

## Source-of-Truth Priority

When working in the repo, use this priority order:

1. `project-brief.md` for product intent, language rules, audience, UX priorities, and brand direction
2. `AGENTS.md` for agent/development behavior rules
3. `/docs/ai/PROJECT_CONTEXT.md` for AI operating context
4. `/docs/ai/ARCHITECTURE_DECISIONS.md` for durable technical decisions
5. Current code and branch state
6. Older handoff summaries only as historical reference

Important nuance:

The original project brief describes a front-end prototype with static/mock data only. The repo has since evolved beyond that prototype stage. Sanity CMS and Supabase-backed submissions now exist. Keep the brief as the source of truth for product language, UX, content model, and design direction, but follow current code/docs for implemented backend/CMS reality.

---

## Core Product Rule

Classes are **registrations**, not ecommerce products.

Do not model classes as products.  
Do not add carts, class checkout, class purchase language, or class ecommerce flows.

Allowed class language:

- Register
- Reserve seat
- Request registration
- Join waitlist
- Attendee information
- Registration request
- Submit registration
- Class confirmation

Avoid for classes:

- Add to cart
- Buy now
- Checkout
- Shop classes
- Product
- Purchase class
- Quantity
- Store
- Continue shopping

Merchandise may use ecommerce language, but merch must stay separate from class registration.

---

## Target Audiences

- Civilians seeking practical emergency or defensive training
- Businesses needing workplace medical or emergency preparedness training
- Clubs and private groups requesting custom instruction
- Armed professionals seeking defensive or tactical skill development
- Public safety and medical personnel seeking certification or continuing education
- Students looking for AHA, ASHI, ITLS, EMT, CPR, first aid, CCW, defensive firearms, or tactical medicine courses

---

## Current Stack

- Next.js App Router, Next 16.x
- TypeScript
- Tailwind CSS
- Sanity CMS with embedded Studio at `/studio`
- Supabase Postgres for operational submissions
- Server-side Supabase service-role usage
- npm on Windows PowerShell, usually via `npm.cmd`

No app user auth, no Stripe, no payment collection, no email notifications, no CAPTCHA/Turnstile, and no admin dashboard are implemented yet.

---

## Major Public Routes

```text
/
 /about
 /classes
 /classes/[slug]
 /calendar
 /group-training
 /contact
 /merch
 /register/[slug]
 /studio
```

API routes:

```text
/api/registrations
/api/contact-inquiries
/api/group-training-inquiries
```

---

## Approved Navigation

Primary navigation:

- Home
- Classes
- Calendar
- Group Training
- About
- Merch
- Contact

Global/header CTA:

- View Upcoming Classes

Do not use:

- Shop Classes
- Duplicate sidebar navigation
- Merchandise inside class categories
- Calendar buried under Classes
- Group Training buried under Contact

---

## Design Direction

Tone:

- Professional
- Premium
- Calm
- Capable
- Practical
- Trustworthy
- Tactical without being aggressive
- Direct without being fear-based
- Serious without feeling militarized or theatrical

Visual direction:

- Refined tactical-medical aesthetic
- Dark charcoal/graphite for header, footer, hero, and selected feature bands
- Light neutral backgrounds for content-heavy sections
- Olive and muted medical red as controlled accents
- Sturdy, modern headings
- Highly readable body text
- Mobile-first layouts
- Clear CTA hierarchy
- Scannable class metadata

Avoid:

- Bright mismatched category colors
- Distressed/grunge effects
- Stencil or novelty tactical fonts
- Excessive all-caps
- Generic military styling
- Aggressive or fear-based copy
- WooCommerce product archive feel
- Duplicate sidebars
- Low contrast text
- Tiny type

---

## Visual Style Tokens from Project Brief

Base colors:

- Charcoal: `#181A1B`
- Graphite: `#24282A`
- Off White: `#F4F2ED`
- Warm Gray: `#E2DED6`
- Steel Gray: `#7D8588`

Accent colors:

- Field Olive: `#4B5A3C`
- Medical Red: `#B2332F`
- Muted Gold: `#B98A2E`

Color usage:

- Charcoal and graphite: header, footer, hero, dark feature bands
- Off white and warm gray: content backgrounds
- Field olive: category accents, secondary buttons, subtle UI states
- Medical red: primary CTAs and urgent status indicators
- Muted gold: sparing highlights and credential accents

---

## CMS Model

Sanity is the primary long-term editing workflow. Local fallback data remains mandatory while Sanity content may be incomplete, empty, or temporarily unavailable.

Sanity Studio is embedded at:

```text
/studio
```

Studio is isolated from the public site header/footer.

Studio content groups include:

```text
Site Pages
Classes
People
Merch
Settings
```

CMS content areas include:

- Site Settings
- Homepage Content
- About Page
- Classes Page
- Calendar Page
- Registration Page
- Group Training Page
- Contact Page
- Scheduled Classes
- Instructors
- Merch Products

---

## Operational Data Model

Supabase stores operational submissions.

Tables:

```text
public.registrations
public.contact_inquiries
public.group_training_inquiries
```

Supabase is not used directly from client components. Public forms post to server-side API routes.

---

## Class Status Contract

Current canonical runtime statuses:

```text
open
limited
waitlist
full
closed
```

The original brief used `soldOut`; current code/docs normalize sold-out behavior as `full`.

Expected behavior:

```text
open:
- Label: Open
- CTA: Register
- Registration page: normal registration
- DB status: pending

limited:
- Label: Limited Seats
- CTA: Register
- Registration page: normal registration
- DB status: pending

waitlist:
- Label: Waitlist
- CTA: Join Waitlist
- Registration page: waitlist mode/copy
- DB status: waitlist_requested
- Does not show live remaining seats
- Does not get blocked by remaining-seat check

full:
- Label: Sold Out
- CTA disabled
- No normal registration form

closed:
- Label: Closed or Registration Closed
- CTA disabled
- No normal registration form
```

---

## Known Limitations

### Registration Concurrency

The current seat check is not fully transaction-safe. Near-simultaneous submissions could pass availability checks before inserts become visible.

Before high-volume launch or payment integration, harden registration with a transactional seat-reservation strategy, Supabase RPC, locking, or equivalent atomic approach.

### Studio Access

`/studio` is publicly routable but protected by Sanity auth. A final production access policy is still needed.

Options:

- Leave Sanity auth as-is
- Gate `/studio`
- Protect route via deployment platform
- Deploy Studio separately

### Documentation Drift Risk

README and project docs must stay aligned with runtime behavior, especially around waitlist storage:

- Open/limited registration requests store `registrationStatus = pending`
- Waitlist requests store `registrationStatus = waitlist_requested`

---

## Current High-Level Readiness

Implemented:

- CMS expansion and Studio polish
- Fallback-to-Sanity content flow
- Registration backend with Supabase persistence
- Inquiry backends for contact and group training
- Class status normalization
- Waitlist storage as distinct registration status
- Sanity seed workflow restored/documented
- Supabase constraints/indexes/RLS posture established

Not implemented:

- Payments
- Auth
- Email notifications
- CAPTCHA/Turnstile
- Admin dashboard
- Transaction-safe seat reservation
