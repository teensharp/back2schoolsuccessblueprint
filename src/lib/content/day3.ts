import { f, type Day } from "./types";

export const day3: Day = {
  day: 3,
  date: "Wednesday, August 19, 2026",
  shortDate: "Wed Aug 19",
  title: "The Leadership Playbook",
  coreQuestion: "How will I lead, serve, contribute, and build a meaningful track record this year?",
  pages: {
    "pre-work": {
      day: 3,
      section: "pre-work",
      eyebrow: "Asynchronous Pre-Work",
      title: "My Leadership and Service Inventory",
      coreQuestion:
        "How will I lead, serve, contribute, and build a meaningful track record this year?",
      subtitle:
        "Leadership is not a title. It is a record of what you started, who you served, and what changed because you were there. Take stock honestly before Wednesday.",
      parts: [
        {
          id: "p1",
          number: "Part 1",
          title: "My Current Track Record",
          blocks: [
            f({
              kind: "table",
              key: "d3.pw.activities",
              label: "Everything I was part of last year",
              rows: 5,
              addRows: true,
              columns: [
                { key: "activity", label: "Activity, club, team, job, or service", type: "text" },
                { key: "role", label: "My role", type: "text" },
                { key: "hours", label: "Hours per week", type: "text" },
                { key: "impact", label: "What actually changed because I was there", type: "long" },
              ],
            }),
            f({
              kind: "long",
              key: "d3.pw.activities.honest",
              label:
                "Which of these was real contribution, and which was mostly attendance? Be honest.",
              rows: 3,
            }),
          ],
        },
        {
          id: "p2",
          number: "Part 2",
          title: "The Community I Care About",
          blocks: [
            f({
              kind: "long",
              key: "d3.pw.community",
              label: "A community or group of people whose situation genuinely bothers me:",
              rows: 3,
            }),
            f({
              kind: "long",
              key: "d3.pw.rootcause",
              label: "What I actually know about why that problem exists:",
              rows: 3,
            }),
            f({
              kind: "long",
              key: "d3.pw.rootcause.gap",
              label: "What I would need to learn to be useful rather than well-meaning:",
              rows: 3,
            }),
          ],
        },
        {
          id: "p3",
          number: "Part 3",
          title: "Deepen, Stop, Start",
          blocks: [
            f({
              kind: "table",
              key: "d3.pw.deepen",
              label: "What I will go deeper in",
              rows: 2,
              addRows: true,
              columns: [
                { key: "item", label: "Commitment", type: "long" },
                { key: "why", label: "Why it deserves more of me", type: "long" },
              ],
            }),
            f({
              kind: "table",
              key: "d3.pw.stop",
              label: "What I will let go of",
              rows: 2,
              addRows: true,
              columns: [
                { key: "item", label: "Commitment", type: "long" },
                { key: "why", label: "Why it is not worth the hours", type: "long" },
              ],
            }),
            f({
              kind: "table",
              key: "d3.pw.startnew",
              label: "What I want to start",
              rows: 2,
              addRows: true,
              columns: [
                { key: "item", label: "New effort", type: "long" },
                { key: "why", label: "What it would make possible", type: "long" },
              ],
            }),
            {
              kind: "vault",
              title: "Go deeper in The Vault",
              text: "The Vault's leadership series breaks down how students turn one problem into a real initiative.",
              cta: "Open The Vault",
            },
          ],
        },
      ],
    },
    session: {
      day: 3,
      section: "session",
      eyebrow: "Live Session Notes",
      title: "Wednesday Guided Notes",
      parts: [
        {
          id: "check",
          number: "2:00 PM",
          title: "Wednesday Progress Check",
          intro: "Ms. Tatiana Poladko and Ms. Sara Petty.",
          blocks: [
            f({
              kind: "long",
              key: "d3.s.check.question",
              label: "My question or insight to share:",
              rows: 3,
            }),
          ],
        },
        {
          id: "panel",
          number: "2:30 PM",
          title: "More Than a Student: Becoming a Leader",
          intro:
            "Panel with Matias Moreno (Benjamin Franklin HS, PA), Caitlyn Grimes (Lawrence HS, NJ), and Rafael Farrera-Juarez (Harvard '30).",
          blocks: [
            f({
              kind: "table",
              key: "d3.s.panel.moves",
              label: "How each panelist actually started",
              rows: 3,
              addRows: true,
              columns: [
                { key: "who", label: "Panelist", type: "text" },
                { key: "move", label: "Their first move", type: "long" },
                { key: "mine", label: "My version of it", type: "long" },
              ],
            }),
            f({
              kind: "long",
              key: "d3.s.panel.obstacle",
              label: "The obstacle they described that I expect to hit too:",
              rows: 3,
            }),
          ],
        },
        {
          id: "workshop",
          number: "3:35 PM",
          title: "Workshop: The Leadership Playbook",
          intro: "Led by Ms. Tatiana Poladko.",
          blocks: [
            f({
              kind: "long",
              key: "d3.s.workshop.notes",
              label: "The playbook, in my own words:",
              rows: 6,
            }),
            f({
              kind: "long",
              key: "d3.s.workshop.evidence",
              label: "What counts as evidence of impact:",
              rows: 3,
            }),
          ],
        },
      ],
    },
    lab: {
      day: 3,
      section: "lab",
      eyebrow: "Blueprint Lab",
      title: "Build Section 3: My Leadership Playbook",
      subtitle: "Turn today into a plan with a first action and a real date.",
      parts: [
        {
          id: "carry",
          title: "What you already said",
          blocks: [
            {
              kind: "carry",
              title: "From your pre-work and session notes",
              from: ["d3.pw.community", "d3.s.workshop.evidence"],
            },
          ],
        },
        {
          id: "portfolio",
          title: "Deepen / Stop / Start / Transform",
          blocks: [
            f({
              kind: "table",
              key: "d3.lab.deepen",
              label: "Deepen",
              prefillFrom: "d3.pw.deepen",
              rows: 2,
              addRows: true,
              columns: [
                { key: "item", label: "Commitment", type: "long" },
                { key: "why", label: "What deeper looks like this year", type: "long" },
              ],
            }),
            f({
              kind: "table",
              key: "d3.lab.stop",
              label: "Stop",
              prefillFrom: "d3.pw.stop",
              rows: 2,
              addRows: true,
              columns: [
                { key: "item", label: "Commitment", type: "long" },
                { key: "why", label: "What I free up by stopping", type: "long" },
              ],
            }),
            f({
              kind: "table",
              key: "d3.lab.start",
              label: "Start",
              prefillFrom: "d3.pw.startnew",
              rows: 2,
              addRows: true,
              columns: [
                { key: "item", label: "New effort", type: "long" },
                { key: "why", label: "My first step", type: "long" },
              ],
            }),
            f({
              kind: "long",
              key: "d3.lab.transform",
              label: "Transform: one thing I am already in that I will make significantly better:",
              rows: 3,
            }),
          ],
        },
        {
          id: "move",
          title: "My Leadership Move",
          blocks: [
            f({
              kind: "long",
              key: "d3.lab.community",
              label: "The community I am committing to this year:",
              prefillFrom: "d3.pw.community",
              rows: 3,
            }),
            f({
              kind: "long",
              key: "d3.lab.move",
              label: "The specific leadership move I will make:",
              rows: 4,
            }),
            f({
              kind: "table",
              key: "d3.lab.evidence",
              label: "How I will know it worked",
              rows: 3,
              addRows: true,
              columns: [
                { key: "measure", label: "Evidence of impact", type: "long" },
                { key: "when", label: "By when", type: "text" },
              ],
            }),
          ],
        },
        {
          id: "first",
          title: "First Action",
          blocks: [
            f({ kind: "short", key: "d3.lab.first.action", label: "My very first action is:" }),
            f({
              kind: "short",
              key: "d3.lab.first.date",
              label: "I will do it by (date):",
              placeholder: "YYYY-MM-DD",
            }),
            f({
              kind: "short",
              key: "d3.lab.first.who",
              label: "The person I need to talk to first:",
            }),
            {
              kind: "vault",
              title: "Go deeper in The Vault",
              text: "Bring your leadership move to The Vault community and get feedback before you launch it.",
              cta: "Open The Vault",
            },
          ],
        },
      ],
    },
    reflect: {
      day: 3,
      section: "reflect",
      eyebrow: "End-of-Day Analysis",
      title: "Wednesday Reflection",
      parts: [
        {
          id: "reflect",
          title: "What shifted today",
          blocks: [
            f({
              kind: "long",
              key: "d3.r.shift",
              label: "The biggest thing that shifted for me today:",
              rows: 3,
            }),
            f({
              kind: "long",
              key: "d3.r.commit",
              label: "The one thing I am committing to before tomorrow:",
              rows: 3,
            }),
            f({
              kind: "short",
              key: "d3.r.share",
              label: "Who I will tell about this commitment:",
              placeholder: "Parent, counselor, teacher, or friend",
            }),
          ],
        },
      ],
    },
  },
};
