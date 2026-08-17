import { VAULT_VIDEOS } from "@/lib/brand";
import { PROGRAM_CATALOG } from "./programs";
import { f, type Block, type Day } from "./types";

/** The catalog, rendered as reference blocks inside the Day 4 lab. */
const catalogBlocks: Block[] = PROGRAM_CATALOG.flatMap((group) => [
  { kind: "subhead", text: group.area } as Block,
  {
    kind: "prose",
    text: group.programs
      .map((p) => `${p.name} (grades ${p.grades}) \u2014 ${p.note}`)
      .join("\n"),
  } as Block,
]);

export const day4: Day = {
  day: 4,
  date: "Thursday, August 20, 2026",
  shortDate: "Thu Aug 20",
  title: "The Opportunity Blueprint",
  coreQuestion:
    "How will I take advantage of out-of-school opportunities to learn, explore, and grow?",
  pages: {
    "pre-work": {
      day: 4,
      section: "pre-work",
      eyebrow: "Asynchronous Pre-Work",
      title: "My Opportunity Scan",
      coreQuestion:
        "How will I take advantage of out-of-school opportunities to learn, explore, and grow?",
      subtitle:
        "Appliers relentlessly explore opportunities to learn and apply. Before Thursday, do the search you have been putting off. Bring real names and real deadlines.",
      parts: [
        {
          id: "p1",
          number: "Part 1",
          title: "Last Year's Applier Record",
          blocks: [
            f({
              kind: "short",
              key: "d4.pw.count",
              label: "Number of applications I submitted last year:",
            }),
            f({
              kind: "table",
              key: "d4.pw.past",
              label: "What I applied to, and what happened",
              rows: 3,
              addRows: true,
              columns: [
                { key: "name", label: "Opportunity", type: "text" },
                { key: "outcome", label: "Outcome", type: "text" },
                { key: "learned", label: "What I learned from it", type: "long" },
              ],
            }),
            f({
              kind: "checklist",
              key: "d4.pw.blockers",
              label: "What kept me from applying to more:",
              other: true,
              options: [
                "I did not know what existed",
                "I found out after the deadline",
                "I assumed I would not get in",
                "I did not have an essay ready",
                "I could not get a recommendation in time",
                "I was too busy with school",
                "I did not want to ask for help",
                "The application looked too long",
                "I did not think I could afford it",
              ],
            }),
          ],
        },
        {
          id: "p2",
          number: "Part 2",
          title: "This Year's Search",
          intro: "Find at least eight real opportunities. You will narrow them down in the Lab.",
          blocks: [
            f({
              kind: "table",
              key: "d4.pw.scan",
              label: "Opportunities I found",
              rows: 8,
              addRows: true,
              columns: [
                { key: "name", label: "Opportunity", type: "text" },
                { key: "type", label: "Type (program, scholarship, internship, competition)", type: "text" },
                { key: "deadline", label: "Deadline", type: "text" },
                { key: "why", label: "Why it fits me", type: "long" },
              ],
            }),
          ],
        },
        {
          id: "p3",
          number: "Part 3",
          title: "What I Bring",
          blocks: [
            f({
              kind: "long",
              key: "d4.pw.story",
              label: "The story about me that most applications will need to hear:",
              rows: 4,
            }),
            f({
              kind: "long",
              key: "d4.pw.recommenders",
              label: "Who could write me a strong recommendation, and what they would say:",
              rows: 3,
            }),
            {
              kind: "vault",
              title: "Go deeper in The Vault",
              text: "The Vault's opportunity library and application walkthroughs are the fastest way to build this list.",
              href: VAULT_VIDEOS.opportunities,
              cta: "Watch the opportunity walkthrough",
            },
          ],
        },
      ],
    },
    session: {
      day: 4,
      section: "session",
      eyebrow: "Live Session Notes",
      title: "Thursday Guided Notes",
      parts: [
        {
          id: "recap",
          title: "From the TeenSHARP team",
          blocks: [{ kind: "recap", day: 4 }],
        },
        {
          id: "gallery",
          number: "Gallery Walk",
          title: "Opportunity Gallery Walk",
          intro:
            "As programs, scholarships, and internships are presented, capture them here in real time. Do not filter yet \u2014 capture everything that could plausibly fit you, then narrow in the Lab.",
          blocks: [
            f({
              kind: "table",
              key: "d4.s.gallery",
              label: "Everything I saw in the gallery walk",
              rows: 10,
              addRows: true,
              columns: [
                { key: "name", label: "Opportunity", type: "text" },
                { key: "area", label: "Interest area", type: "text" },
                { key: "grades", label: "Grades served", type: "text" },
                { key: "deadline", label: "Deadline (approx.)", type: "text" },
                { key: "fit", label: "Why it could fit me", type: "long" },
              ],
            }),
            f({
              kind: "long",
              key: "d4.s.gallery.pattern",
              label:
                "Looking at what I captured: what pattern do these opportunities share, and what does that say about the direction I am actually heading?",
              rows: 4,
            }),
          ],
        },
        {
          id: "symposium",
          number: "2:00 PM",
          title: "Summer Learning Symposium",
          blocks: [
            f({
              kind: "table",
              key: "d4.s.symposium",
              label: "What peers did this summer that I could do next",
              rows: 4,
              addRows: true,
              columns: [
                { key: "who", label: "Student", type: "text" },
                { key: "what", label: "What they did", type: "long" },
                { key: "path", label: "How they got in", type: "long" },
              ],
            }),
          ],
        },
        {
          id: "workshop",
          number: "3:05 PM",
          title: "Workshop: The Making of an Applier",
          intro: "Led by Alina de Zoysa, TeenSHARP Pre-College Program Coordinator and Alumna '21.",
          blocks: [
            f({
              kind: "long",
              key: "d4.s.workshop.process",
              label: "The application process, mapped backward from a deadline:",
              rows: 6,
            }),
            f({
              kind: "long",
              key: "d4.s.workshop.mistake",
              label: "The mistake I have been making that I now see clearly:",
              rows: 3,
            }),
          ],
        },
      ],
    },
    lab: {
      day: 4,
      section: "lab",
      eyebrow: "Blueprint Lab",
      title: "Build Section 4: My Opportunity Blueprint",
      subtitle:
        "Commit to at least five opportunities with real dates. These become the calendar events you export.",
      parts: [
        {
          id: "carry",
          title: "Before you build this section",
          blocks: [
            {
              kind: "carry",
              title: "From your pre-work and session notes",
              from: [
                "d4.pw.count",
                "d4.pw.past",
                "d4.pw.blockers",
                "d4.pw.scan",
                "d4.pw.story",
                "d4.pw.recommenders",
                "d4.s.workshop.mistake",
              ],
            },
          ],
        },
        {
          id: "catalog",
          title: "The Opportunity Catalog",
          intro:
            "Programs organized by interest area, with the grades they serve and roughly when applications close. Deadlines shift year to year \u2014 confirm every one on the program's own site as part of your research.",
          blocks: [
            ...catalogBlocks,
            {
              kind: "note",
              text: "Nothing here is a ceiling. If a program you want is missing, add it \u2014 the requirement is five or more real commitments, not five from this page.",
            },
          ],
        },
        {
          id: "committed",
          title: "My Committed Opportunities",
          blocks: [
            f({
              kind: "table",
              key: "d4.lab.committed",
              label: "Five or more opportunities I am committing to apply for",
              prefillFrom: "d4.pw.scan",
              rows: 5,
              addRows: true,
              columns: [
                { key: "name", label: "Opportunity", type: "text" },
                { key: "type", label: "Type", type: "text" },
                { key: "deadline", label: "Deadline (YYYY-MM-DD)", type: "text" },
                { key: "why", label: "Why this one", type: "long" },
              ],
            }),
            {
              kind: "note",
              text: "Use YYYY-MM-DD for deadlines so they export cleanly to your calendar from the Blueprint page.",
            },
          ],
        },
        {
          id: "requirements",
          title: "Requirements Research",
          intro:
            "For every opportunity you committed to, open its site and record what it actually asks for. An application you have not read is an application you will miss.",
          blocks: [
            f({
              kind: "table",
              key: "d4.lab.requirements",
              label: "What each application requires",
              rows: 5,
              addRows: true,
              columns: [
                { key: "name", label: "Opportunity", type: "text" },
                { key: "deadline", label: "Deadline", type: "date" },
                { key: "essays", label: "Essays or written work required", type: "long" },
                { key: "recs", label: "Recommendations (how many, from whom)", type: "long" },
                { key: "other", label: "Transcript, scores, portfolio, interview, fee waiver", type: "long" },
              ],
            }),
            f({
              kind: "long",
              key: "d4.lab.requirements.hardest",
              label:
                "Which requirement will take me the longest to produce well, and when does work on it have to start for it to be strong rather than rushed?",
              rows: 3,
            }),
          ],
        },
        {
          id: "calendar",
          title: "Backward Calendaring",
          intro:
            "Start at each deadline and walk backward. Every milestone gets a date, and every date goes on your Google Calendar. This is the section that turns a list of programs into work that actually happens.",
          blocks: [
            {
              kind: "principles",
              title: "How to build it backward",
              items: [
                {
                  title: "Anchor on the deadline",
                  text: "Write the real deadline first, confirmed on the program's own site. Then treat submission day as one week earlier \u2014 servers crash and recommenders run late.",
                },
                {
                  title: "Place the recommendation ask first",
                  text: "Recommenders need at least four weeks. That means the ask is one of the earliest milestones, not one of the last.",
                  example: "Deadline Feb 1 \u2192 ask recommenders by Dec 20, with your resume and a paragraph on why this program.",
                },
                {
                  title: "Draft, rest, revise",
                  text: "First draft, then a week away from it, then revision with feedback, then a final polish. Four milestones per essay, not one.",
                  example: "Deadline Feb 1 \u2192 Draft 1 started Dec 27 \u00b7 Draft 1 done Jan 3 \u00b7 Feedback in hand Jan 10 \u00b7 Final Jan 24.",
                },
                {
                  title: "Collect the paperwork early",
                  text: "Transcripts, score reports, and fee waivers depend on other people's offices being open. Schedule those requests before winter break, not during it.",
                },
              ],
            },
            f({
              kind: "table",
              key: "d4.lab.calendar",
              label: "My milestones, working backward from every deadline",
              rows: 8,
              addRows: true,
              examplesTitle: "Show a worked example",
              examples: [
                { label: "Milestone", text: "Draft 1 started \u00b7 MITES \u00b7 2026-12-27" },
                { label: "Milestone", text: "Recommenders asked (Mr. Diaz, Ms. Okafor) \u00b7 MITES \u00b7 2026-12-20" },
                { label: "Milestone", text: "Transcript requested from counselor \u00b7 MITES \u00b7 2027-01-05" },
              ],
              columns: [
                { key: "task", label: "Milestone", type: "long" },
                { key: "opportunity", label: "For which opportunity", type: "text" },
                { key: "date", label: "Do it by", type: "date" },
                { key: "done", label: "Done", type: "check" },
              ],
            }),
            {
              kind: "note",
              text: "Every milestone with a date exports to Google Calendar from the Blueprint page, alongside your deadlines. Put them on the calendar the same day you write them here.",
            },
          ],
        },
        {
          id: "essay",
          title: "Essay Notes",
          blocks: [
            f({
              kind: "long",
              key: "d4.lab.essay.theme",
              label: "The through-line of my story:",
              prefillFrom: "d4.pw.story",
              rows: 4,
            }),
            f({
              kind: "table",
              key: "d4.lab.essay.moments",
              label: "Moments I can write about",
              rows: 3,
              addRows: true,
              columns: [
                { key: "moment", label: "Moment", type: "long" },
                { key: "shows", label: "What it shows about me", type: "long" },
              ],
            }),
            {
              kind: "vault",
              title: "Keep this alive in The Vault",
              text: "The Vault keeps the deadlines, essay feedback, and application support coming all year \u2014 this plan does not have to sit on a shelf.",
              href: VAULT_VIDEOS.applications,
              cta: "Watch: keeping the plan alive",
            },
          ],
        },
      ],
    },
    reflect: {
      day: 4,
      section: "reflect",
      eyebrow: "End-of-Day Analysis",
      title: "Thursday Reflection",
      parts: [
        {
          id: "reflect",
          title: "Closing the week",
          blocks: [
            f({
              kind: "long",
              key: "d4.r.insights",
              label: "Insights I gained across the four days, and the evidence behind each one:",
              rows: 5,
            }),
            f({
              kind: "long",
              key: "d4.r.takeaways",
              label:
                "My takeaways \u2014 what I now know about the gap between the student I have been and the student this blueprint describes:",
              rows: 5,
            }),
            f({
              kind: "long",
              key: "d4.r.discomfort",
              label:
                "What this week made uncomfortable, and what that discomfort is telling me to change:",
              rows: 4,
            }),
            f({
              kind: "long",
              key: "d4.r.commit",
              label:
                "The commitments I will not let slide \u2014 each with a first step, a date, and how I will know I kept it:",
              rows: 5,
            }),
            f({
              kind: "short",
              key: "d4.r.share",
              label: "Who I am telling about these commitments, and when:",
              placeholder: "Parent, counselor, teacher, or peer \u2014 with the date",
            }),
            f({
              kind: "long",
              key: "d4.r.year",
              label: "If this blueprint works, here is who I will be by June, described specifically:",
              rows: 4,
            }),
            {
              kind: "offer",
              id: "senior-advising",
              placement: "d4.reflect",
            },
            {
              kind: "offer",
              id: "vault",
              placement: "d4.reflect",
            },
          ],
        },
      ],
    },
  },
};
