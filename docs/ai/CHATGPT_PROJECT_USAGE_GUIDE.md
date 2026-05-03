# ChatGPT Project Usage Guide — NorCalMedTac

## Goal

Use the ChatGPT Project folder as the persistent AI workspace for the NorCalMedTac website.

The Project should act like mission control:

- Shared project memory
- Reusable source files
- Focused task chats
- Consistent guardrails
- Reduced handoff bloat

---

## Recommended Project Sources

Inside the ChatGPT Project, keep these uploaded as persistent context:

```text
project-brief.md
AGENTS.md
/docs/ai/PROJECT_CONTEXT.md
/docs/ai/ARCHITECTURE_DECISIONS.md
/docs/ai/CODEX_PROMPT_OPTIMIZATION_GUIDE.md
/docs/ai/HANDOFF_TEMPLATE.md
/docs/ai/DEPLOYMENT_READINESS_CHECKLIST.md
/docs/ai/OPERATOR_CHECKLISTS.md
/docs/ai/KNOWN_RISKS.md
/docs/ai/PROJECT_BRIEF_ALIGNMENT.md
```

Also keep repo-side copies in:

```text
C:\Projects\norcalmedtac-redesign\docs\ai\
```

The repo version is the source of truth. Re-upload to ChatGPT Project when materially changed.

---

## Recommended Project Instructions

Use this as the Project instruction block:

```text
You are assisting with the NorCalMedTac website project.

Use project-brief.md, AGENTS.md, and uploaded project docs as source of truth. Preserve the architecture: Next.js App Router, TypeScript, Tailwind, Sanity CMS, Supabase server-side writes.

Use project-brief.md for product intent, class-vs-merch language, audience, navigation, UX priorities, and visual direction. Use current code and /docs/ai for implemented runtime architecture because the repo has evolved beyond the original front-end-only brief.

Classes are registrations, not ecommerce products. Keep merch separate from class registration.

Do not add Stripe, payments, app auth, email notifications, CAPTCHA/Turnstile, or admin dashboards unless explicitly requested.

Preserve fallback data. Do not expose secrets. Do not commit .env.local. Prefer small scoped changes, Windows PowerShell commands, and clear merge/deployment checklists.
```

---

## Chat Types to Use

### 1. Feature Implementation Chat

For scoped code changes.

Start with:

```text
Read project-brief.md, AGENTS.md, and the project docs.

Task:
[feature]

Scope:
[files/area]

Guardrails:
[paste guardrails if risky]
```

### 2. Debugging Chat

For logs/errors.

Start with:

```text
Read project-brief.md, AGENTS.md, and the project docs.

Issue:
[paste exact error/log]

What changed recently:
[short context]

Goal:
Find root cause and propose minimal fix.
```

### 3. Deployment Chat

For Vercel/Supabase/Sanity readiness.

Start with:

```text
Read project docs.

Task:
Run deployment readiness review for the current state.

Focus on:
- env vars
- Supabase readiness
- Sanity readiness
- route smoke tests
- risks/blockers
```

### 4. Handoff Chat

For long-session rollover.

Start with:

```text
Create a compact handoff for this NorCalMedTac chat.

Use format:
- Current branch/state
- Completed work
- Files changed
- Commands run
- Known issues
- Next exact steps
- Guardrails
```

### 5. Architecture Planning Chat

For bigger design decisions.

Start with:

```text
Read project-brief.md and project docs.

Plan only. Do not implement.

Decision needed:
[topic]

Compare options by:
- complexity
- safety
- maintainability
- fit with current architecture
- what to defer
```

---

## Best Practice: One Chat Per Workstream

Good workstream separation:

- Sanity/CMS editing
- Supabase/API backend
- Registration/waitlist flow
- Deployment readiness
- Documentation and handoffs
- Future admin workflow
- Future payment planning

Avoid mixing unrelated work in one long chat.

---

## When a Chat Gets Slow

Start a new chat when:

- The context window is getting high
- The app becomes sluggish
- The model starts forgetting constraints
- You are switching workstreams
- You reached a merge/deployment milestone

Before moving, ask for:

```text
Create a compact handoff for a new chat. Include current state, files changed, commands run, blockers, next steps, and guardrails.
```

Do not keep dragging a sluggish chat forward if the state is complicated.

---

## Project Files vs Chat Messages

Use project files for durable truth:

- architecture
- constraints
- product brief
- environment variable names
- deployment checklists
- current operating rules
- seed workflow notes

Use chat messages for temporary work:

- logs
- screenshots
- current error
- one-off branch state
- brainstorming

---

## Updating Project Docs

Update docs when:

- A major feature lands
- A data contract changes
- A guardrail changes
- Deployment process changes
- A risk becomes resolved
- A new limitation is discovered
- `project-brief.md` changes in a way that affects implementation

Do not update docs for every tiny UI tweak.

---

## Suggested Repo Docs Folder

```text
docs/
  ai/
    PROJECT_CONTEXT.md
    CODEX_PROMPT_OPTIMIZATION_GUIDE.md
    CHATGPT_PROJECT_USAGE_GUIDE.md
    HANDOFF_TEMPLATE.md
    DEPLOYMENT_READINESS_CHECKLIST.md
    ARCHITECTURE_DECISIONS.md
    OPERATOR_CHECKLISTS.md
    KNOWN_RISKS.md
    PROJECT_BRIEF_ALIGNMENT.md
```

---

## The Token-Saving Cheat Code

Instead of pasting a full report:

```text
Read project-brief.md, AGENTS.md, docs/ai/PROJECT_CONTEXT.md, and docs/ai/ARCHITECTURE_DECISIONS.md.

Current task:
[one paragraph]
```

That keeps the chat focused and prevents wasting tokens on repeated history.
