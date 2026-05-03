# NorCal MedTac Website Redesign Brief

## 1. Project Overview

NorCal MedTac is a Northern California training provider offering practical medical, defensive, firearms-related, workplace, group, and preparedness training. The business serves individuals, businesses, clubs, armed professionals, public safety personnel, medical personnel, and organizations that need hands-on, credible, safety-first instruction.

The legacy website presents the business through an outdated WordPress/WooCommerce-style experience. Classes have historically been treated like store products, navigation has been cluttered, class information has been difficult to scan, and the visual system has not fully communicated the professionalism the business requires.

The redesign rebuilds the site as a premium training platform. Ecommerce is secondary. The core strategic shift remains:

**NorCal MedTac is not a shop that sells classes. It is a professional training organization that accepts registrations.**

This shift controls the site architecture, page language, CTA labels, checkout concepts, class registration flows, visual hierarchy, and user experience.

---

## 2. Implementation Status Note

This brief was originally written for the front-end redesign/spec phase. It remains the source of truth for:

- Product positioning
- User experience
- Navigation
- Visual direction
- Tone and copy rules
- Content model
- Class-vs-merch language rules

The implementation has since evolved beyond the original prototype phase. The current project now includes:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Sanity CMS
- Supabase-backed registrations
- Supabase-backed waitlist requests
- Supabase-backed contact inquiries
- Supabase-backed group training inquiries
- Local fallback data when CMS content is unavailable
- Deployment readiness documentation

For current runtime architecture, known risks, deployment status, AI operating context, and roadmap priorities, use:

- `docs/ai/PROJECT_CONTEXT.md`
- `docs/ai/ARCHITECTURE_DECISIONS.md`
- `docs/ai/ROADMAP.md`
- `docs/ai/KNOWN_RISKS.md`
- `docs/ai/DEPLOYMENT_READINESS_CHECKLIST.md`
- `docs/ai/PROJECT_BRIEF_ALIGNMENT.md`

If this brief appears to conflict with current implementation docs, use this brief for product/design/language decisions and use current code plus `docs/ai` for runtime architecture.

Do not remove implemented Sanity or Supabase functionality simply because the original brief described a front-end-only prototype phase.

---

## 3. Business Model & User Types

NorCal MedTac has three primary business lines:

- Individual class registration
- Group, workplace, private, and custom training inquiries
- Merchandise sales

Target audiences:

- Civilians seeking practical emergency or defensive training
- Businesses needing workplace medical or emergency preparedness training
- Clubs and private groups requesting custom instruction
- Armed professionals seeking defensive or tactical skill development
- Public safety and medical personnel seeking certification or continuing education
- Students looking for scheduled AHA, ASHI, ITLS, EMT, CPR, first aid, CCW, defensive firearms, or tactical medicine courses

Primary user use cases:

- Browse upcoming classes
- Filter classes by category, date, location, skill level, availability, or certification
- View class details before registering
- Submit a registration request for a scheduled class
- Join a waitlist for classes that are not openly registering
- Review what to bring, prerequisites, and class expectations
- Request private, group, workplace, or custom training
- Browse merchandise separately from training registration
- Contact NorCal MedTac with questions before registering

---

## 4. Core Product Principle

Classes are registrations, not ecommerce products.

A class record represents a scheduled training event. It should be presented as a professional registration opportunity, not as a store item.

Use class language such as:

- Register
- Reserve Seat
- Join Waitlist
- Training Registration
- Attendee Information
- Registration Request
- Registration Summary
- Submit Registration
- Class Confirmation
- Seats
- Class

Do not use class language such as:

- Add to Cart
- Product
- Quantity
- Buy Now
- Checkout
- Shop Classes
- Store
- Continue Shopping
- Merchandise Checkout

Merchandise may use ecommerce language, but merchandise must remain separate from class registration.

---

## 5. Core Design Principles

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

- Use a refined tactical-medical aesthetic.
- Use dark charcoal for the header, footer, hero, and selected feature bands.
- Use light neutral backgrounds for content-heavy areas so classes, dates, registration details, and inquiry content are easy to scan.
- Use olive and muted medical red as controlled accents.
- Avoid bright category colors, distressed effects, stencil typography, heavy grunge textures, and generic military styling.
- Use consistent training imagery where available.
- If final brand photography is unavailable, use polished placeholders with consistent aspect ratios and clear replacement paths.

