<!-- BEGIN:nextjs-agent-rules -->

# AGENTS.md

## Project

This is the NorCal MedTac website redesign.

NorCal MedTac is a professional training organization that accepts class registrations. It is not a shop that sells classes.

The project has evolved beyond the original static prototype. The current implementation includes:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Sanity CMS
- Supabase-backed registrations
- Supabase-backed waitlist requests
- Supabase-backed contact inquiries
- Supabase-backed group training inquiries
- Local fallback data for CMS resilience

## Source of truth

Use these files in this order:

1. `project-brief.md`
   - Product intent
   - Audience
   - UX priorities
   - Navigation
   - Visual direction
   - Class-vs-merch language rules

2. `AGENTS.md`
   - Agent behavior and repo working rules

3. `docs/ai/PROJECT_CONTEXT.md`
   - Current implementation context and architecture summary

4. `docs/ai/ROADMAP.md`
   - Current milestone priorities

5. `docs/ai/ARCHITECTURE_DECISIONS.md`
   - Durable technical/product decisions

6. `docs/ai/KNOWN_RISKS.md`
   - Known risks and deferred items

7. Current code and branch state
   - Runtime truth for implementation details

Older handoffs are historical reference only.

If `project-brief.md` conflicts with current implementation docs, use the brief for product/design/language decisions and use current code plus `docs/ai` for runtime architecture.

Do not remove implemented Sanity or Supabase functionality just because the original brief once described a front-end-only prototype.

## Commands

Use Windows PowerShell-friendly commands when working locally:

- Install: `npm install`
- Dev: `npm.cmd run dev`
- Build: `npm.cmd run build`
- Lint: `npm.cmd run lint` if available
- Sanity dev: `npx.cmd sanity dev`

If running outside Windows PowerShell, equivalent `npm run ...` commands are acceptable.

## Core product rules

- Classes are registrations, not products.
- Never use `Add to Cart` for classes.
- `Add to Cart` is only for merchandise.
- Never use `Shop Classes`.
- Do not model classes as ecommerce products.
- Do not mix merchandise checkout with class registration.
- Keep class registration language separate from merch shopping language.
- Use `Register`, `Reserve Seat`, `Join Waitlist`, `Training Registration`, and `Attendee Information` for classes.
- Use `Shop`, `Product`, `Cart`, `Quantity`, `Checkout`, and `Add to Cart` only for merchandise.

## Current implementation rules

- Preserve Sanity CMS integration.
- Preserve Supabase-backed operational submissions.
- Preserve local fallback data.
- Keep Supabase service-role usage server-side only.
- Public forms should submit through server-side API routes, not directly to Supabase from client components.
- Waitlist requests should store `registrationStatus = waitlist_requested`.
- Open/limited class registrations should store `registrationStatus = pending`.
- Contact and group training inquiries should remain separate from class registrations.
- Do not claim forms are front-end-only or not stored.

## Guardrails

Do not add or implement unless explicitly requested and scoped as its own milestone:

- Stripe or payment processing
- Real checkout for classes
- App user authentication
- Admin dashboard
- Email notification automation
- CAPTCHA/Turnstile
- Inventory management
- Full merch checkout
- Blog migration
- Deep SEO strategy
- Analytics setup
- WordPress/WooCommerce integration

Do not:

- Expose secrets
- Commit `.env.local`
- Put service-role keys in client code
- Remove fallback data
- Casually bump Sanity package versions
- Run `npm audit fix --force`
- Broadly refactor unrelated files
- Rewrite working systems without a specific task

## Design rules

- Premium, professional, calm, tactical-medical aesthetic.
- Use the brief’s color system.
- Favor practical clarity over decorative effects.
- Avoid aggressive military styling, grunge, stencil typography, bright category colors, and WooCommerce-style product archive language.
- Keep content mobile-first and scannable.
- Reuse shared components.
- Do not create duplicate button/card/badge/form styles unless refactoring the shared component intentionally.
- Empty image states must look intentional, not broken.

## Development workflow

Before starting work:

- Check branch and working tree.
- Understand the current task scope.
- Read only the docs needed for the task.
- Prefer small, reviewable diffs.

Recommended start commands:

```powershell
cd C:\Projects\norcalmedtac-redesign
git status
git branch --show-current
git log --oneline -5
```

For risky or architectural changes:

- Plan first.
- Do not implement until the plan is accepted.
- Check `docs/ai/ARCHITECTURE_DECISIONS.md` and `docs/ai/KNOWN_RISKS.md`.

For documentation-only changes:

- Build is not required unless code/config/package files changed.
- Still review `git diff --stat` and `git diff`.

For code/config/package changes:

- Run `npm.cmd run build`.

## Review checklist

Before finishing any task:

- Confirm changed files are limited to the task.
- Confirm no secrets were added.
- Confirm `.env.local` was not committed.
- Confirm class language vs merch language.
- Confirm fallback behavior was not removed.
- Confirm Sanity/Supabase runtime assumptions were not broken.
- Confirm links do not 404 when routes exist.
- Run `npm.cmd run build` if code/config/package files changed.
- Summarize changed files.
- Summarize commands run.
- Mention unresolved issues or risks.

## Current roadmap priority

The current roadmap priority is Deployment Stabilization and Documentation Sync unless the user says otherwise.

Focus areas:

- README/docs accuracy
- Deployment readiness
- Environment variable checklist
- Supabase verification checklist
- Sanity verification checklist
- Route/form smoke testing
- Studio access policy risk
- Documentation drift prevention

Do not jump ahead to payments, auth, email, CAPTCHA, or admin dashboard work without explicit instruction.

<!-- END:nextjs-agent-rules -->
