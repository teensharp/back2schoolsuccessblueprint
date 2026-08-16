# The Back-to-School Blueprint — A Fillable Book for BSSW 2026

A branded, four-day fillable workbook web app. Students sign in, complete pre-work before each live session, take guided notes during the sessions, do an end-of-day analysis, and build their personalized Blueprint section by section. At the end of the week they export "My Back-to-School Blueprint" as a polished PDF.

## The student experience

**Rhythm per day: Reflect before. Build during. Act after.**

Each day is one chapter with four parts:

1. **Pre-Work** — the asynchronous reflection from the framing document, plus the assigned Vault item for that day.
2. **Live Session Notes** — a guided notetaking page structured around that day's actual agenda, with a prompt block for each speaker, panel, and workshop (named speakers and times included, so the page follows along live).
3. **Blueprint Lab** — the section the student actually builds. Their pre-work and session notes appear inline as read-only context beside the fields, and key answers pre-fill so they are refining, not retyping.
4. **End-of-Day Analysis** — what shifted, what they committed to, and a short AI reflection written from their own answers.

**The four chapters**

| Day | Chapter | Blueprint Section Built |
|---|---|---|
| Mon Aug 17 | The Back-to-School Reset | Habits to build/break, derailers, support people, first-two-weeks commitments |
| Tue Aug 18 | The College Ready Roadmap | Course trajectory, rigor review, hardest-class plan, GPA protection, teacher connection plan, study/time strategies |
| Wed Aug 19 | The Leadership Playbook | Deepen/stop/start/transform, community cared about, leadership move, impact evidence, first action + deadline |
| Thu Aug 20 | The Opportunity Blueprint | 5+ committed opportunities, action calendar with dates, essay notes |

**Final Blueprint** — a "My Blueprint" page assembling all four sections into one roadmap, with a printable/PDF export.

## Interactivity and cost

- **Auto-carry (no runtime cost):** Blueprint Lab pages read the student's own earlier answers and pre-fill fields. Pure app logic.
- **AI day summary:** at end of day, one call per student per day writes a short personalized reflection and names their commitments back to them. Cached in the database so it generates once, with a small regeneration cap. At 100 students × 4 days this is a few credits for the whole week.

## Progress and saving

- Every field auto-saves as they type; a saved indicator confirms it.
- Progress bar per day and across the week; students can move freely between days.
- Days can be gated so a day unlocks on its date (staff can unlock early).

## Staff dashboard

Read-only. Roster with per-student completion across the four days, ability to open any student's book and read responses, and a completion export. Staff access is a separate role with server-enforced access rules — students can only ever see their own book.

## Design

Aligned to The Vault by TeenSHARP: heavy condensed uppercase display type for headings, deep forest green and the bright green accent, warm cream section backgrounds, generous white space, pill-shaped tags for dates and labels, and rounded green buttons with arrow affordances. The book reads as a premium printed workbook rendered on screen — wide margins, clear section rules, numbered chapters.

## Technical notes

- TanStack Start with routes per day and per section (`/day/1/pre-work`, `/day/1/session`, `/day/1/lab`, `/day/1/reflect`, `/blueprint`, `/admin`).
- Lovable Cloud for auth (email/password) and the database. Tables: `profiles`, `responses` (one row per student per question key, with a JSONB value for lists and repeatable rows), `day_progress`, `ai_summaries`, `user_roles`.
- Row-level security: students read/write only their own rows; staff role gets read-only access through a security-definer role check.
- Question content lives in a typed content file per day, so wording can be edited without touching layout.
- AI day summaries run server-side through the AI Gateway on a fast model, cached per student per day.
- PDF export renders the assembled blueprint client-side for print/save.

## Build order

1. Cloud setup: auth, schema, roles, policies.
2. Shell, design system, navigation, auto-save engine.
3. Day 1 complete (all four parts) as the pattern.
4. Days 2–4 content.
5. Final Blueprint page and PDF export.
6. AI end-of-day summaries.
7. Staff dashboard.