Typography intent:

- Headings must feel sturdy, modern, and authoritative.
- Body text must prioritize readability.
- Avoid novelty tactical fonts.
- Avoid excessive all-caps text.
- Use clear hierarchy with heading, subheading, metadata, and CTA levels.

UX priorities:

- Mobile-first layout and interaction patterns
- Fast path to upcoming classes
- Clear distinction between registration and shopping
- High trust before conversion
- Scannable class information
- Persistent conversion actions on class detail pages
- Minimal navigation clutter
- No duplicate sidebars
- Clear group training inquiry flow
- Clear contact path for questions before registration

---

## 6. Current Technical Direction

The product should preserve the current implementation direction:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Sanity CMS for editable site content
- Supabase Postgres for operational submissions
- Server-side Supabase writes only
- Local fallback data for CMS resilience
- No app user authentication yet
- No Stripe or payment collection yet
- No email notification automation yet
- No CAPTCHA/Turnstile yet
- No admin dashboard yet

Sanity CMS is used for non-technical content editing. Supabase is used for operational submissions such as registrations, waitlists, contact inquiries, and group training inquiries.

Fallback content remains mandatory. The public site must continue to render usable content if Sanity is empty, partially populated, or temporarily unavailable.

---

## 7. Site Architecture

Primary navigation:

- Home
- Classes
- Calendar
- Group Training
- About
- Merch
- Contact

Header CTA:

- View Upcoming Classes

Footer navigation may include:

- FAQs
- Policies
- Waivers
- Refund & Cancellation Policy
- Instructor Credentials
- Gallery
- Blog / Resources
- Reading List
- Contact

Navigation rules:

- Do not use “Shop Classes.”
- Do not place merchandise inside class categories.
- Do not use a right sidebar for duplicate navigation.
- Keep primary navigation flat and clear.
- Use dropdowns only for class category shortcuts if needed.
- Do not bury Calendar under Classes.
- Do not bury Group Training under Contact.
- On mobile, use a simple menu with the header CTA visible or accessible within the first menu screen.

Primary public routes:

- `/`
- `/about`
- `/classes`
- `/classes/[slug]`
- `/calendar`
- `/group-training`
- `/contact`
- `/merch`
- `/register/[slug]`
- `/studio`

Operational API routes:

- `/api/registrations`
- `/api/contact-inquiries`
- `/api/group-training-inquiries`

---

## 8. CMS and Editing Experience

Sanity Studio is embedded at:

- `/studio`

The Studio editing experience should support non-technical staff.

CMS editing goals:

- Staff can edit page content without code changes.
- Staff can edit scheduled classes.
- Staff can edit instructors.
- Staff can edit merch products.
- Staff can edit page shell copy where applicable.
- Public site remains stable if Sanity is empty or unavailable.

Sanity Studio should be organized clearly for business users.

Recommended content groups:

- Site Pages
- Classes
- People
- Merch
- Settings

CMS-controlled areas may include:

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

CMS rules:

- Preserve fallback data.
- Do not remove local fallback behavior.
- Avoid exposing implementation details to non-technical editors.
- Use clear field labels and descriptions.
- Use validation where it prevents broken public content.
- Do not make editors manage unnecessary technical fields unless required.

---

## 9. Content Model

Use consistent structured data for all site content. Do not model classes as merchandise.

### 9.1 Classes

A class record represents a scheduled training event, not a generic product.

Each class should include:

- `id`: unique string
- `title`: class title
- `slug`: URL-safe class identifier
- `categoryId`: linked class category
- `summary`: short one- or two-sentence description
- `description`: full class description
- `date`: scheduled class date in `YYYY-MM-DD` format
- `startTime`: class start time in local time
- `endTime`: class end time in local time
- `duration`: human-readable duration
- `locationName`: venue or training location name
- `locationCity`: city
- `locationState`: state
- `locationAddress`: full address or display-safe location
- `price`: numeric price
- `currency`: default `USD`
- `capacity`: total seats
- `seatsAvailable`: available seats or derived remaining seats
- `status`: current registration availability state
- `skillLevel`: `beginner`, `intermediate`, `advanced`, or `allLevels`
- `certification`: certification name or `none`
- `certificationBody`: `AHA`, `ASHI`, `ITLS`, `EMT`, `NRA`, `CCW`, `Internal`, or `none`
- `audience`: list of intended audiences
- `prerequisites`: list of requirements
- `whatYouWillLearn`: list of learning outcomes
- `whatToBring`: list of required items
- `safetyRequirements`: list of safety requirements
- `legalRequirements`: list of legal requirements where relevant
- `instructorIds`: linked instructors
- `image`: class image URL or asset reference
- `registrationUrl`: registration route
- `relatedClassIds`: related classes

