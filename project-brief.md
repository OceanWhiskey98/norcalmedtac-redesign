# NorCal MedTac Website Redesign Brief

## 1. Project Overview

NorCal MedTac is a Northern California training provider offering practical medical, defensive, firearms-related, workplace, and group training. The business serves individuals, businesses, clubs, armed professionals, public safety personnel, medical personnel, and organizations that need hands-on preparedness training.

The current website presents this training business through an outdated WordPress/WooCommerce interface. Classes are treated like store products, navigation is cluttered, class information is difficult to scan, and the visual system does not communicate the professionalism the business requires.

The redesign must rebuild the site as a premium training platform. Ecommerce is secondary. The core strategic shift is:

**NorCal MedTac is not a shop that sells classes. It is a professional training organization that accepts registrations.**

This shift controls the information architecture, page language, CTA labels, checkout concepts, visual hierarchy, and user flows.

This build is a front-end prototype/spec implementation. It must use static/mock data and front-end placeholder interactions only.

## 2. Business Model & User Types

NorCal MedTac has three primary business lines:

- Individual class registration
- Group, workplace, and custom training inquiries
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
- Start a front-end registration flow for a scheduled class
- Review what to bring, prerequisites, and class expectations
- Request private, group, or workplace training
- Browse merchandise separately from training registration
- Contact NorCal MedTac with questions before registering

## 3. Core Design Principles

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
- Use light neutral backgrounds for content-heavy areas so classes, dates, and registration details are easy to scan.
- Use olive and muted medical red as controlled accents.
- Avoid bright category colors, distressed effects, stencil typography, heavy grunge textures, and generic military styling.
- Use consistent training imagery. If final brand photography is unavailable, use polished placeholder imagery with consistent aspect ratios and clear replacement paths.

Typography intent:

- Headings must feel sturdy, modern, and authoritative.
- Body text must prioritize readability.
- Avoid novelty tactical fonts.
- Avoid excessive all-caps text.
- Use strong hierarchy with clear heading, subheading, metadata, and CTA levels.

UX priorities:

- Mobile-first layout and interaction patterns
- Fast path to upcoming classes
- Clear distinction between registration and shopping
- High trust before conversion
- Scannable class information
- Persistent conversion actions on class detail pages
- Minimal navigation clutter
- No duplicate sidebars

## 4. Site Architecture

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

Footer navigation:

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
- Use dropdowns only for class category shortcuts.
- On mobile, use a simple menu with the header CTA visible or accessible within the first menu screen.

## 5. Content Model (CRITICAL)

Use consistent structured data for all site content. Do not model classes as merchandise.

### Classes

A class record represents a scheduled training event, not a generic product.

Each class must include:

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
- `seatsAvailable`: available seats
- `status`: `open`, `limited`, `waitlist`, `soldOut`, or `closed`
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
- `registrationUrl`: front-end registration route or placeholder route
- `relatedClassIds`: related classes

Class status display rules:

- `open`: show “Open”
- `limited`: show “Limited Seats”
- `waitlist`: show “Waitlist”
- `soldOut`: show “Sold Out”
- `closed`: show “Registration Closed”

Class CTA rules:

- `open`: button label is “Register”
- `limited`: button label is “Register”
- `waitlist`: button label is “Join Waitlist”
- `soldOut`: disabled button label is “Sold Out”
- `closed`: disabled button label is “Registration Closed”

### Instructors

Each instructor must include:

- `id`: unique string
- `name`: full name
- `role`: instructor title
- `bio`: concise biography
- `credentials`: list of credentials
- `specialties`: list of training specialties
- `certificationBodies`: related organizations or certifications
- `image`: portrait URL or asset reference
- `featured`: boolean

### Categories

Class categories must include:

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

### Merchandise

Merchandise must include:

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
- `shoppingUrl`: front-end product route or placeholder route
- `featured`: boolean

Merchandise categories:

- Apparel
- Patches
- Gear
- Gift Certificates
- Accessories

