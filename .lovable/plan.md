# Day 2 assessment + a rigor pass on every prompt

Two changes: add the 4.0 Challenge Self-Evaluation to Tuesday's pre-work, and raise the bar of the writing prompts across the whole book.

## Part A — Raise the rigor of every prompt

The book currently asks for "the biggest thing that shifted" and "the one thing I am committing to." That language sets a low bar and invites a one-line answer. It is replaced throughout.

**Banned language:** "shifted," "the one thing," "the biggest thing," "briefly," and any prompt that caps a student at a single item.

**End-of-day analysis, rewritten on all four days** — the section is retitled "Insights and Takeaways" and asks for:
- Three insights I gained today, and what each one changes about how I operate.
- My takeaways: what I now understand that I did not understand this morning, and where I was wrong about myself.
- Where I was uncomfortable today, and what that discomfort is telling me.
- Commitments I am implementing before tomorrow — a multi-row table: commitment, when exactly, how I will know I did it.
- Evidence check: what I actually did with yesterday's commitments.

**Session notes, all four days** — every speaker and workshop block asks for three levels rather than one open box: what was said that matters, what it means for my situation specifically, and what I will do about it. Prompts name a minimum ("at least three," "at least two") so the expectation is explicit.

**Everywhere else** — multi-row tables replace single-line fields wherever the answer is naturally a list (leadership actions, study strategies, teacher plans, opportunity commitments). Placeholder text models the depth expected, and short-answer boxes for reflective questions become full text areas.

**Framing** — the cover and Day 1 opening state the standard plainly: this blueprint is built for a student who is coachable, capacious, and implements immediately, and thin answers make it useless.

The AI end-of-day coach is retuned to match: it names where an answer lacks specificity and pushes for the missing detail rather than praising effort.

## Part B — 4.0 Challenge Self-Evaluation as Day 2 Part 1

A date field, the instruction "Only answer yes if the statement applies to all subjects you are currently taking," then the six categories exactly as written, each a Yes/No row per statement:

Learning Tools (2), Study Habits (3), Time Management (4), Organization (4), Teacher Relations (5), Learning Supports (3).

Each category shows a live "yes" count as they answer, plus a total 4.0 Challenge score with a band label. Note: the source numbers Learning Supports 3-5 with no 1-2; those three are kept as written and renumbered 1-3.

**Takeaways** — the document's three prompts, deepened per Part A: what I learned from filling this out, whether I have the whatever-it-takes mindset and the evidence for that answer, and the changes I am implementing in my academic routine (multi-row: change, category it fixes, start date).

**Building on it:**
- The two lowest-scoring categories are surfaced automatically, with prompts on why each is weakest and what it is costing them in grades.
- Every statement answered No becomes a row in a fix table: what I will do instead, when, starting date.

**Into Tuesday's Blueprint Lab:** the score and weakest categories carry in as read-only context, the Study and Time Strategy table pre-fills from the No-list fixes, and a new "My 4.0 Habits" block captures three habits with day and time. The score and weakest categories also appear on the final Blueprint and in the export.

## Part C — Teacher Partnership Conversation (Day 2 Pre-Work)

The "10 Questions to Ask Your Teachers" resource becomes a working part of Day 2 pre-work, not a handout. It replaces nothing; it extends Part 4, My Teacher Relationships.

**The resource, on the page** — the questions rendered in the document's three groupings:

- Know your teacher: educational background; why they enjoy teaching; expectations of students; what their top student is like.
- Understand the expectations: how much to study each day; types of assessments and how to prepare; examples of A-level work.
- Agree on the feedback loop: best way to reach them; regular feedback on performance and assignments; a standing check-in time.

**New question 11 — the textbook question**, with scripted language the student can read aloud:

> "Will we use a textbook in this class?"
>
> If no: "Having a textbook is a critical condition for my success in this subject. It lets me read ahead, review after class, and study from something other than my notes. Is there a text in your classroom library you could lend me for the year? If not, what text would you recommend I get on my own?"

Three outcomes are captured per teacher: textbook provided by the school, borrowed from the teacher, or a recommended title the student needs to source. Any title the student has to source themselves becomes a row in their action list.

**Schedule the conversations** — the instruction is explicit: review the questions, then book a meeting with every current teacher during Back-to-School Week and hold the conversation.

A meeting table, one row per teacher, with add-row: teacher, subject, date and time booked, how I asked (in person / email / office hours), status (requested / confirmed / held).

**Capture what they said** — a per-conversation log, add-row so it covers every teacher: teacher, expectations they named, how they want to be reached, check-in cadence agreed, textbook answer, what I am changing because of this conversation.

**Debrief prompts, at the Part A rigor bar:**
- Three things I learned about how my teachers actually operate, and what each changes about how I work in their class.
- The teacher this conversation went worst with, and my plan to keep showing up anyway.
- Textbooks I still need to get my hands on, and how I am getting each one.

**Carries forward:** confirmed check-in times feed the Blueprint Lab teacher connection plan and the calendar export; outstanding textbooks appear on the final Blueprint as open action items.

## Technical notes

- All wording lives in `src/lib/content/day1.ts` through `day4.ts`; no component logic changes beyond the new score computation.
- Yes/No rows reuse the existing `agree` field kind with Yes/No labels, keyed `d2.pw.eval.*`.
- Scores and weakest categories are derived client-side from the response map — no schema change.
- Reflection prompts that change from a single field to a table get new keys; old keys are left in place so nothing already saved is lost.
- The teacher conversation lives in Day 2 pre-work under keys `d2.pw.teacherchat.*`; the question list is static prose plus a checklist so students can tick questions as they ask them.
- Meeting rows with a confirmed date and time are picked up by the existing `.ics` export alongside opportunity deadlines.