Current canonical runtime statuses:

- `open`
- `limited`
- `waitlist`
- `full`
- `closed`

Legacy or imported content may refer to `soldOut`; current runtime behavior should normalize sold-out display to `full` / “Sold Out” behavior.

Class status display rules:

- `open`: show “Open”
- `limited`: show “Limited Seats”
- `waitlist`: show “Waitlist”
- `full`: show “Sold Out”
- `closed`: show “Registration Closed” or “Closed”

Class CTA rules:

- `open`: button label is “Register”
- `limited`: button label is “Register”
- `waitlist`: button label is “Join Waitlist”
- `full`: disabled button label is “Sold Out”
- `closed`: disabled button label is “Registration Closed”

Runtime storage behavior:

- Open/limited registration requests store `registrationStatus = pending`
- Waitlist requests store `registrationStatus = waitlist_requested`
- Waitlist requests should not be blocked by normal remaining-seat checks
- Full/closed classes should not show a normal registration form

### 9.2 Instructors

Each instructor should include:

- `id`: unique string
- `name`: full name
- `role`: instructor title
- `bio`: concise biography
- `credentials`: list of credentials
- `specialties`: list of training specialties
- `certificationBodies`: related organizations or certifications
- `image`: portrait URL or asset reference
- `featured`: boolean

Instructor content should emphasize credibility, practical experience, certifications, and calm instructional professionalism.

### 9.3 Categories

Class categories should include:

- `id`: unique string
- `name`: display name
- `slug`: URL-safe identifier
- `summary`: concise category description
- `parentCategoryId`: parent category or `null`
- `accent`: controlled visual accent key
- `sortOrder`: numeric display order

Primary class categories:

- Medical & Certification Courses
- Tactical Medicine
- Defensive Firearms
- Concealed Carry
- Private Instruction
- Group / Workplace Training
- Special Events

Defensive Firearms subcategories:

- Handgun
- Rifle
- Shotgun

Merchandise is not a class category.

### 9.4 Merchandise

Merchandise should include:

- `id`: unique string
- `title`: product title
- `slug`: URL-safe product identifier
- `category`: merchandise category
- `description`: product description
- `price`: numeric price
- `currency`: default `USD`
- `images`: list of product images
- `variants`: size, color, or style variants
- `inventoryStatus`: `inStock`, `lowStock`, or `outOfStock`
- `shoppingUrl`: product route, external shopping URL, or placeholder route
- `featured`: boolean

Merchandise categories:

- Apparel
- Patches
- Gear
- Gift Certificates
- Accessories

Merch rules:

- Merch may use “Shop,” “Product,” “Add to Cart,” “Cart,” and “Checkout.”
- Merch must not be mixed into class registration.
- Merch may be previewed on the homepage but must remain visually secondary to training.

---

## 10. Homepage Structure

The homepage should establish NorCal MedTac as a professional training organization and quickly route users to the right action.

Recommended structure:

1. **Hero**
   - Purpose: establish positioning and credibility.
   - Content: headline, short positioning statement, primary CTA, secondary CTA, trust line.
   - Primary CTA: View Upcoming Classes.
   - Secondary CTA: Request Group Training.

2. **Upcoming Classes**
   - Purpose: move users quickly into registration.
   - Content: 3-6 upcoming class cards with date, title, category, location, price, status, and status-aware CTA.

3. **Training Pathways**
   - Purpose: route users by training need.
   - Content: cards for Medical & Certification, Tactical Medicine, Defensive Firearms, Concealed Carry, and Group Training.

4. **Why Train With NorCal MedTac**
   - Purpose: communicate practical value and professionalism.
   - Content: practical curriculum, mobile instruction, medical and defensive expertise, calm instruction, safety-first environment.

5. **Credentials**
   - Purpose: establish legitimacy.
   - Content: AHA, ASHI, ITLS, EMT skills, instructor credentials, and relevant certification bodies.

