import { VAULT_VIDEOS } from "@/lib/brand";
import calendarExample from "@/assets/weekly-calendar-example.png";

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
              text: "Dami's story shows what real depth in a subject looks like when a student stops doing the minimum.",
              href: VAULT_VIDEOS.dami.href,
              cta: `Watch: ${VAULT_VIDEOS.dami.title}`,
            },
          ],
        },
        {
          id: "p4",
          number: "Part 4",
          title: "Design My Weekly Calendar",
          intro:
            "Leadership and academics both run on the same scarce resource: your hours. Before Wednesday, rebuild your week so that every minute from wake-up to bedtime has a job. This is the assignment that makes the rest of the blueprint executable.",
          blocks: [
            {
              kind: "principles",
              title: "The seven principles",
              items: [
                {
                  title: "Give every minute a job",
                  text: "From the time you wake up to the time you go to bed, every block is assigned based on your yearly, monthly, weekly, and daily goals. Personal routines belong on the calendar too \u2014 meals, rest, workouts, time with family, worship, commuting. Practically, this means your Google Calendar has no blank space.",
                  example:
                    "6:30 Wake and get ready \u00b7 7:10 Commute \u00b7 7:45 School \u00b7 3:10 Snack and reset \u00b7 3:30 Chem problem set \u00b7 5:00 Dinner with family \u00b7 5:45 Spanish recall practice \u00b7 7:15 Workout \u00b7 8:30 Read ahead in APUSH \u00b7 10:00 Wind down.",
                },
                {
                  title: "Protect 30 to 35 hours of study and homework",
                  text: "This is the time you spend mastering content and applying the techniques from this week \u2014 spaced repetition, active recall, practice problems, reading ahead. Mastery takes hours, and those hours have to be visible on the calendar before the week starts.",
                  example:
                    "Roughly 4 hours on each school day plus 6 to 8 hours across the weekend puts you inside the range.",
                },
                {
                  title: "Use your weekends on purpose",
                  text: "It is impossible to reach 30 to 35 hours without weekends. Weekends are not do-nothing time; they are your longest uninterrupted blocks. Decide honestly how much rest you need, then build real work around it. If you treat learning as a chore, weekends feel like punishment. If learning is what growing up is for, weekend blocks are the most productive hours you own.",
                },
                {
                  title: "If it is not on the calendar, it will not get done",
                  text: "Any time you tell someone you are going to do something, the first move is to put it on the calendar. Sequence: set goals, build the to-do list from those goals, then place the to-do list onto the calendar as time blocks.",
                },
                {
                  title: "Pre-schedule; do not wait to be told",
                  text: "Students say they cannot schedule because they do not know when tests will be assigned. That thinking runs against everything you learned this week. Whether or not you have a test should change nothing about how you study. With backward calendaring, an assignment appearing on Tuesday should not disturb your blocks unless it was genuinely assigned last minute.",
                },
                {
                  title: "Build systems that survive your human nature",
                  text: "Respect the schedule so that studying is not a matter of mood or whim. If you rely on how you feel on a given evening, you will not achieve much. The point of the calendar is that the decision was already made by a more disciplined version of you.",
                },
                {
                  title: "Evaluate weekly and adjust",
                  text: "Google Calendar repeats blocks week over week, but repeating is not the same as evaluating. Every week, ask what needed more time and what needed less. Students who struggle in a subject and change nothing about their approach \u2014 same hours, same methods \u2014 are hoping for a different result from identical inputs. That is not how it works.",
                  example:
                    "Sunday, 30 minutes: review last week's blocks, move hours toward the subject where your work is not producing the grade, and change the method, not just the minutes.",
                },
              ],
            },
            {
              kind: "image",
              src: calendarExample,
              alt: "A student's Google Calendar for one week, fully color-coded with no empty space: classes, study blocks, meals, workouts, and personal time.",
              caption:
                "This is the standard. Every hour is assigned: classes, named study blocks (\u201cWrite FWS Essay,\u201d \u201cBIO Notes\u201d), meals, workout, and personal time. Notice that the study blocks name the actual task, not just the subject.",
            },
            f({
              kind: "table",
              key: "d3.pw.studyhours",
              label: "My study and homework hours this week",
              rows: 7,
              addRows: false,
              totalColumn: "hours",
              totalLabel: "Total study hours planned",
              targetMin: 30,
              targetMax: 35,
              columns: [
                { key: "day", label: "Day", type: "text" },
                { key: "hours", label: "Study hours", type: "number" },
                { key: "blocks", label: "What those blocks are specifically for", type: "long" },
              ],
            }),
            {
              kind: "note",
              text: "Fill in all seven days, weekends included. The total updates as you type and tells you whether your plan actually clears the standard.",
            },
            f({
              kind: "table",
              key: "d3.pw.weekgrid",
              label: "My week, block by block \u2014 no blank space",
              rows: 8,
              addRows: true,
              examplesTitle: "Show a worked example",
              examples: [
                {
                  label: "Weekday evening",
                  text: "Mon \u00b7 3:30\u20135:00 \u00b7 Chem problem set, retry the six I missed on the quiz \u00b7 Academics",
                },
                {
                  label: "Personal, still scheduled",
                  text: "Mon \u00b7 5:00\u20135:45 \u00b7 Dinner with family, phone in the other room \u00b7 Personal",
                },
                {
                  label: "Weekend deep block",
                  text: "Sat \u00b7 9:00\u201312:00 \u00b7 APUSH reading ahead two chapters + Cornell notes \u00b7 Academics",
                },
              ],
              columns: [
                { key: "day", label: "Day", type: "text" },
                { key: "time", label: "Time block", type: "text" },
                { key: "what", label: "What happens in it (be specific)", type: "long" },
                { key: "type", label: "Academic / Activity / Personal / Rest", type: "text" },
              ],
            }),
            f({
              kind: "agree",
              key: "d3.pw.calendar.audit",
              label: "Audit my calendar against the principles",
              choices: ["Yes", "No"],
              score: true,
              bands: [
                {
                  min: 6,
                  label: "Built to hold",
                  text: "This calendar can carry a demanding year. Now the work is respecting it in week six, not just week one.",
                },
                {
                  min: 3,
                  label: "Partly built",
                  text: "You have a shape, not yet a system. Fix the No items before Wednesday's session.",
                },
                {
                  min: 0,
                  label: "Not yet a calendar",
                  text: "Right now this is a wish list. Rebuild it block by block before the session \u2014 bring questions if you get stuck.",
                },
              ],
              statements: [
                "Every hour from wake-up to bedtime is assigned \u2014 my calendar has no blank space.",
                "My study and homework blocks total at least 30 hours.",
                "My weekends contain real, purposeful work blocks, not just rest.",
                "Meals, rest, family time, and my routines are on the calendar, not assumed.",
                "Each study block names a specific task, not just a subject.",
                "My blocks repeat weekly in Google Calendar.",
                "I have a recurring weekly review block to evaluate and adjust the schedule.",
              ],
            }),
            f({
              kind: "short",
              key: "d3.pw.review.day",
              label: "My weekly review happens every:",
              placeholder: "e.g. Sunday 7:00 PM",
            }),
            f({
              kind: "long",
              key: "d3.pw.calendar.hard",
              label:
                "Where this schedule will break first, who or what will break it, and what I will do when that happens:",
              rows: 4,
            }),
            f({
              kind: "long",
              key: "d3.pw.calendar.attitude",
              label:
                "Write honestly about your attitude toward schoolwork. Where do you still treat learning as a chore to survive rather than the work of growing up, and what does that cost you?",
              rows: 4,
            }),
            {
              kind: "vault",
              title: "Go deeper in The Vault",
              text: "Dami describes the study routine behind the growth — use it as a model for your own blocks.",
              href: VAULT_VIDEOS.dami.href,
              cta: `Watch: ${VAULT_VIDEOS.dami.title}`,
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
          id: "recap",
          title: "From the TeenSHARP team",
          blocks: [{ kind: "recap", day: 3 }],
        },
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
          title: "Before you build this section",
          blocks: [
            {
              kind: "carry",
              title: "From your pre-work and session notes",
              from: [
                "d3.pw.community",
                "d3.pw.rootcause",
                "d3.pw.deepen",
                "d3.pw.stop",
                "d3.pw.startnew",
                "d3.pw.calendar.hard",
                "d3.s.workshop.evidence",
              ],
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
              text: "Dami's path from struggle to mastery is what sustained effort on one thing actually looks like.",
              href: VAULT_VIDEOS.dami.href,
              cta: `Watch: ${VAULT_VIDEOS.dami.title}`,
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
          title: "Today's analysis",
          blocks: [
            f({
              kind: "long",
              key: "d3.r.insights",
              label: "Insights I gained today about leadership, service, and my own track record:",
              rows: 5,
            }),
            f({
              kind: "long",
              key: "d3.r.takeaways",
              label:
                "My takeaways \u2014 what I now understand about the difference between holding a title and producing change:",
              rows: 5,
            }),
            f({
              kind: "long",
              key: "d3.r.discomfort",
              label:
                "What today made uncomfortable, and what that discomfort is telling me to change:",
              rows: 4,
            }),
            f({
              kind: "long",
              key: "d3.r.commit",
              label: "My commitments before tomorrow \u2014 each with a first step and a date:",
              rows: 4,
            }),
            f({
              kind: "short",
              key: "d3.r.share",
              label: "Who I am telling about these commitments, and when:",
              placeholder: "Parent, counselor, teacher, or peer \u2014 with the date",
            }),
            {
              kind: "offer",
              id: "junior-advising",
              placement: "d3.reflect",
            },
          ],
        },
      ],
    },
  },
};
