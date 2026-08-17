# PDF export + a real staff back end

## Where things stand today

- The Blueprint page exports by calling the browser's print dialog with print styles, so a student gets a PDF only by choosing "Save as PDF" in that dialog. There is no download button that produces a file directly.
- The staff dashboard at `/admin` lists every student with a name, school, grade, an overall percentage, and a percentage per day/section. There is no way to open a student and read their actual answers, no CSV download, and no screen for granting staff access — staff roles exist in the database but can only be set by hand.

## 1. Student PDF of the plan

Add a "Download my Blueprint (PDF)" button that generates a real file, no print dialog:

- A branded multi-page document: cover with the student's name, school, grade and the week dates; then one section per day (Reset, College-Ready Roadmap, Leadership Playbook, Opportunity Blueprint); then the commitments and deadline calendar; closing page with the Vault invitation.
- Only answered items are printed, so a partly finished book still exports cleanly.
- Filename uses the student's name, e.g. `Back-to-School-Blueprint-Jordan-Smith.pdf`.
- The existing print styles stay as a fallback for anyone who prefers printing.

## 2. Staff back end

Keep `/admin` as the roster, and add:

**Registration view** — sign-up date column, plus counts at the top: total registered, started, and finished. Sortable by name, school, grade, progress, and last activity.

**Open any student** — click a row to read their whole book: every question with their answer, day by day, laid out like the workbook. Read-only. Includes their AI end-of-day reflections.

**Highlights** — per student, a short panel pulling the answers staff care about most: their strongest guiding behavior, biggest reset area, first-two-weeks commitments, hardest-class plan, leadership move, and committed opportunities with deadlines. This is the "at a glance" view for a coach before a check-in call.

**Cohort highlights** — on the roster page, aggregate counts: how many picked each guiding behavior as strongest, how many as their reset area, most common derailers, and the most-selected opportunities. Useful for shaping the live sessions mid-week.

**CSV export** — one row per student with profile, per-section completion, and the key highlight answers, for sharing outside the app.

**Staff access** — an admin-only screen to promote an existing account to staff by email, so you are not editing the database by hand. The first admin is set up during this build.

## Technical notes

- PDF generated client-side with `jspdf` so nothing runs server-side per student; text is laid out with the workbook fonts, page breaks handled per section.
- Student detail and highlights read through the existing staff `SELECT` policies (`is_staff(auth.uid())`) on `profiles`, `responses`, and `ai_summaries` — no schema change needed.
- Sign-up date comes from `profiles.created_at`; last activity from the newest `responses.updated_at` per student.
- Role promotion goes through an authenticated server function that verifies the caller is an admin before inserting into `user_roles`; the table stays closed to direct client writes.