6. **Group Training CTA**
   - Purpose: capture higher-value business, club, and organizational leads.
   - CTA: Request Group Training or Request a Custom Class.

7. **What To Expect**
   - Purpose: reduce uncertainty for first-time students.
   - Content: preparation, class environment, safety expectations, prerequisites, and registration clarity.

8. **Merch Preview**
   - Purpose: expose merchandise without distracting from training.
   - Content: featured products and Shop Merch CTA.

9. **Final CTA**
   - Purpose: close with decisive action.
   - CTAs: View Calendar and Contact Us.

Homepage rules:

- Do not make merch the dominant homepage action.
- Keep class discovery and group training as primary conversion paths.
- Trust and credibility should appear before the final CTA.
- Avoid generic fear-based preparedness copy.

---

## 11. Classes Experience

### 11.1 Class Listing Page

Page title:

- Upcoming Classes

Purpose:

The Classes page should help users quickly understand what is available, filter the schedule, and move into class detail or registration.

Layout:

- Page header with short intro copy
- Filter controls
- Featured next upcoming class area if useful
- Responsive class card grid/list
- Group training CTA band
- FAQ or policy link band

Desktop layout:

- Filters appear as a horizontal control bar above results.
- Class results appear in a responsive card grid or clean list/grid hybrid.

Mobile layout:

- Class cards stack vertically.
- Filters collapse cleanly.
- Date, title, location, status, and CTA must be visible without requiring expansion.

Filters:

- Category
- Date range
- Location
- Certification
- Skill level
- Availability

Sorting:

- Soonest
- Price
- Availability
- Category

Class card structure:

- Category label
- Class title
- Date and time
- Location
- Duration
- Price
- Seats/status
- Certification label if applicable
- Short summary
- Primary CTA: Register, Join Waitlist, Sold Out, or Registration Closed based on status
- Secondary CTA: View Details

Do not display product archive language such as:

- Default sorting
- Product
- Add to cart
- Shop
- Shop Classes

### 11.2 Class Detail Page

The class detail page must answer all practical questions before registration.

Required structure:

1. **Class Hero**
   - Class title
   - Category label
   - Short summary
   - Primary CTA based on class status
   - Secondary CTA: Ask a Question or Contact Us

2. **Class Snapshot**
   - Date
   - Time
   - Duration
   - Location
   - Price
   - Seats/status
   - Skill level
   - Certification

3. **Overview**
   - Full class description
   - Clear explanation of class outcome

4. **What You’ll Learn**
   - Learning outcomes as a scannable list

5. **Who This Class Is For**
   - Intended audiences

6. **Prerequisites**
   - Required experience, certifications, age requirements, or legal requirements

7. **What To Bring**
   - Gear, clothing, documentation, medical materials, firearm requirements, ammo requirements, or class-specific supplies

8. **Safety Requirements**
   - Safety expectations and range/classroom conduct where applicable

9. **Instructor**
   - Instructor name, role, short bio, credentials, and specialties

10. **Location**
   - Venue name, city, state, address or display-safe location, parking/arrival notes

11. **Policies**
   - Cancellation, transfer, refund, weather, waiver, and late arrival expectations

12. **Related Classes**
   - Relevant next-step or similar courses

Conversion elements:

- Primary CTA above the fold
- Sticky mobile registration bar where appropriate
- Date, price, status, and status-aware CTA visible near conversion points
- Disabled states visibly distinct for full and closed classes
- Waitlist classes clearly indicate waitlist behavior

---

## 12. Registration Experience

The registration experience should feel like submitting a class registration request, not checking out from a store.

The registration page should show:

- Class title
- Date
- Time
- Location
- Price
- Status
- Attendee count or seats requested
- Any relevant registration notes
- What happens after submission

Registration form should collect:

- First name
- Last name
- Email
- Phone
- Seats requested
- Notes or special considerations where applicable

Registration behavior:

- Open/limited classes allow normal registration request submission.
- Waitlist classes allow waitlist request submission.
- Full/closed classes do not allow normal registration.
- No payment is collected in the current phase.
- Confirmation language should not imply payment completion.

Registration success copy should communicate:

- The request was received.
- Staff will follow up or the registration will be reviewed as appropriate.
- No payment has been collected unless a future payment integration explicitly changes this.

Do not use:

- Cart
- Checkout
- Product
- Quantity
- Continue shopping
- Order confirmation

