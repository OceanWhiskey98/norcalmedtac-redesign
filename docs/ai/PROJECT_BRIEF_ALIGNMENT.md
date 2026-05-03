# Project Brief Alignment Checklist

Use this file when reviewing changes against `project-brief.md`.

This file does not replace `project-brief.md`. The brief remains the source of truth for product intent, UX priorities, language, content model, and visual style.

Important:
The original project brief says the build is front-end/mock-only. The current repo has evolved beyond that into Sanity CMS and Supabase-backed submissions. Do not remove current backend/CMS behavior solely because the original brief described an earlier prototype phase.

---

## Product Intent

A change should support one or more of these goals:

- Professional public website
- Class discovery
- Class detail review
- Registration request intake
- Waitlist request intake
- Group training inquiry intake
- Contact inquiry intake
- Instructor/company credibility
- Merchandise browsing separate from class registration
- Non-technical CMS editing workflow

---

## Tone and Brand

Check that copy and UI feel:

- Professional
- Premium
- Safety-first
- Credibility-forward
- Practical
- Calm
- Capable
- Trustworthy
- Tactical without being aggressive
- Direct without being fear-based
- Serious without feeling militarized or theatrical

Avoid:

- Fear-based messaging
- Exaggerated tactical claims
- Vague authority language
- Aggressive military visuals
- Distressed/grunge style
- Stencil typography
- Bright mismatched category colors

---

## Navigation

Approved primary nav:

- Home
- Classes
- Calendar
- Group Training
- About
- Merch
- Contact

Global/header CTA:

- View Upcoming Classes

Check:

- [ ] No “Shop Classes”
- [ ] Calendar is not buried under Classes
- [ ] Group Training is not buried under Contact
- [ ] Merchandise is not inside class categories
- [ ] No duplicate sidebar navigation
- [ ] Mobile menu remains simple

---

## Class Language Rules

Allowed for classes:

- Register
- Reserve Seat
- Training Registration
- Attendee Information
- Registration Summary
- Complete Registration
- Seats
- Class
- Class Confirmation
- Join Waitlist

Avoid for classes:

- Add to Cart
- Product
- Quantity
- Shop Classes
- Store
- Merchandise checkout
- Continue shopping
- Buy now
- Checkout

---

## Merch Separation

Merch can use shopping/ecommerce language, but it must not leak into classes.

Check:

- [ ] Class cards do not say Add to Cart
- [ ] Class detail pages do not imply ecommerce checkout
- [ ] Registration form does not use product/cart language
- [ ] Merch cards can say Add to Cart
- [ ] Merch remains visually secondary to training where appropriate

---

## CTA Consistency

Expected CTA labels:

- Global/header: View Upcoming Classes
- Homepage primary: View Upcoming Classes
- Homepage secondary: Request Group Training
- Class listing: Register / Join Waitlist / Sold Out / Registration Closed
- Class detail: Register for This Class or status-aware equivalent
- Group training: Request Group Training
- Merch: Add to Cart

Check:

- [ ] No unnecessary new CTA wording
- [ ] Register is used only for specific class instances
- [ ] Request Group Training is used only for group lead flow
- [ ] Add to Cart is used only for merchandise

---

## Class Listing UX

Class cards should show:

- Category
- Title
- Date and time
- Location
- Duration
- Price
- Seats/status
- Certification label if applicable
- Short summary
- Status-aware CTA
- View Details action

Avoid:

- Default sorting
- Product archive feel
- Product labels
- Add to Cart

---

## Class Detail UX

Class detail pages should answer:

- What is this class?
- When is it?
- Where is it?
- What does it cost?
- Who is it for?
- What will I learn?
- What should I bring?
- What are prerequisites/legal/safety requirements?
- Who is teaching?
- What policies apply?

Check:

- [ ] Primary CTA appears above fold
- [ ] Mobile sticky registration CTA exists or remains planned
- [ ] Disabled states are clear for full/closed classes
- [ ] Ask a Question path exists or remains planned

---

## Calendar UX

The calendar experience should prioritize usable class discovery.

Check:

- [ ] Upcoming classes are chronological
- [ ] Past classes hidden by default
- [ ] Classes grouped or filterable by month
- [ ] List view remains primary
- [ ] Sold-out classes remain visible but clearly marked

---

## Group Training UX

Group Training page should support business, workplace, club, private group, and organizational leads.

Lead fields from brief:

- Name
- Organization
- Email
- Phone
- Group size
- Training type
- Preferred date range
- Location
- Message

Current implementation note:
The brief said front-end only, but the repo now stores group inquiries in Supabase. Copy should reflect current behavior without overpromising email/CRM automation.

---

## Visual Style

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

Check:

- [ ] Dark header/footer/hero or feature bands are intentional
- [ ] Content-heavy areas use light neutral backgrounds
- [ ] Medical red is reserved for primary CTAs/urgent states
- [ ] Olive is used for controlled secondary accents
- [ ] Typography remains sturdy and readable
- [ ] No novelty tactical fonts

---

## Component Consistency

Check:

- [ ] Shared cards/buttons/badges/layout components reused
- [ ] No duplicate inconsistent components
- [ ] Forms have clear labels and accessible inputs
- [ ] Class cards prioritize metadata hierarchy
- [ ] Product cards prioritize image, name, price, Add to Cart
- [ ] Empty image states are styled, not broken

---

## Trust and Credibility

Trust elements should appear throughout the site.

Check for:

- [ ] Instructor bios and credentials
- [ ] AHA/ASHI/ITLS/EMT references where applicable
- [ ] Prerequisites
- [ ] What to expect
- [ ] Safety-first language
- [ ] Policies/waiver references
- [ ] Contact info easy to find
- [ ] Group training credibility for businesses/organizations
