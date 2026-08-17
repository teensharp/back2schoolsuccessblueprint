# Add the 4.0 Challenge Self-Evaluation to Day 2 pre-work

The uploaded self-evaluation becomes the opening part of Tuesday's pre-work, and its results feed the rest of Day 2 and the College-Ready Roadmap lab.

## New Part 1: My 4.0 Challenge Self-Evaluation

A date field, the instruction "Only answer yes if the statement applies to all subjects you are currently taking," then the seven categories exactly as written, each as a Yes/No row per statement:

1. **Learning Tools** (2 statements)
2. **Study Habits** (3)
3. **Time Management** (4)
4. **Organization** (4)
5. **Teacher Relations** (5)
6. **Learning Supports** (3)

Each category shows a live "yes" score as the student answers (e.g. 3 of 4), plus a total 4.0 Challenge score at the bottom with a short band label — solid foundation / mixed / needs a rebuild — so the number means something.

**Takeaways** (the document's three prompts, as written):
- What have you learned from filling out this sheet?
- Do you believe you have the whatever-it-takes mindset based on your answers?
- What changes do you need to implement in your academic routine?

Note: the source document numbers Learning Supports 3-5 with no 1-2. Those three statements are kept as-is and simply renumbered 1-3.

## Building on it

- **My weakest categories** — the two lowest-scoring categories are surfaced automatically, with a prompt on why each is weakest and what it is costing them in grades.
- **My "No" list into fixes** — a table pre-populated with the statements they answered No to: what I will do instead, when, and starting date. This is the actionable bridge the paper sheet does not have.
- The existing Day 2 pre-work parts (Course Trajectory, Grades, How I Learn, Teacher Relationships) stay, renumbered after this one. Overlapping questions in "How I Actually Learn" and "My Teacher Relationships" are trimmed so students are not answering the same thing twice.

## Feeding the Blueprint Lab

Tuesday's Blueprint Lab gains:
- The 4.0 score and weakest categories carried in as read-only context.
- The Study and Time Strategy table pre-filled from their "No" list fixes.
- A new "My 4.0 Habits" commitment block: three habits from the evaluation they will run for the first two weeks, each with a day/time.

The score and weakest categories also appear on the final Blueprint page and in the exported plan.

## Technical notes

- Content added to `src/lib/content/day2.ts` using the existing field kinds; Yes/No rows use the existing `agree` field kind with Yes/No labels, keyed `d2.pw.eval.*`.
- Scores are computed in the renderer from saved answers — no new storage, no schema change.
- New keys only (nothing renamed), so answers already saved on Day 2 are preserved.
- Weakest-category and No-list logic is pure client-side derivation from the response map, reusing the existing carry/prefill mechanism.