## 6. Homepage Structure

1. **Hero**
   - Purpose: establish NorCal MedTac as a professional training organization.
   - Content: headline, short positioning statement, primary CTA, secondary CTA, trust line.
   - Primary CTA: View Upcoming Classes.
   - Secondary CTA: Request Group Training.

2. **Upcoming Classes**
   - Purpose: move users quickly into registration.
   - Content: 3-6 upcoming class cards with date, title, category, location, price, status, and Register CTA.

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
   - CTA: Request a Custom Class.

7. **What To Expect**
   - Purpose: reduce uncertainty for first-time students.
   - Content: preparation, class environment, safety expectations, prerequisites, and registration clarity.

8. **Merch Preview**
   - Purpose: expose merchandise without distracting from training.
   - Content: 3 featured products and Shop Merch CTA.

9. **Final CTA**
   - Purpose: close with decisive action.
   - CTAs: View Calendar and Contact Us.

## 7. Classes Experience

### 7.1 Class Listing Page

Page title:

- Upcoming Classes

Layout:

- Page header with short intro copy
- Filter controls
- Featured next upcoming class area
- Responsive class card grid/list
- Group training CTA band
- FAQ or policy link band

Desktop layout:

- Filters appear as a horizontal control bar above results.
- Class results appear in a responsive card grid.

Mobile layout:

- Class cards stack vertically.
- Filters collapse into a filter drawer.
- Date, title, location, status, and CTA must be visible in each card without requiring expansion.

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
- Certification label, if applicable
- Short summary
- Primary CTA: Register, Join Waitlist, Sold Out, or Registration Closed based on status
- Secondary CTA: View Details

Do not display product archive language such as “Default sorting,” “Product,” “Add to cart,” or “Shop.”

### 7.2 Class Detail Page

The class detail page must answer all practical questions before registration.

Required structure:

1. **Class Hero**
   - Class title
   - Category label
   - Short summary
   - Primary CTA based on class status
   - Secondary CTA: Ask a Question

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
- Sticky mobile registration bar with date, price, status, and status-aware CTA
- Registration CTA opens or links to a front-end placeholder registration screen
- Disabled states must be visibly distinct for sold-out and closed classes

## 8. Calendar Experience

The Calendar page must prioritize usable class discovery over decorative calendar UI.

Default view:

- Chronological list on all screen sizes
- Desktop includes a compact monthly grid above or beside the list as a secondary navigation aid

Required behavior:

- Show upcoming classes in date order.
- Group classes by month.
- Each class item must show date, time, title, category, location, price, status, and Register/View Details actions.
- Users must be able to filter without leaving the calendar page.

Filters:

- Category
- Month
- Location
- Certification
- Availability

Calendar rules:

- The list view is the primary experience.
- The desktop grid is a supporting control and must not replace the list.
- Sold-out classes remain visible but clearly marked.
- Past classes are hidden by default.
- Selecting a date in the grid scrolls or filters the list to matching classes.

## 9. Group Training Page

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

Form behavior:

- The form is front-end only.
- Submission shows a success state.
- No email, database, CRM, or backend integration is required.

Form CTA:

- Request Group Training

## 10. Merch Experience

Merch is a separate shopping experience and must not be mixed with classes.

Merch page structure:

- Page title: Merch
- Short intro
- Product category filters
- Product grid
- Product cards
- Front-end cart placeholder where applicable

Product card structure:

- Product image
- Product title
- Category
- Price
- Inventory status
- CTA: Add to Cart

Merch shopping flow:

1. User opens Merch.
2. User browses products.
3. User opens product detail or adds product to cart.
4. User reviews a front-end cart placeholder.
5. User sees a front-end checkout placeholder if implemented.

Merchandise may be previewed on the homepage but must remain visually secondary to training.

## 11. Registration vs Ecommerce Rules (VERY IMPORTANT)

Classes use registration language.

Use these terms for classes:

- Register
- Reserve Seat
- Training Registration
- Attendee Information
- Registration Summary
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

