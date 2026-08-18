# Day 2 pre-work cleanup + selected-tab readability

## 1. Selected tab text color (left sidebar)

In the sidebar/mobile nav, active links get a dark green background but the base ink text color competes with the active white text, so the selected item reads as dark-on-dark. Fix by removing the base text color from the active state path (apply the light text with priority on the active class) for both the top-level links and the day/section links.

## 2. Remove TeenSHARP-specific assessment statements (Day 2 Pre-Work, 4.0 Challenge)

Delete these two statements:
- Time Management: "I attend TeenSHARP group advising and rapid advising sessions regularly."
- Teacher Relations: "I contact TeenSHARP academic coaches or staff within 48 hours of receiving a grade below 85%."

Because each category is scored out of its number of statements, the top scoring band thresholds shift down by one so the top band stays reachable:
- Time Management: top band now at 3 of 3 (was 4 of 4).
- Teacher Relations: top band now at 3 of 4 (was 4 of 5).

## 3. Rephrase peer-help statement

"I have asked a TeenSHARP student who is strong in my weak subjects for help." becomes "I have asked a student who is strong in my weak subjects for help."

## 4. The Eleven Questions — textbook note

Replace the note that points to the TeenSHARP advisor and The Vault community with:

"If a teacher says there is no textbook and none to lend, ask for a recommended title, then share that title in Slack, upper classmen — someone may have a copy."

## Technical notes

- Content edits: `src/lib/content/day2.ts` (statements, band `min` values, note text).
- Nav styling: `src/components/workbook/BookShell.tsx` `NavContent`.
- No database or backend changes; existing saved answers keep their keys, only the statement wording/count within two categories changes.
