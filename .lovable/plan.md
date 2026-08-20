# Embed the NSLI-Y worksheet + scrollable sidebar

## 1. Scrollable left sidebar

The desktop contents sidebar is currently a sticky block with no height cap, so on short screens the lower days get cut off with no way to scroll. Cap its height to the viewport and let it scroll on its own, keeping the page scroll independent.

## 2. Full NSLI-Y worksheet inside the workbook

Today Day 4's "3:05 PM Workshop: The Making of an Applier" only offers a PDF download plus six screenshots. Replace that with the complete worksheet rendered as workbook content, so students never leave the page. The PDF download stays at the top as a backup copy.

Structure, matching the worksheet exactly:

**Part 1 — Research the Opportunity (10 min)**
- Program snapshot text about NSLI-Y.
- Step 1: homepage → Eligibility (screenshot in place), then Q1 main eligibility requirements, Q2 eligible for Summer 2027?, Q3 NSLI-Y's main goals in your own words.
- Step 2: the Helpful Information grid (screenshot).
- Step 3: Participation Requirements (screenshot), then Q4 what skills NSLI-Y wants.
- Step 4: Dates & Deadlines (screenshot) with the note that the site still shows the Summer 2026 timeline; Q5 application due date, Q6 recommendation and guardian statement due, Q7 semifinalists notified.
- Step 5: Application Components (screenshot), then Q8 applicant information collected, Q9 the three written portions, Q10 documents to upload, Q11 recommender requirements.
- Step 6: Impact tab (screenshot), then Q12 two things that make NSLI-Y valuable to you, Q13 qualities NSLI-Y looks for and the evidence behind your answer.

**Part 2 — Plan Your Application Timeline (6 min)**
- The TeenSHARP time-estimate table (application step → recommended time) shown as reference content.
- "Which step did you underestimate most?" short answer.
- Recommender table: contact name + why this person is a strong contact + when you will ask permission.
- Backward-planning fields: official deadline, my personal deadline, feedback complete by, first draft complete by, recommender asked by, I will start on.
- The "Application Ninja Takeaway" callout.

**Part 3 — Writing Strong Essays**
- The host-family essay prompt.
- The strong essay example, then Q: why is this strong?
- The work-in-progress example, then Q: why is this still a work in progress? and Q: what advice would you give this student?

Every answer box saves automatically like the rest of the workbook, and the existing two closing reflection prompts (process mapped backward, the mistake I now see) stay at the end.

## Technical notes

- `src/components/workbook/BookShell.tsx`: add `max-h-[calc(100vh-7rem)] overflow-y-auto` to the desktop `<aside>` (drop `h-fit`).
- `src/lib/content/day4.ts`: rebuild the `workshop` part's `blocks` array with prose/subhead/note/image blocks plus new fields keyed `d4.s.nsliy.*` (new keys only — no existing keys renamed, so saved answers are preserved). Date-style planning fields use a `table` with `date` columns or short fields; the timing table uses a read-only prose/table representation.
- The essay examples are long literal text; they go in the content file as `prose` blocks so wording stays editable without touching components.
- No schema or backend changes: answers land in the existing `responses` store, and the new keys flow into the Day 4 carry/blueprint export automatically once added to the carry list.