- Class registration is a front-end placeholder flow only.
- Merchandise checkout is a front-end placeholder flow only.
- Class registration must show class date, time, location, price, and attendee count throughout the flow.
- Merchandise checkout must show products, quantities, shipping, and order totals.
- Class confirmation must include what to bring, prerequisites, arrival details, and policies.
- Merchandise confirmation must include order and shipping information.
- Merchandise upsells must not appear before class registration completion.
- If class registration and merchandise share the same underlying mock state, the front-end language and UI must still present them as separate flows.

## 12. Trust & Credibility Elements

Trust must appear throughout the site, not only on the About page.

Required trust elements:

- AHA, ASHI, ITLS, EMT, and relevant certification references where applicable
- Instructor bios with credentials
- Clear class prerequisites
- Clear “what to expect” content
- Safety-first language
- Consistent class photography or polished placeholders
- Testimonials or review snippets
- Plain-language cancellation and refund policies
- Waiver references
- Secure registration/payment indicators only as visual placeholders
- Contact information that is easy to find
- Group training credibility for businesses and organizations
- Class-specific confirmation details before registration completion

Do not use exaggerated tactical claims, fear-based messaging, or vague authority language.

## 13. UX Rules & Constraints

Mobile-first requirements:

- All primary flows must work cleanly on mobile.
- Class cards must remain readable and actionable on small screens.
- Class detail pages must include a sticky mobile registration CTA.
- Filters must collapse cleanly on mobile.
- No table-based layouts for key mobile content.

CTA hierarchy:

- Global header CTA: View Upcoming Classes
- Homepage primary CTA: View Upcoming Classes
- Homepage secondary CTA: Request Group Training
- Class listing primary CTA: Register or status-aware equivalent
- Class detail primary CTA: Register for This Class or status-aware equivalent
- Group training primary CTA: Request Group Training
- Merch primary CTA: Add to Cart

CTA consistency rules:

- "View Upcoming Classes" is the only global/header CTA
- "Register" is used only for specific class instances
- "Request Group Training" is used only for group training lead flow
- "Add to Cart" is used only for merchandise

Do not mix or substitute these labels.
Do not introduce new CTA wording.

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

- Reuse shared components for cards, buttons, badges, and layout
- Do not create multiple inconsistent versions of the same UI element
- Maintain a single source of truth for design patterns
## 14. Visual Style System

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

- Cards use subtle borders, clean backgrounds, and 4-8px border radius.
- Buttons use clear filled or outlined styles with strong contrast.
- Class cards prioritize metadata hierarchy over imagery.
- Product cards prioritize image, name, price, and Add to Cart.
- Forms use clear labels, accessible inputs, and strong submit buttons.
- Badges are used for category, certification, skill level, and status.
- Section backgrounds alternate between light neutral and dark feature bands.

Imagery:

- Use authentic training imagery when available.
- Use consistent aspect ratios for cards and hero images.
- If using placeholders, use polished image treatments that look intentional.
- Do not use broken, default, or mismatched placeholder images.
- Avoid overly staged, extreme, or stock-like tactical imagery.

Image rules:

- Do not use empty image placeholders or broken image icons
- If no image is available, use a styled placeholder block with a category label
- All class cards must maintain consistent image or header aspect ratio
- Avoid mixing black-and-white and color imagery randomly
- Prefer no image over a bad or inconsistent image

## 15. Non-Goals (IMPORTANT)

This build is a front-end redesign specification only.

Do not implement:

- Backend registration logic
- Real payment processing
- Real checkout integration
- CMS integration
- WordPress/WooCommerce integration
- User accounts
- Admin dashboards
- Email confirmation automation
- Inventory management
- Real seat capacity enforcement
- Real map integration
- Deep SEO strategy
- Blog migration
- Analytics setup
- Legal policy drafting

Use static or mock data where needed. Build the front-end structure, content model, page hierarchy, visual system, and interaction patterns so backend, payment, and CMS functionality can be added later.