---

## 13. Calendar Experience

The Calendar page must prioritize usable class discovery over decorative calendar UI.

Default view:

- Chronological list on all screen sizes
- Desktop may include a compact monthly grid above or beside the list as a secondary navigation aid

Required behavior:

- Show upcoming classes in date order.
- Group classes by month when useful.
- Each class item must show date, time, title, category, location, price, status, and Register/View Details actions.
- Users must be able to filter without leaving the calendar page.
- Sold-out/full classes remain visible but clearly marked.
- Past classes are hidden by default.

Filters:

- Category
- Month
- Location
- Certification
- Availability

Calendar rules:

- The list view is the primary experience.
- A desktop grid is a supporting control and must not replace the list.
- Selecting a date in a grid should scroll or filter the list to matching classes if this behavior is implemented.
- Do not prioritize decorative calendar UI over practical class discovery.

---

## 14. Group Training Page

Purpose:

The Group Training page captures business, workplace, club, private group, and organizational training inquiries.

Content structure:

1. **Hero**
   - Position NorCal MedTac as a mobile/custom training provider.
   - CTA: Request Group Training.

2. **Use Cases**
   - Workplace CPR/first aid
   - Business emergency preparedness
   - Club or private group training
   - Security or armed professional training
   - Public safety or medical team refreshers

3. **Training Options**
   - Medical & certification training
   - Tactical medicine
   - Defensive skills
   - Custom emergency preparedness

4. **How It Works**
   - Submit inquiry
   - Define group needs
   - Schedule training
   - Train on-site or at an agreed location

5. **Credentials**
   - Relevant certifications and instructor qualifications

6. **Lead Capture Form**
   - Capture group training inquiry details.

Lead capture fields:

- Name
- Organization
- Email
- Phone
- Group size
- Training type
- Preferred date range
- Location
- Message

Current runtime behavior:

- Group training inquiries are submitted through the site.
- Submissions are stored in Supabase.
- The form may include basic spam controls.
- No email notification automation is currently assumed.
- No CRM integration is currently assumed.

Form CTA:

- Request Group Training

Copy rules:

- Do not say the form is “front-end only” or “not stored.”
- Do not overpromise immediate scheduling.
- Do not imply automated email confirmation unless implemented.
- Do communicate that the inquiry was received and that staff can follow up.

---

## 15. Contact Page

Purpose:

The Contact page should provide a clear path for questions before registration, general inquiries, and business communication.

Contact page should include:

- Direct contact framing
- Contact form
- Business or service area context
- Links to classes and group training
- Expectations for follow-up
- Optional FAQ/policy links

Contact form may collect:

- Name
- Email
- Phone
- Inquiry type
- Message

Current runtime behavior:

- Contact inquiries are submitted through the site.
- Submissions are stored in Supabase.
- The form may include basic spam controls.
- No email notification automation is currently assumed.
- No CRM integration is currently assumed.

Copy rules:

- Do not say the contact form is “front-end only” or “not stored.”
- Do not imply instant response.
- Do not imply email automation unless implemented.

---

## 16. Merch Experience

Merch is a separate shopping experience and must not be mixed with classes.

Merch page structure:

- Page title: Merch
- Short intro
- Product category filters
- Product grid
- Product cards
- Product detail or external shopping path where applicable
- Front-end cart placeholder only if implemented and appropriate

Product card structure:

- Product image
- Product title
- Category
- Price
- Inventory status
- CTA: Add to Cart, View Item, or external shopping CTA depending on implementation

Merch shopping flow may include:

1. User opens Merch.
2. User browses products.
3. User opens product detail or external shopping link.
4. User adds product to cart only if a merch cart exists.
5. User reviews cart/checkout only if implemented.

Current guardrails:

- Do not add a real merch checkout unless explicitly scoped.
- Do not mix merch checkout with class registration.
- Do not show merchandise upsells before class registration completion.
- Merchandise may be previewed on the homepage but must remain visually secondary to training.

---

## 17. Registration vs Ecommerce Rules

Classes use registration language.

Use these terms for classes:

- Register
- Reserve Seat
- Join Waitlist
- Training Registration
- Attendee Information
- Registration Summary
- Submit Registration
- Complete Registration
- Seats
- Class
- Class Confirmation

Do not use these terms for classes:

