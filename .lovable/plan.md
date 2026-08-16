# The Back-to-School Blueprint — A Fillable Book for BSSW 2026

A branded, four-day fillable workbook web app. Students sign in, complete pre-work before each live session, take guided notes during the sessions, do an end-of-day analysis, and build their personalized Blueprint section by section. At the end of the week they export "My Back-to-School Blueprint" as a polished PDF.

## Front matter

The book opens like a real workbook, before any day content:

1. **Cover** — full-bleed branded cover: "MY BACK-TO-SCHOOL BLUEPRINT," the subtitle "A Personalized Roadmap to Excel Academically, Grow Intellectually, Lead Purposefully, and Pursue Elite Opportunities," TeenSHARP Bridge Week 2026, August 17–20, 2026, VIRTUAL pill tags. A single prominent field where the student writes their name (plus school and grade), saved to their profile and reused on every page header and the exported PDF.
2. **Table of Contents** — the full book laid out as numbered chapters with each part beneath it, showing completion state per part and linking straight to any page.
3. **Agenda** — the Bridge Week 2026 agenda rendered in the four-column day-by-day grid from the uploaded student version: all four days with times, session titles, speakers and facilitators, breaks, Blueprint Labs, and the Wednesday 6pm Parent Workshop. Includes the helpful links block (Zoom, Summer Learning Symposium slide, Padlet, Bridge Week Course, Spotify playlist) and the six guiding behaviors — Learner, Striver, Giver, Starter, Applier, Connector — with their definitions, since these anchor the whole pre-work.

## The student experience

**Rhythm per day: Reflect before. Build during. Act after.**

Each day is one chapter with four parts:

1. **Pre-Work** — the full asynchronous pre-session assignment, plus the assigned Vault item for that day.
2. **Live Session Notes** — a guided notetaking page structured around that day's actual agenda, with a prompt block for each speaker, panel, and workshop (named speakers and times included, so the page follows along live).
3. **Blueprint Lab** — the section the student actually builds. Their pre-work and session notes appear inline as read-only context beside the fields, and key answers pre-fill so they are refining, not retyping.
4. **End-of-Day Analysis** — what shifted, what they committed to, and a short AI reflection written from their own answers.

## Day 1 Pre-Work — built out in full

The Day 1 assignment is built exactly as written in the uploaded document, as a four-part guided flow:

**Part 1: My Back-to-School Reset Self-Audit** — six guiding-behavior sections (Striver, Learner, Applier, Connector, Giver, Starter). Each shows its definition, then its Agree/Disagree statements as a clean two-choice row per statement, followed by three reflection prompts: proudest to agree with and why, where I most need a reset and why, one change I need to make and why. A live tally per behavior shows how many they agreed with, which makes Part 2 easy to answer honestly.

**Part 2: My Behavior Pattern Reflection** — watch-the-video callout, then strongest guiding behavior (single select, suggested from their audit tallies but freely changeable) with the three evidence lines, how it helped last year, and how they'll use it this year. Then biggest reset area (single select) with a repeatable "What I Did Not Do Consistently / Why It Matters" table, plus the two consequence prompts.

**Part 3: What Helped Me, What Hurt Me, and What Got in the Way** — three blocks: what helped me succeed (checklist with Other + free-text), what got in my way (checklist with Other + free-text), and my warning signs (checklist with Other), ending in the three-column "Warning Sign / What I Usually Do / What I Need to Do Instead" table with three rows.

**Part 4: My Start / Stop / Strengthen Reset** — three tables of three rows each. Start: action, guiding behavior tags, why this matters. Stop: action, behavior affected, why it's holding me back. Strengthen: habit/skill/mindset, behavior supported, what stronger would look like. Each table has the document's example actions available as an expandable helper panel so students can choose or adapt rather than stare at a blank field.

This entire section feeds Monday's Blueprint Lab directly.


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

## Keeping the blueprint off the shelf

Included in this build:

- **The Vault touchpoints** — each day's pre-work links its assigned Vault item, and each completed Blueprint section ends with a topic-matched "Go deeper in The Vault" block. The final blueprint page closes with an invitation to keep the plan alive through The Vault and the upcoming asynchronous course.
- **Calendar export** — the final blueprint turns opportunity deadlines, first leadership action, and first-two-weeks commitments into calendar events: a downloadable calendar file plus one-click "Add to Google Calendar" links per item. No account connection needed, so it works with school Google accounts, Apple, and Outlook.

## Staff dashboard

Read-only. Roster with per-student completion across the four days, ability to open any student's book and read responses, and a completion export. Staff access is a separate role with server-enforced access rules — students can only ever see their own book.



## Design

Aligned to The Vault by TeenSHARP: heavy condensed uppercase display type for headings, deep forest green and the bright green accent, warm cream section backgrounds, generous white space, pill-shaped tags for dates and labels, and rounded green buttons with arrow affordances. The book reads as a premium printed workbook rendered on screen — wide margins, clear section rules, numbered chapters.

## Technical notes

- TanStack Start with routes for the front matter (`/`, `/contents`, `/agenda`) and per day and section (`/day/1/pre-work`, `/day/1/session`, `/day/1/lab`, `/day/1/reflect`, `/blueprint`, `/admin`).
- Lovable Cloud for auth (email/password) and the database. Tables: `profiles` (name, school, grade), `responses` (one row per student per question key, with a JSONB value for checklists and repeatable table rows), `day_progress`, `ai_summaries`, `user_roles`.
- Row-level security: students read/write only their own rows; staff role gets read-only access through a security-definer role check.
- Question content lives in a typed content file per day, so wording, checklist options, and example helper text can be edited without touching layout. Field types cover single-select, agree/disagree rows, multi-checklist with Other, short text, long reflection, and repeatable multi-column tables.
- AI day summaries run server-side through the AI Gateway on a fast model, cached per student per day.
- PDF export renders the cover, contents, and assembled blueprint client-side for print/save.

## Build order

1. Cloud setup: auth, schema, roles, policies.
2. Design system, book shell, navigation, auto-save engine.
3. Cover, Table of Contents, Agenda.
4. Day 1 Pre-Work in full, then Day 1 session notes, Blueprint Lab, and end-of-day analysis as the pattern.
5. Days 2–4 content.
6. Final Blueprint page and PDF export.
7. AI end-of-day summaries.
8. Staff dashboard.

## Content still needed

Days 2–4 pre-work documents. I'll draft those from the framing document so the book is complete, and swap in your final wording whenever you send it — content files make that a low-risk edit. Day 1 uses your exact text.

## Phase 2 — after the blueprint is complete

Captured now, decided later:

- **Daily Share-Out Challenge** — each day ends with a challenge to share one commitment with a named person (parent, counselor, teacher, peer). Student logs who they told; the app generates a branded commitment card from their own words that is easy to send or post. This is the accountability and word-of-mouth engine.
- **Parent-facing summary** — a shareable read-only view of the student's blueprint, which doubles as the natural moment to introduce the asynchronous course.
- **Week 1 and Week 4 check-ins** — scheduled return visits that ask what they actually did, keeping the plan active and pulling students back into the product.
- **Google Calendar OAuth sync** — two-way sync of weekly goals, if the simpler calendar export proves insufficient. Requires each student to connect their Google account, which school-managed accounts often restrict.


