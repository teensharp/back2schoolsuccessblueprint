# One Vault video per day, no repeats

Right now there are nine "Go deeper in The Vault" blocks but only four Vault videos, so several videos repeat (Camila appears 3 times, Dami 3 times, Rafael twice).

## The fix

Keep exactly one Vault block per day, each with a different video:

- Day 1 pre-work — Camila: How Camila Changed Her Mindset and Her High School Journey
- Day 2 pre-work — Aja: Choosing Challenge: Why Aja Leveled Up Her Curriculum
- Day 3 pre-work — Dami: How Dami Fell in Love with Math in College
- Day 4 pre-work — Rafael: How Rafael Navigated an Intense Senior Year of High School

Remove the five duplicate blocks (Day 1 lab, Day 2 lab habits, Day 3 second and third, Day 4 second). Each remaining block keeps its short framing line so the video still has a clear reason to be there.

## Technical detail

Delete the duplicate `kind: "vault"` blocks in `src/lib/content/day1.ts`, `day2.ts`, `day3.ts`, and `day4.ts`, leaving one per day. No changes to `src/lib/brand.ts` or the renderer.

## If you would rather keep more Vault touchpoints

Send additional Vault video links and I will place one unique video per spot instead of removing blocks.
