# Codex Prompt Optimization Guide — NorCalMedTac

## Purpose

This guide standardizes how to prompt Codex or ChatGPT when working in the NorCalMedTac repo.

Goal:

- Reduce token waste
- Avoid repeating the whole project history
- Prevent architecture drift
- Get small, safe, reviewable changes
- Preserve the project's core constraints

---

## Golden Rule

Every useful development prompt should include:

1. Current state
2. Specific task
3. Files or areas involved
4. Guardrails
5. Validation command
6. Expected response format

---

## Default Prompt Shape

```text
Context:
Use project-brief.md, AGENTS.md, /docs/ai/PROJECT_CONTEXT.md, and /docs/ai/ARCHITECTURE_DECISIONS.md as source of truth.

Current state:
[Briefly describe branch/status or recent change.]

Task:
[One specific change.]

Files likely involved:
[List paths.]

Guardrails:
[What must not change.]

Validation:
Run npm.cmd run build.

Output:
Report files changed, commands run, assumptions, and any risks.
```

---

## High-Quality Example

```text
Context:
Use project-brief.md for product/language rules and /docs/ai/PROJECT_CONTEXT.md for architecture.

Current state:
Waitlist requests are stored in public.registrations using registrationStatus = waitlist_requested.

Task:
Update README documentation so registration behavior matches runtime behavior.

Files likely involved:
- README.md

Guardrails:
- Do not change runtime code.
- Do not add Stripe, email, CAPTCHA, auth, or admin dashboard.
- Keep classes as registrations, not products.

Validation:
No build required unless code changes unexpectedly.

Output:
Summarize the exact README sections changed.
```

---

## Bad Prompt Patterns

Avoid:

```text
Make the site better.
```

```text
Fix everything.
```

```text
Add the next features.
```

```text
Read this giant handoff and do what seems best.
```

These prompts invite scope creep.

---

## Token-Saving Pattern

Do not paste the full handoff every time.

Use this:

```text
Read project-brief.md, AGENTS.md, and the project docs in /docs/ai.

Current task:
[task]
```

Then include only the relevant file snippets or errors.

---

## Brief-Conflict Pattern

Because the original brief says the build is front-end/mock-only, but the repo now has Sanity and Supabase, use this when needed:

```text
Use project-brief.md for product intent, language, visual style, and UX rules. Use current code and /docs/ai for implemented runtime architecture. Do not remove existing Sanity/Supabase functionality just because the original brief was mock-only.
```

---

## When to Use Full Handoffs

Use a full handoff only when:

- Starting a fresh chat outside the ChatGPT Project
- Moving work into a different tool
- A long session became slow or crashed
- The model clearly lost context
- A branch has a complicated in-progress state

Otherwise, update the repo docs and use compact prompts.

---

## Planning Prompt

Use before risky changes:

```text
Read project-brief.md and /docs/ai/PROJECT_CONTEXT.md.

Plan only. Do not edit files.

Task:
[task]

Constraints:
[guardrails]

Output:
- Proposed files to change
- Step-by-step implementation plan
- Risks
- Questions only if truly blocking
```

---

## Implementation Prompt

Use after planning:

```text
Implement the approved plan.

Scope:
[exact scope]

Do not:
- Add unrelated features
- Refactor unrelated files
- Change public UX beyond the task
- Add Stripe/auth/email/CAPTCHA/admin dashboard

Validation:
Run npm.cmd run build.

Output:
Files changed, commands run, and remaining risks.
```

---

## Review Prompt

Use after code changes:

```text
Review the current diff for:
- Alignment with project-brief.md
- Architecture violations
- Regression risk
- Secret exposure
- Class/product language violations
- Waitlist behavior mismatch
- Supabase/server-only safety

Do not edit files unless asked.
```

---

## Merge Prompt

Use before merging:

```text
Prepare this branch for merge.

Check:
- git status
- git diff --stat
- npm.cmd run build
- documentation drift
- guardrail violations

Output:
- merge readiness verdict
- exact commands to merge
- blockers, if any
```

---

## Deployment Review Prompt

Use before Vercel preview/production:

```text
Run deployment readiness review.

Check:
- env var matrix
- Next.js build assumptions
- Supabase table/constraint/index readiness
- Sanity config and seed workflow
- /studio access policy risk
- public route smoke test list
- risks/blockers
- alignment with project-brief.md

Output:
- ready / not ready
- blockers
- smoke test checklist
```

---

## Prompting Guardrail Block

Use this block frequently:

```text
Guardrails:
- Do not add Stripe or payments.
- Do not add user auth.
- Do not add email notifications.
- Do not add CAPTCHA/Turnstile.
- Do not build an admin dashboard.
- Do not remove fallback data.
- Do not expose or log secrets.
- Do not commit .env.local.
- Keep classes as registrations, not products.
- Keep merch separate from class registration.
- Prefer minimal, scoped changes.
```

---

## Windows Command Reminder

Use Windows PowerShell commands:

```powershell
npm.cmd run build
npm.cmd run dev
npx.cmd sanity dev
git status
git diff --stat
```

Avoid relying on bare `npm` if PowerShell execution policy blocks `npm.ps1`.

---

## How to Keep Codex From Overbuilding

Add this sentence when you want surgical work:

```text
Make the smallest safe change that satisfies the task. Do not improve unrelated code.
```

For cleanup work:

```text
Only touch files directly required for this cleanup.
```

For architecture work:

```text
Plan first; do not implement until the plan is approved.
```
