# NorCalMedTac Operator Checklists

These are command-oriented checklists for common project operations.

---

## 1. Start-of-Session Checklist

```powershell
cd C:\Projects\norcalmedtac-redesign
git status
git branch --show-current
git log --oneline -5
```

Confirm:

- [ ] Correct branch
- [ ] Working tree state understood
- [ ] Current task is scoped
- [ ] Relevant docs read:
  - [ ] `project-brief.md`
  - [ ] `AGENTS.md`
  - [ ] `/docs/ai/PROJECT_CONTEXT.md`

---

## 2. Pre-Implementation Checklist

- [ ] Task is one clear change
- [ ] Files likely involved are known
- [ ] Guardrails included
- [ ] No secrets in prompt/logs
- [ ] Validation command known

Use this prompt shape:

```text
Plan only. Do not edit files.
Task:
[task]
Guardrails:
[guardrails]
```

---

## 3. Build Validation Checklist

```powershell
npm.cmd run build
```

Check:

- [ ] Build passes
- [ ] Warning output reviewed
- [ ] No new blocking warnings
- [ ] Known `--localstorage-file` warning remains non-blocking only

---

## 4. Git Commit Checklist

```powershell
git status
git diff --stat
git diff
```

Check:

- [ ] Only intended files changed
- [ ] No `.env.local`
- [ ] No secrets
- [ ] No unrelated refactor
- [ ] Docs updated if behavior changed
- [ ] Product language still aligns with `project-brief.md`

Commit:

```powershell
git add [files]
git commit -m "[message]"
```

---

## 5. Merge-to-Main Checklist

```powershell
git checkout main
git pull origin main
git merge --no-ff [branch-name]
npm.cmd run build
git push origin main
git status
```

If Git opens Vim:

```text
Esc
:wq
Enter
```

---

## 6. Restore Sanity Seeding Workflow Checklist

Use only if seed workflow is missing from main.

Known seed commit:

```text
9334a22 Add Sanity fallback content seeding
```

Do not cherry-pick the whole commit if it conflicts with newer status/schema work.

Restore only:

```powershell
git checkout 9334a22 -- scripts/seed-sanity-fallback.mjs SANITY_SEEDING.md
git checkout 9334a22 -- package.json .env.example
npm.cmd run build
git status
git diff --stat
```

Then commit:

```powershell
git add scripts/seed-sanity-fallback.mjs SANITY_SEEDING.md package.json .env.example
git commit -m "Restore Sanity seeding workflow"
```

---

## 7. Sanity Seeding Checklist

PowerShell env var example:

```powershell
$env:NEXT_PUBLIC_SANITY_PROJECT_ID="g3igmils"
$env:NEXT_PUBLIC_SANITY_DATASET="production"
$env:NEXT_PUBLIC_SANITY_API_VERSION="2025-01-01"
$env:SANITY_API_WRITE_TOKEN="paste_token_here"
```

Dry run:

```powershell
npm.cmd run sanity:seed:fallback:dry
```

Real write:

```powershell
npm.cmd run sanity:seed:fallback -- --yes
```

After seeding:

- [ ] Verify classes in Studio
- [ ] Verify instructors in Studio
- [ ] Revoke temporary write token if exposed or no longer needed

---

## 8. Inquiry Backend QA Checklist

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

Check:

- [ ] Contact form submits
- [ ] Group training form submits
- [ ] Success message appears
- [ ] Reference ID displayed
- [ ] Row inserted in Supabase
- [ ] `status = new`
- [ ] `source = website`
- [ ] `ipHash` stored
- [ ] Raw IP not stored
- [ ] Too-fast/honeypot spam returns appropriate failure
- [ ] Copy does not claim forms are prototype-only

---

## 9. Registration/Waitlist QA Checklist

Check one class for each status:

- [ ] open
- [ ] limited
- [ ] waitlist
- [ ] full
- [ ] closed

Expected:

- [ ] Open/limited can submit registration
- [ ] Open/limited row stores `pending`
- [ ] Waitlist can submit request
- [ ] Waitlist row stores `waitlist_requested`
- [ ] Waitlist does not show remaining-seat count
- [ ] Full/closed block normal registration
- [ ] No class ecommerce language appears

---

## 10. Project Brief Alignment Review

```text
Review the current diff against project-brief.md.
Focus on:
- class registration language
- merch/class separation
- navigation labels
- CTA consistency
- mobile-first UX
- visual direction
- non-goals/guardrails adjusted for current backend/CMS reality
```

---

## 11. New Chat Starter Checklist

Before starting a new AI chat:

- [ ] Ask current chat for compact handoff
- [ ] Save/update relevant `/docs/ai` files if needed
- [ ] Start new chat with current task only

Starter:

```text
Read project-brief.md, AGENTS.md, and /docs/ai.

Current task:
[task]

Guardrails:
[paste if risky]
```
