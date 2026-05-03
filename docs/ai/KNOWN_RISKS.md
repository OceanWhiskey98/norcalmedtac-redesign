# NorCalMedTac Known Risks and Watchlist

## 1. Registration Seat Concurrency

Risk:
Current registration seat enforcement uses a check-then-insert pattern. Near-simultaneous submissions may oversubscribe a class.

Impact:
Medium now, high if traffic increases or payments are introduced.

Mitigation options:
- Supabase RPC for atomic registration insert
- Postgres transaction with locking
- Class capacity ledger/table
- Reservation hold model
- Queue/manual approval workflow

Status:
Known limitation. Not yet fixed.

---

## 2. Studio Access Policy

Risk:
`/studio` is publicly reachable, though protected by Sanity auth.

Impact:
Low to medium depending on production posture.

Mitigation options:
- Accept Sanity auth
- Gate route through middleware or hosting rule
- Deploy Studio separately
- Add Vercel/platform-level protection

Status:
Decision needed before production launch.

---

## 3. Documentation Drift

Risk:
Docs, README, and handoffs may lag behind code. Older handoffs may describe outdated branch state or behavior.

Examples:
- README saying all registrations store `pending`, while waitlist now stores `waitlist_requested`
- Old handoffs saying contact/group forms are front-end-only after backend implementation
- Original project brief saying backend/CMS are non-goals, while current repo has Sanity/Supabase implemented

Mitigation:
- Treat current code and repo docs as authoritative for runtime
- Treat `project-brief.md` as authoritative for product/design/language
- Update README when runtime behavior changes
- Keep `/docs/ai/PROJECT_CONTEXT.md` current

Status:
Ongoing watch item.

---

## 4. Secret Exposure

Risk:
Sanity write token was previously shown in screenshots during project work.

Impact:
High if still active.

Mitigation:
- Revoke exposed token
- Create temporary write token only when seeding
- Never paste secrets into chat
- Never commit `.env.local`

Status:
Verify token revocation.

---

## 5. Sanity Version Sensitivity

Risk:
Prior Sanity package/version/auth behavior caused issues.

Impact:
Medium.

Mitigation:
- Do not casually bump Sanity versions
- Avoid `npm audit fix --force`
- Validate `/studio` after dependency changes

Status:
Watch item.

---

## 6. Env Fallback Defaults Mask Misconfiguration

Risk:
Sanity config/CLI fallback defaults can make missing env vars less obvious.

Impact:
Medium in deployment review.

Mitigation:
- Explicitly set env vars in Vercel
- Document expected production values
- Consider stricter validation later

Status:
Known deployment review item.

---

## 7. Inquiry Spam Controls Are Lightweight

Risk:
Current inquiry spam controls are basic: honeypot, elapsed-time, hashed IP rate check.

Impact:
Low to medium initially.

Mitigation:
- Add Turnstile/CAPTCHA later if spam appears
- Keep no-CAPTCHA guardrail unless explicitly requested
- Add email/admin workflow separately

Status:
Accept for current phase.

---

## 8. No Notification Workflow Yet

Risk:
Inquiries and registrations land in Supabase but do not notify staff by email/SMS.

Impact:
Operational risk if staff forget to check Supabase.

Mitigation:
- Short-term: document Supabase table viewing workflow
- Later: add email notifications or dashboard as separate milestone

Status:
Known future milestone.

---

## 9. No Admin Dashboard

Risk:
Business workflow currently depends on Supabase Table Editor for registrations/inquiries.

Impact:
Acceptable for beta, awkward for production operations.

Mitigation:
- Define admin workflow later
- Build dashboard only after deployment baseline is stable

Status:
Deferred intentionally.
