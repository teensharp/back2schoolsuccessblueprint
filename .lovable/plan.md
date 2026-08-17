# Turn the carry box into a pre-work completion check

Today the "From your pre-work" box on each Blueprint Lab page dumps whatever answers the student typed, which reads as a shallow summary (e.g. just "Striver") plus a long run-on list of unanswered prompts. It adds no value and undersells the work.

## New behavior

Replace the summary with a completion-and-accountability panel:

- **Title:** "Before you build this section"
- **Progress line:** "You have completed X of Y pre-work prompts for Day N" with a simple progress bar.
- **If anything is incomplete:** a short, high-expectation message telling the student the Lab is only as strong as the pre-work behind it, and that thin or skipped answers will produce a thin Blueprint. Below it, the missing prompts listed as a clean bulleted list (not a run-on sentence), each linking straight to the pre-work page so they can jump back and finish.
- **Thin-answer flag:** answers under roughly 15 words are counted as "needs more depth" and listed in a second short group, so a one-word "Striver" is called out rather than displayed as if it were finished.
- **If everything is complete and substantive:** a brief confirmation ("Your pre-work is complete — build from it, do not repeat it") and no dumped text.
- The student's actual answers no longer appear in this box. Answers still pre-fill the Lab fields themselves where that is already wired up (`prefillFrom`), so nothing is lost.

## Technical notes

- All changes are in the `carry` case of `src/components/workbook/PageRenderer.tsx`; the `carry` block type and the `from` key lists in `src/lib/content/day1-4.ts` stay as they are, so no content rewrites are needed.
- Completeness is computed from `ctx.responses` against the block's `from` keys, reusing the existing `findField` lookup for labels; table-type responses count as answered when at least one row has content.
- Each missing prompt links to the corresponding pre-work route for that day.