- Add to Cart
- Product
- Quantity
- Shop Classes
- Store
- Merchandise checkout
- Continue shopping
- Buy Now
- Checkout
- Order Confirmation

Merchandise uses ecommerce language.

Use these terms for merchandise:

- Shop
- Add to Cart
- Cart
- Product
- Quantity
- Shipping
- Checkout
- Order Confirmation

UX differences:

- Class registration must show class date, time, location, price, status, and attendee count/seats requested.
- Class confirmation must include what happens next and should reference what to bring, prerequisites, arrival details, or policies where appropriate.
- Merchandise checkout, if implemented later, must show products, quantities, shipping, and order totals.
- Class registration and merchandise checkout must remain separate even if future systems share underlying infrastructure.

---

## 18. Trust & Credibility Elements

Trust must appear throughout the site, not only on the About page.

Required trust elements:

- AHA, ASHI, ITLS, EMT, and relevant certification references where applicable
- Instructor bios with credentials
- Clear class prerequisites
- Clear “what to expect” content
- Safety-first language
- Consistent class photography or polished placeholders
- Testimonials or review snippets where available
- Plain-language cancellation and refund policies
- Waiver references where appropriate
- Contact information that is easy to find
- Group training credibility for businesses and organizations
- Class-specific confirmation details before registration completion

Do not use:

- Exaggerated tactical claims
- Fear-based messaging
- Vague authority language
- Overly aggressive or militarized copy
- Unverified credential claims

---

## 19. UX Rules & Constraints

Mobile-first requirements:

- All primary flows must work cleanly on mobile.
- Class cards must remain readable and actionable on small screens.
- Class detail pages should include persistent or repeated registration CTAs.
- Filters must collapse cleanly on mobile.
- No table-based layouts for key mobile content.

CTA hierarchy:

- Global header CTA: View Upcoming Classes
- Homepage primary CTA: View Upcoming Classes
- Homepage secondary CTA: Request Group Training
- Class listing primary CTA: Register or status-aware equivalent
- Class detail primary CTA: Register for This Class or status-aware equivalent
- Waitlist CTA: Join Waitlist
- Group training primary CTA: Request Group Training
- Merch primary CTA: Add to Cart or merch-specific equivalent

CTA consistency rules:

- “View Upcoming Classes” is the only global/header CTA.
- “Register” is used only for specific class instances.
- “Join Waitlist” is used only for waitlist class instances.
- “Request Group Training” is used only for group training lead flow.
- “Add to Cart” is used only for merchandise.

Navigation rules:

- Use only the approved primary navigation.
- Do not use duplicate sidebar navigation.
- Do not bury Calendar under Classes.
- Do not bury Group Training under Contact.
- Do not label class browsing as shopping.

Avoid:

- WooCommerce product archive feel
- Placeholder product images that look broken or unfinished
- Large uninterrupted gray backgrounds
- Cluttered sidebars
- Tiny type
- Low contrast text
- Bright mismatched category tiles
- Generic “default sorting” controls
- Aggressive military visuals
- Fear-based copy
- Overly dense long-form pages without section hierarchy

Component rules:

- Reuse shared components for cards, buttons, badges, forms, and layout.
- Do not create multiple inconsistent versions of the same UI element.
- Maintain a single source of truth for design patterns.
- Forms must use clear labels, accessible inputs, and clear submit states.
- Empty image states must look intentional, not broken.

---

## 20. Visual Style System

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

- Charcoal and graphite are used for header, footer, hero, and dark feature bands.
- Off white and warm gray are used for main content backgrounds.
- Field olive is used for category accents, secondary buttons, and subtle UI states.
- Medical red is used for primary CTAs and urgent status indicators.
- Muted gold is used sparingly for highlights and credential accents.
- Do not use bright lime, purple, saturated blue, or yellow category tiles.

Spacing philosophy:

- Use generous vertical spacing between sections.
- Use compact spacing inside metadata groups.
- Keep class information dense but readable.
- Use consistent section padding across breakpoints.
- Avoid floating card sections inside other cards.

Component style:

- Cards use subtle borders, clean backgrounds, and modest border radius.
- Buttons use clear filled or outlined styles with strong contrast.
- Class cards prioritize metadata hierarchy over imagery.
- Product cards prioritize image, name, price, and merch CTA.
- Forms use clear labels, accessible inputs, and strong submit buttons.
- Badges are used for category, certification, skill level, and status.
- Section backgrounds alternate between light neutral and dark feature bands where useful.

