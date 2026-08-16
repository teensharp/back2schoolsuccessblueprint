import { f, type Day } from "./types";

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
              cta: "Open The Vault",
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
          title: "What you already said",
          blocks: [
            {
              kind: "carry",
              title: "From your pre-work and session notes",
              from: ["d4.pw.count", "d4.s.workshop.mistake"],
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
          id: "calendar",
          title: "My Action Calendar",
          blocks: [
            f({
              kind: "table",
              key: "d4.lab.calendar",
              label: "Working backward from each deadline",
              rows: 6,
              addRows: true,
              columns: [
                { key: "task", label: "Task", type: "long" },
                { key: "opportunity", label: "For which opportunity", type: "text" },
                { key: "date", label: "Do it by (YYYY-MM-DD)", type: "text" },
              ],
            }),
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
              cta: "Open The Vault",
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
              key: "d4.r.shift",
              label: "The biggest thing that shifted for me this week:",
              rows: 3,
            }),
            f({
              kind: "long",
              key: "d4.r.commit",
              label: "The one commitment I will not let slide:",
              rows: 3,
            }),
            f({
              kind: "short",
              key: "d4.r.share",
              label: "Who I will tell about this commitment:",
              placeholder: "Parent, counselor, teacher, or friend",
            }),
            f({
              kind: "long",
              key: "d4.r.year",
              label: "If this blueprint works, here is who I will be by June:",
              rows: 4,
            }),
          ],
        },
      ],
    },
  },
};
