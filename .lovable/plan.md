# Clean up the pre-work completion box

Three changes to the "Before you build this section" box on Blueprint Lab pages.

## 1. No hyperlinks

The missing / needs-more-depth prompts become plain list items instead of links back to the pre-work page. The lists still show which prompts need work, just without click-through styling.

## 2. How "not deep enough" is judged (and how it improves)

Today it is a pure word count: an answer under 15 words is flagged as "needs more depth". That is crude — it treats a sharp 12-word answer the same as filler.

Proposed rule instead, still instant and offline (no AI call):
- Multiple-choice / select answers (like "Striver") are never depth-judged; they either exist or they don't.
- Written prompts (short and long answers) are flagged when the answer is under 25 words for a long-answer field or under 8 words for a short one.
- Table prompts are flagged when fewer than half the expected rows have content.

The box also gets a one-line explanation under the heading so a student knows why something was flagged: "Flagged answers are too short to show real thinking — go back and add evidence, examples, and specifics."

## 3. The `d1.pw.reset.table` label

That is an internal field key leaking into the list. It happens because the reset table in Day 1 pre-work has an empty label, so the box falls back to printing the raw key. Fix: give that field a real label ("What I did not do consistently, and why it matters") so it reads as a human prompt. The same fallback will be swept for any other blank-label field pulled into a carry box, so no raw keys can appear.

## Technical notes

- Changes are in the `carry` case of `src/components/workbook/PageRenderer.tsx` (drop anchors, new depth thresholds by field kind, explanatory line).
- Depth thresholds read the field kind from the existing `findField` lookup.
- Label fix is a content edit in `src/lib/content/day1.ts`; a check across day1-day4 content confirms any other empty-label carried fields get titles too.
