# NorCalMedTac Handoff Template

Use this at the end of a long ChatGPT/Codex session or before starting a new chat.

---

# NorCalMedTac Website — Handoff

## 1. Current Snapshot

- Date:
- Repo path: `C:\Projects\norcalmedtac-redesign`
- Current branch:
- Git status:
- Current objective:
- Last successful validation command:

---

## 2. Source-of-Truth Files

Use these first:

- `project-brief.md`
- `AGENTS.md`
- `/docs/ai/PROJECT_CONTEXT.md`
- `/docs/ai/ARCHITECTURE_DECISIONS.md`

Note:
Use `project-brief.md` for product/design/language rules. Use current code and `/docs/ai` for implemented runtime architecture because the project has evolved beyond the original front-end-only brief.

---

## 3. Completed This Session

- [Item]
- [Item]
- [Item]

---

## 4. Files Changed

```text
[path]
[path]
[path]
```

---

## 5. Commands Run

```powershell
[command]
[command]
```

Results:

- Build:
- Tests:
- Git:

---

## 6. Current Behavior

Describe what now works.

Example:

- Open/limited class registrations store `registrationStatus = pending`
- Waitlist requests store `registrationStatus = waitlist_requested`
- Contact inquiries insert into `public.contact_inquiries`
- Group training inquiries insert into `public.group_training_inquiries`

---

## 7. Known Issues / Risks

- [Issue]
- [Issue]
- [Issue]

---

## 8. Next Exact Steps

1. [Step]
2. [Step]
3. [Step]

Include commands when possible:

```powershell
git status
npm.cmd run build
```

---

## 9. Guardrails

- Do not add Stripe or payments.
- Do not add auth.
- Do not add email notifications.
- Do not add CAPTCHA/Turnstile.
- Do not build an admin dashboard.
- Do not remove fallback data.
- Do not expose secrets.
- Do not commit `.env.local`.
- Keep classes as registrations, not products.
- Keep merch separate from class registration.

---

## 10. Suggested Next Prompt

```text
I’m continuing NorCalMedTac from this handoff.

Use project-brief.md, AGENTS.md, and /docs/ai as source of truth.

Current task:
[task]

Guardrails:
[guardrails]

Validation:
Run npm.cmd run build and report files changed, commands run, assumptions, and risks.
```
