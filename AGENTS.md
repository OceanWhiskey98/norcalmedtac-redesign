<!-- BEGIN:nextjs-agent-rules -->

# AGENTS.md

## Project
This is the NorCal MedTac website redesign.

Use `project-brief.md` as the single source of truth.

## Commands
- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint` if available

## Core rules
- Classes are registrations, not products.
- Never use "Add to Cart" for classes.
- "Add to Cart" is only for merchandise.
- Never use "Shop Classes."
- Use mock/static data only unless explicitly asked otherwise.
- Do not add backend logic, real checkout, CMS, payments, accounts, or admin dashboards yet.

## Design rules
- Premium, professional, calm, tactical-medical aesthetic.
- Use the brief’s color system.
- Avoid aggressive military styling, grunge, bright category colors, and WooCommerce-style product archive language.
- Reuse shared components.
- Do not create duplicate button/card/badge styles unless refactoring the shared component.

## Review checklist
Before finishing any task:
- Run `npm run build`.
- Check class language vs merch language.
- Confirm links do not 404 when routes exist.
- Summarize changed files.
- Mention any unresolved issues.

<!-- END:nextjs-agent-rules -->
