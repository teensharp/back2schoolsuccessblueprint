import { f, type Day } from "./types";

export const day2: Day = {
  day: 2,
  date: "Tuesday, August 18, 2026",
  shortDate: "Tue Aug 18",
  title: "The College-Ready Roadmap",
  coreQuestion:
    "How will my courses, grades, learning habits, and teacher relationships show I am ready for selective colleges?",
  pages: {
    "pre-work": {
      day: 2,
      section: "pre-work",
      eyebrow: "Asynchronous Pre-Work",
      title: "My Academic Readiness Audit",
      coreQuestion:
        "How will my courses, grades, learning habits, and teacher relationships show I am ready for selective colleges?",
      subtitle:
        "Selective colleges read a transcript as a story about the choices you made. Before Tuesday's session, gather the real facts of your academic record so you are working from evidence, not memory.",
      parts: [
        {
          id: "p1",
          number: "Part 1",
          title: "My Course Trajectory",
          intro: "List the courses you are taking this year, exactly as they appear on your schedule.",
          blocks: [
            f({
              kind: "table",
              key: "d2.pw.courses",
              label: "This year's schedule",
              rows: 6,
              addRows: true,
              columns: [
                { key: "course", label: "Course", type: "text" },
                { key: "level", label: "Level (Regular / Honors / AP / IB / DE)", type: "text" },
                { key: "grade", label: "Grade I am targeting", type: "text" },
              ],
            }),
            f({
              kind: "select",
              key: "d2.pw.rigor",
              label: "Overall, this schedule is:",
              options: [
                "The most rigorous load available to me",
                "Rigorous, but I left one option on the table",
                "Moderate \u2014 I could have pushed further",
                "Lighter than what I am capable of",
              ],
            }),
            f({
              kind: "long",
              key: "d2.pw.rigor.why",
              label: "Why I made those choices \u2014 and whether I would make them again:",
              rows: 3,
            }),
          ],
        },
        {
          id: "p2",
          number: "Part 2",
          title: "My Grades, Honestly",
          blocks: [
            f({ kind: "short", key: "d2.pw.gpa", label: "My current cumulative GPA:" }),
            f({
              kind: "long",
              key: "d2.pw.gpa.story",
              label: "What my grades last year say about how I actually worked:",
              rows: 3,
            }),
            f({
              kind: "table",
              key: "d2.pw.slipped",
              label: "Classes where my grade slipped, and the real reason",
              rows: 3,
              addRows: true,
              columns: [
                { key: "course", label: "Course", type: "text" },
                { key: "reason", label: "The real reason", type: "long" },
              ],
            }),
          ],
        },
        {
          id: "p3",
          number: "Part 3",
          title: "How I Actually Learn",
          blocks: [
            f({
              kind: "checklist",
              key: "d2.pw.strategies",
              label: "Study strategies I used consistently last year:",
              other: true,
              options: [
                "Active recall (testing myself without notes)",
                "Spaced repetition over several days",
                "Practice problems and past assessments",
                "Rewriting or reorganizing notes",
                "Teaching the material to someone else",
                "Reading the textbook before class",
                "Study groups with strong peers",
                "Office hours or extra help sessions",
                "Cramming the night before",
                "Re-reading notes and highlighting",
              ],
            }),
            f({
              kind: "long",
              key: "d2.pw.strategies.hardest",
              label: "My hardest class this year will be \u2014 and why:",
              rows: 3,
            }),
            f({
              kind: "long",
              key: "d2.pw.time",
              label: "Where my study time actually goes on a normal school night:",
              rows: 3,
            }),
          ],
        },
        {
          id: "p4",
          number: "Part 4",
          title: "My Teacher Relationships",
          blocks: [
            f({
              kind: "table",
              key: "d2.pw.teachers",
              label: "Teachers who know me well enough to write about me",
              rows: 3,
              addRows: true,
              columns: [
                { key: "teacher", label: "Teacher", type: "text" },
                { key: "subject", label: "Subject", type: "text" },
                { key: "evidence", label: "What they could say about me specifically", type: "long" },
              ],
            }),
            f({
              kind: "long",
              key: "d2.pw.teachers.gap",
              label: "The teacher I most need to build a real relationship with this year:",
              rows: 2,
            }),
            {
              kind: "vault",
              title: "Go deeper in The Vault",
              text: "Watch \u201cWhat Admission Officers Actually Read\u201d in The Vault before Tuesday's session.",
              cta: "Open The Vault",
            },
          ],
        },
      ],
    },
    session: {
      day: 2,
      section: "session",
      eyebrow: "Live Session Notes",
      title: "Tuesday Guided Notes",
      parts: [
        {
          id: "admissions",
          number: "2:00 PM",
          title: "What Academic Readiness Really Looks Like",
          intro: "A conversation with admission officers. Speaker: Kate Heekin, Williams College.",
          blocks: [
            f({
              kind: "long",
              key: "d2.s.admissions.looks",
              label: "What admission officers said they look for in a transcript:",
              rows: 5,
            }),
            f({
              kind: "long",
              key: "d2.s.admissions.surprise",
              label: "What surprised me most:",
              rows: 3,
            }),
            f({
              kind: "long",
              key: "d2.s.admissions.gap",
              label: "Where my record does not yet match what they described:",
              rows: 3,
            }),
          ],
        },
        {
          id: "story",
          number: "2:45 PM",
          title: "Choosing Challenge: A Student Story",
          intro: "Ana Paula Rodriguez Vazquez, TeenSHARP alumna '24, Boston University '29.",
          blocks: [
            f({
              kind: "long",
              key: "d2.s.story.choice",
              label: "The hard choice she made \u2014 and what it cost her:",
              rows: 3,
            }),
            f({
              kind: "long",
              key: "d2.s.story.mine",
              label: "The equivalent hard choice in front of me right now:",
              rows: 3,
            }),
          ],
        },
        {
          id: "science",
          number: "3:20 PM",
          title: "Workshop: The Science of Learning",
          intro: "Led by Ms. Tatiana Poladko.",
          blocks: [
            f({
              kind: "long",
              key: "d2.s.science.notes",
              label: "Learning techniques taught in the workshop:",
              rows: 6,
            }),
            f({
              kind: "long",
              key: "d2.s.science.replace",
              label: "The study habit I am replacing, and what replaces it:",
              rows: 3,
            }),
          ],
        },
      ],
    },
    lab: {
      day: 2,
      section: "lab",
      eyebrow: "Blueprint Lab",
      title: "Build Section 2: My College-Ready Roadmap",
      subtitle: "Refine what you brought in. This becomes Section 2 of your Blueprint.",
      parts: [
        {
          id: "carry",
          title: "What you already said",
          blocks: [
            {
              kind: "carry",
              title: "From your pre-work and session notes",
              from: ["d2.pw.rigor", "d2.pw.strategies.hardest", "d2.s.science.replace"],
            },
          ],
        },
        {
          id: "trajectory",
          title: "Course Trajectory and Rigor",
          blocks: [
            f({
              kind: "table",
              key: "d2.lab.courses",
              label: "My course plan, adjusted after today",
              prefillFrom: "d2.pw.courses",
              rows: 6,
              addRows: true,
              columns: [
                { key: "course", label: "Course", type: "text" },
                { key: "level", label: "Level", type: "text" },
                { key: "grade", label: "Target grade", type: "text" },
              ],
            }),
            f({
              kind: "long",
              key: "d2.lab.rigor.change",
              label: "A rigor change I will pursue (and who I will talk to about it):",
              rows: 3,
            }),
          ],
        },
        {
          id: "hardest",
          title: "My Hardest Class Plan",
          blocks: [
            f({
              kind: "short",
              key: "d2.lab.hardest.course",
              label: "My hardest class this year:",
            }),
            f({
              kind: "table",
              key: "d2.lab.hardest.plan",
              label: "How I will stay ahead in it",
              rows: 3,
              addRows: true,
              columns: [
                { key: "move", label: "What I will do", type: "long" },
                { key: "when", label: "How often / by when", type: "text" },
              ],
            }),
          ],
        },
        {
          id: "gpa",
          title: "Protecting My GPA",
          blocks: [
            f({ kind: "short", key: "d2.lab.gpa.target", label: "My GPA target this year:" }),
            f({
              kind: "long",
              key: "d2.lab.gpa.checkpoints",
              label: "My checkpoints: when and how I will actually review my grades:",
              rows: 3,
            }),
          ],
        },
        {
          id: "teachers",
          title: "Teacher Connection Plan",
          blocks: [
            f({
              kind: "table",
              key: "d2.lab.teachers",
              label: "My plan for each teacher relationship",
              prefillFrom: "d2.pw.teachers",
              rows: 3,
              addRows: true,
              columns: [
                { key: "teacher", label: "Teacher", type: "text" },
                { key: "subject", label: "Subject", type: "text" },
                { key: "evidence", label: "My first move and when I will make it", type: "long" },
              ],
            }),
          ],
        },
        {
          id: "study",
          title: "Study and Time Strategy",
          blocks: [
            f({
              kind: "table",
              key: "d2.lab.week",
              label: "My weekly study rhythm",
              rows: 5,
              addRows: true,
              columns: [
                { key: "day", label: "Day", type: "text" },
                { key: "block", label: "Study block", type: "text" },
                { key: "focus", label: "Focus", type: "long" },
              ],
            }),
            {
              kind: "vault",
              title: "Go deeper in The Vault",
              text: "The Vault's study systems series shows exactly how strong students structure a week.",
              cta: "Open The Vault",
            },
          ],
        },
      ],
    },
    reflect: {
      day: 2,
      section: "reflect",
      eyebrow: "End-of-Day Analysis",
      title: "Tuesday Reflection",
      parts: [
        {
          id: "reflect",
          title: "What shifted today",
          blocks: [
            f({
              kind: "long",
              key: "d2.r.shift",
              label: "The biggest thing that shifted for me today:",
              rows: 3,
            }),
            f({
              kind: "long",
              key: "d2.r.commit",
              label: "The one thing I am committing to before tomorrow:",
              rows: 3,
            }),
            f({
              kind: "short",
              key: "d2.r.share",
              label: "Who I will tell about this commitment:",
              placeholder: "Parent, counselor, teacher, or friend",
            }),
          ],
        },
      ],
    },
  },
};
