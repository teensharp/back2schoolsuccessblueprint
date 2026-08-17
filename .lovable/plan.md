# Use the real Vault video titles

Right now the "Go deeper in The Vault" boxes invent titles ("Building Habits That Stick", "What Admission Officers Actually Read", "The Reset Playbook", "study systems series"). Only four real Vault videos are linked, and their actual titles are:

1. How Camila Changed Her Mindset and Her High School Journey (Student Story)
2. Choosing Challenge: Why Aja Leveled Up Her Curriculum (Academics)
3. How Rafael Navigated an Intense Senior Year of High School (Student Story)
4. How Dami Fell in Love with Math in College (Student Story)

## What changes

- Rename the video keys in the brand file to match the real videos (camila, aja, rafael, dami) instead of made-up topics (habits, reset, admissions, studySystems, etc.).
- Rewrite every Vault box so it names the actual video title and a one-line, accurate reason to watch it — no invented series names, playbooks, or libraries.
- Match each of the nine placements to whichever of the four videos fits best:
  - Day 1 pre-work and lab: Camila (mindset reset)
  - Day 2 pre-work and lab: Aja (leveling up curriculum) and Dami (learning/mastery)
  - Day 3: Camila and Aja, framed around ownership and rigor
  - Day 4: Rafael (managing an intense senior year and applications)
- Keep the box heading as "Go deeper in The Vault" and show the real video title as the link/CTA text so students know what they are opening.

## Technical notes

- `src/lib/brand.ts`: replace the `VAULT_VIDEOS` map with entries keyed by the real videos, each holding `{ title, href }`.
- `src/lib/content/day1.ts` – `day4.ts`: update each `kind: "vault"` block's `text` and `cta` to use `VAULT_VIDEOS.<key>.title`, and `href` to `.href`.
- No renderer changes needed beyond passing the title through as the CTA label.
