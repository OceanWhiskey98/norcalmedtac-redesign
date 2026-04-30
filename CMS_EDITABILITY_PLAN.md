# CMS Editability Plan

This plan tracks the remaining GUI-editability work before any Stripe or payment planning. It preserves the current rule that classes are registrations, not products, and keeps local fallback data as the safety net when Sanity is empty or unavailable.

## Current CMS Coverage

- `siteSettings`: business name, tagline, service area, contact email, phone, logo, social links.
- `homepageContent`: homepage hero, learning points, trust stats, value points, expectations, credentials, group CTA, final CTA.
- `instructor`: instructor profile content.
- `scheduledClass`: scheduled class metadata, student-facing details, image, instructor, related classes.

## Priority 1: Page Content Documents

Add page-specific singleton documents for public pages that still have substantial hardcoded copy.

### `groupTrainingPage`

Fields:

- hero label, headline, body
- use cases: title, summary
- training options: title, summary
- how it works steps: title, summary
- credentials headline and body
- form intro headline and body

Public wiring:

- Replace hardcoded arrays and placeholder summaries in `/group-training`.
- Keep `GroupInquiryForm` front-end only.
- Fall back to current local copy if Sanity returns nothing.

### `contactPage`

Fields:

- hero label, headline, body
- form intro headline and body
- contact cards: label, title, body, tone
- FAQ summaries: question, answer

Public wiring:

- Replace hardcoded cards and FAQ placeholder copy in `/contact`.
- Keep `ContactForm` front-end only.
- Use `siteSettings.contactEmail`, `siteSettings.phone`, and `siteSettings.serviceArea` where useful.

### `aboutPage`

Fields:

- hero label, headline, body
- mission headline and body
- audiences: text
- philosophy points: title, summary
- final trust CTA headline and body

Public wiring:

- Keep instructor cards sourced from `instructor`.
- Replace hardcoded audience/philosophy arrays.
- Continue using `siteSettings.businessName` and `siteSettings.serviceArea`.

## Priority 2: Merchandise CMS

Add a separate `merchProduct` document. Merchandise can use ecommerce language; classes cannot.

Fields:

- title, slug, category
- description
- price, currency
- images and image alt text
- variants: label, values
- inventory status: in stock, low stock, out of stock
- shopping URL or placeholder route
- featured
- sort order

Public wiring:

- Replace `merchandise` usage on `/merch` with `getMerchProducts()`.
- Keep local fallback merchandise data.
- Preserve `Add to Cart` only on merchandise cards.
- Do not add real checkout, inventory management, accounts, or payments.

## Priority 3: Shared Support Content

Add reusable content documents or singleton fields for repeated support blocks.

Recommended shape:

- `supportLink`: title, summary, href, category
- `policySummary`: title, summary, href
- optional `testimonial`: quote, attribution, context, featured

Public wiring:

- Replace classes page FAQ/policy placeholder cards.
- Reuse support summaries on class detail and registration pages where appropriate.
- Keep all route targets valid before exposing links.

## Priority 4: Class Discovery Page Copy

Create a `classesPage` singleton for page-level copy around dynamic class data.

Fields:

- hero label, headline, body
- featured class label
- group training CTA headline and body
- support section headline and cards
- filter helper copy, if needed

Public wiring:

- Keep class cards and class data from `scheduledClass`.
- Keep filters as front-end placeholders until real filtering is requested.
- Keep registration CTAs status-aware.

## Priority 5: Calendar Page Copy

Create a `calendarPage` singleton for page-level copy around dynamic class data.

Fields:

- hero label, headline, body
- empty-state headline and body
- filter intro copy, if needed

Public wiring:

- Keep chronological class grouping from `scheduledClass`.
- Keep filters and month links front-end only until real filtering is requested.

## Priority 6: Registration Shell Copy

Create a small `registrationPage` singleton for copy that surrounds dynamic class data.

Fields:

- hero label, headline, body
- no-payment note
- seat-availability fallback message
- form intro or help text
- post-submit success copy, if not already localized in the form component

Public wiring:

- Do not touch Supabase registration behavior in this pass.
- Continue showing dynamic class date, time, location, price, status, and remaining seats.

## Implementation Order

1. Add schemas and fallback data for `groupTrainingPage`, then wire `/group-training`.
2. Add schemas and fallback data for `contactPage`, then wire `/contact`.
3. Add schemas and fallback data for `aboutPage`, then finish `/about`.
4. Add `merchProduct` schema and `getMerchProducts()`, then wire `/merch`.
5. Add classes/calendar/registration shell content after the main hardcoded pages are editable.
6. QA empty, partial, and populated Sanity states for each page.

## Guardrails

- Do not add Stripe yet.
- Do not change Supabase registration logic unless explicitly requested.
- Do not remove local fallback data.
- Do not model classes as products.
- Do not use `Add to Cart` for classes.
- Do not use `Shop Classes`.
- Keep forms front-end only unless a future task explicitly requests backend processing.
- Run `npm run build` before finishing each implementation milestone.