Imagery:

- Use authentic training imagery when available.
- Use consistent aspect ratios for cards and hero images.
- If using placeholders, use polished image treatments that look intentional.
- Do not use broken, default, or mismatched placeholder images.
- Avoid overly staged, extreme, or stock-like tactical imagery.

Image rules:

- Do not use empty image placeholders or broken image icons.
- If no image is available, use a styled placeholder block with a category label.
- All class cards must maintain consistent image or header aspect ratio.
- Avoid mixing black-and-white and color imagery randomly.
- Prefer no image over a bad or inconsistent image.

---

## 21. Current Guardrails and Non-Goals

The following should not be implemented unless explicitly requested and scoped as a dedicated milestone:

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

The following original prototype constraints have been superseded by current implementation:

- No CMS integration
- No backend registration logic
- No operational form storage
- No real seat/status persistence

Current implementation includes Sanity CMS and Supabase-backed operational submissions. Do not remove these systems unless explicitly requested.

Still-current implementation guardrails:

- Do not expose secrets.
- Do not commit `.env.local`.
- Do not place Supabase service role keys in client code.
- Do not remove fallback data.
- Do not casually bump Sanity package versions.
- Do not run `npm audit fix --force`.
- Do not remodel classes as products.
- Do not mix merch and class registration.
- Do not add payment language before payment exists.
- Do not imply email/CRM automation before it exists.

---

## 22. Current Known Runtime Behavior

Registration behavior:

- Open/limited class submissions are stored as registration requests.
- Waitlist submissions are stored distinctly as waitlist requests.
- Full/closed classes should not allow normal registration.
- No payment is collected in the current phase.

Inquiry behavior:

- Contact inquiries are submitted through the website.
- Group training inquiries are submitted through the website.
- Inquiry submissions are stored in Supabase.
- Inquiry workflows currently do not assume email notification automation.

CMS behavior:

- Sanity provides editable content.
- Local fallback data keeps the public site functional if CMS content is missing or unavailable.
- `/studio` is the editing interface and should remain isolated from public marketing chrome.

Known limitations:

- Registration seat enforcement still needs transaction-safe hardening before high-volume use.
- `/studio` production access policy should be decided before launch.
- Staff currently need an operational workflow for checking registrations, waitlists, and inquiries.
- Documentation must stay synced with runtime behavior.

---

## 23. AI / Codex Usage Rules

When an AI coding assistant works on this project, it should:

- Read `project-brief.md` for product, design, UX, and language rules.
- Read `AGENTS.md` for repo-specific agent behavior.
- Read `docs/ai/PROJECT_CONTEXT.md` for current architecture.
- Read `docs/ai/ROADMAP.md` for current milestone priorities.
- Read `docs/ai/ARCHITECTURE_DECISIONS.md` before changing architecture.
- Read `docs/ai/KNOWN_RISKS.md` before deployment or production hardening.
- Read `docs/ai/PROJECT_BRIEF_ALIGNMENT.md` when reviewing UI/copy changes.

AI assistants should prefer:

- Small scoped changes
- Minimal diffs
- Clear branch-specific handoffs
- Windows PowerShell commands
- `npm.cmd run build` for validation when code/config changes
- Documentation updates when behavior changes

AI assistants should avoid:

- Broad refactors without approval
- Adding new major features without explicit scope
- Secret exposure
- Class/product language drift
- Removing fallback behavior
- Updating dependencies casually
- Turning roadmap items into code without a specific task

---

## 24. Maintenance Rules for This Brief

Update this brief when:

- Product positioning changes
- Approved navigation changes
- Class-vs-merch language rules change
- Visual design direction changes
- Core content model changes
- New primary user flows are approved
- A previously deferred feature becomes part of the active product strategy

Do not use this brief for:

- Temporary branch state
- Build logs
- Deployment runbooks
- Detailed API implementation notes
- One-off bug reports
- Chat handoff summaries

Those belong in:

- `docs/ai/ROADMAP.md`
- `docs/ai/PROJECT_CONTEXT.md`
- `docs/ai/KNOWN_RISKS.md`
- `docs/ai/DEPLOYMENT_READINESS_CHECKLIST.md`
- `docs/ai/HANDOFF_TEMPLATE.md`
- README or dedicated operational docs