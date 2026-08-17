import { VAULT_VIDEOS } from "@/lib/brand";
import { BEHAVIORS, BEHAVIOR_DEFINITIONS } from "./behaviors";
import { f, type Block, type Day, type Part } from "./types";

const BEHAVIOR_OPTIONS = [...BEHAVIORS];

const AUDIT: { letter: string; name: (typeof BEHAVIORS)[number]; statements: string[] }[] = [
  {
    letter: "A",
    name: "Striver",
    statements: [
      "I received A's in all or nearly all of my classes.",
      "I took the most rigorous course load available to me.",
      "I leveled up my curriculum so I am not only meeting graduation requirements, but also moving toward admission requirements at top colleges.",
      "I finished the year near the top of my class or made meaningful progress toward that goal.",
      "I consistently followed a strong time-management routine.",
      "I was able to do more with my 24 hours because I planned and used my time well.",
    ],
  },
  {
    letter: "B",
    name: "Learner",
    statements: [
      "I not only received strong grades, but truly mastered the content I was learning.",
      "I used textbooks to deepen my understanding in my classes.",
      "I read several books from cover to cover for school.",
      "I read several books from cover to cover on my own.",
      "I pursued at least one curiosity or intellectual interest deeply on my own.",
      "I used proven learning practices, such as active recall, spaced repetition, review, note-taking, and practice, to master material.",
      "I could show my understanding not only on homework and classwork, but also on formative and summative assessments.",
    ],
  },
  {
    letter: "C",
    name: "Applier",
    statements: [
      "I submitted at least five quality applications to competitive programs, opportunities, or scholarships.",
      "I participated in at least one competitive enrichment opportunity this summer or during the past year.",
      "I know how to map out the full process for preparing an application before the deadline.",
      "I regularly reflected on what was going well and made immediate changes when something was not working.",
      "I sought feedback from teachers, mentors, parents, or advisors and made changes based on that feedback.",
      "I stayed open-minded about the kinds of opportunities I pursued.",
    ],
  },
  {
    letter: "D",
    name: "Connector",
    statements: [
      "I built strong partnerships with my teachers.",
      "I made time to connect with teachers outside of class about my learning, goals, or interests.",
      "I connected meaningfully with peers who excel in areas where I want to grow.",
      "I grew my professional or mentor network through intentional conversations, such as \u201ccoffee chats,\u201d emails, meetings, or informational interviews.",
      "My circle of friends sharpened me and helped me become a better version of myself.",
    ],
  },
  {
    letter: "E",
    name: "Giver",
    statements: [
      "I actively looked for opportunities to create value for others or help others throughout the year.",
      "I consistently supported at least one cause in my community.",
      "I dedicated significant time to helping make my community better.",
      "I worked toward or completed at least 100 hours of meaningful service this past year.",
      "I studied the root causes of issues I saw in my community.",
      "I sought knowledge through volunteering, internships, conversations, or research about how community issues are currently being solved.",
      "There are leaders in the community who could vouch for my active involvement and care.",
    ],
  },
  {
    letter: "F",
    name: "Starter",
    statements: [
      "When I noticed a problem, I did not only complain; I treated it as a leadership challenge.",
      "My presence made a space or community better, such as a classroom, home, school, club, team, or organization.",
      "I mobilized peers and/or adults to work together around a cause or solution.",
      "I held responsibility for initiatives or projects that were meaningful to my community.",
      "I took initiative without waiting for someone else to tell me exactly what to do.",
    ],
  },
];

const auditBlocks: Block[] = AUDIT.map((b) => {
  const slug = b.name.toLowerCase();
  return {
    kind: "group",
    letter: b.letter,
    title: b.name,
    definition: BEHAVIOR_DEFINITIONS[b.name],
    tally: true,
    blocks: [
      f({ kind: "agree", key: `d1.pw.audit.${slug}`, statements: b.statements }),
      f({
        kind: "long",
        key: `d1.pw.audit.${slug}.proud`,
        label: `The ${b.name} statement I am proudest to agree with is \u2014 and why:`,
        rows: 3,
      }),
      f({
        kind: "long",
        key: `d1.pw.audit.${slug}.reset`,
        label: `The ${b.name} statement where I most need a reset is \u2014 and why:`,
        rows: 3,
      }),
      f({
        kind: "long",
        key: `d1.pw.audit.${slug}.change`,
        label: `One change I need to make to become a stronger ${b.name} is \u2014 and why:`,
        rows: 3,
      }),
    ],
  };
});

const part1: Part = {
  id: "p1",
  number: "Part 1",
  title: "My Back-to-School Reset Self-Audit",
  intro: "For each statement, choose Agree or Disagree.",
  blocks: [
    {
      kind: "note",
      text: "Agree \u2014 This was consistently true for me. I can point to real evidence that I lived this behavior during the past school year or summer.\nDisagree \u2014 This was rarely true, not consistently true, or not yet true for me. This is an area where I need to reset, grow, or take stronger action.",
    },
    {
      kind: "prose",
      text: "Important: Choose Agree only when your actions and results show that the statement was truly part of how you operated. Choose Disagree if the statement describes something you value but did not yet practice consistently.",
    },
    ...auditBlocks,
  ],
};

const part2: Part = {
  id: "p2",
  number: "Part 2",
  title: "My Behavior Pattern Reflection",
  blocks: [
    { kind: "subhead", text: "My Strongest Guiding Behavior" },
    f({
      kind: "select",
      key: "d1.pw.strongest",
      label:
        "Based on my self-audit, the guiding behavior I demonstrated most consistently last year was:",
      options: BEHAVIOR_OPTIONS,
    }),
    { kind: "prose", text: "I chose this because I have evidence that I:" },
    f({
      kind: "short",
      key: "d1.pw.strongest.evidence1",
      label: "Did something consistently:",
    }),
    f({
      kind: "short",
      key: "d1.pw.strongest.evidence2",
      label: "Earned or produced this result:",
    }),
    f({
      kind: "short",
      key: "d1.pw.strongest.evidence3",
      label: "Have a person in authority who would agree with this:",
    }),
    f({
      kind: "long",
      key: "d1.pw.strongest.helped",
      label: "This strength helped me last year by:",
      rows: 3,
    }),
    f({
      kind: "long",
      key: "d1.pw.strongest.thisyear",
      label: "This year, I can use this strength to help me:",
      rows: 3,
    }),
    { kind: "subhead", text: "My Biggest Reset Area" },
    f({
      kind: "select",
      key: "d1.pw.reset",
      label: "Based on my self-audit, the guiding behavior where I most need a reset is:",
      options: BEHAVIOR_OPTIONS,
    }),
    { kind: "prose", text: "I chose this because I disagreed with statements related to:" },
    f({
      kind: "table",
      key: "d1.pw.reset.table",
      label: "What I did not do consistently, and why it matters",
      rows: 3,
      addRows: true,
      columns: [
        { key: "did_not", label: "What I Did Not Do Consistently", type: "long" },
        { key: "why", label: "Why It Matters", type: "long" },
      ],
    }),
    f({
      kind: "long",
      key: "d1.pw.reset.risk",
      label: "If I do not reset in this area, it could affect my school year by:",
      rows: 3,
    }),
    f({
      kind: "long",
      key: "d1.pw.reset.upside",
      label: "If I do reset in this area, it could help me become:",
      rows: 3,
    }),
  ],
};

const part3: Part = {
  id: "p3",
  number: "Part 3",
  title: "What Helped Me, What Hurt Me, and What Got in the Way",
  blocks: [
    { kind: "subhead", text: "What Helped Me Succeed?" },
    f({
      kind: "checklist",
      key: "d1.pw.helped",
      label: "The biggest reason I succeeded in some areas last year was:",
      other: true,
      options: [
        "I made up my mind to perform at my peak level",
        "I worked hard consistently",
        "I had strong time-management habits",
        "I had support from teachers",
        "I had support from family",
        "I had support from peers",
        "I used strong study strategies",
        "I stayed motivated by a clear goal",
        "I participated in a program, opportunity, or activity that pushed me",
        "I had a leadership role or responsibility",
        "I had a strong routine",
      ],
    }),
    f({ kind: "long", key: "d1.pw.helped.example", label: "The best example of this is:", rows: 3 }),
    f({
      kind: "long",
      key: "d1.pw.helped.continue",
      label: "I will continue to rely on these strengths by:",
      rows: 3,
    }),
    { kind: "subhead", text: "What Got in My Way?" },
    f({
      kind: "checklist",
      key: "d1.pw.hurt",
      label: "The biggest reason I did not perform at the level I wanted last year was:",
      other: true,
      options: [
        "I did not manage my time well",
        "I did not have the right mindset",
        "I procrastinated",
        "I did not ask for help early enough",
        "I did not have strong study systems",
        "I did not use textbooks or learning resources enough",
        "I did not check grades, deadlines, or feedback consistently",
        "I did not build strong relationships with teachers or mentors",
        "I did not pursue enough opportunities",
        "I waited too long to start applications or projects",
        "I was distracted by my phone, social media, games, or friends",
        "I overcommitted and had too much on my plate",
        "I was overwhelmed or stressed",
        "I did not know what to do next",
      ],
    }),
    f({ kind: "long", key: "d1.pw.hurt.example", label: "The clearest example of this is:", rows: 3 }),
    f({
      kind: "long",
      key: "d1.pw.hurt.because",
      label: "This got in the way of my success because:",
      rows: 3,
    }),
    f({
      kind: "long",
      key: "d1.pw.hurt.differently",
      label: "This year, I need to respond differently by:",
      rows: 3,
    }),
    { kind: "subhead", text: "My Warning Signs" },
    f({
      kind: "checklist",
      key: "d1.pw.warnings",
      label: "I know I am starting to get off track when:",
      other: true,
      options: [
        "I stop writing down assignments",
        "I stop checking my grades",
        "I miss or submit assignments late",
        "I avoid a class or teacher",
        "I feel confused but do not ask questions",
        "I study only the night before",
        "I start rushing my work",
        "I spend too much time on my phone",
        "I feel overwhelmed and shut down",
        "I stop using my planner/calendar",
        "I stop reading or preparing for class",
        "I miss deadlines for opportunities",
        "I stop communicating with people who can help me",
      ],
    }),
    f({
      kind: "table",
      key: "d1.pw.warnings.table",
      label: "My top three warning signs are:",
      rows: 3,
      columns: [
        { key: "sign", label: "Warning Sign", type: "long" },
        { key: "usually", label: "What I Usually Do", type: "long" },
        { key: "instead", label: "What I Need to Do Instead", type: "long" },
      ],
    }),
  ],
};

const startExamples = [
  {
    label: "Striver",
    text: "Start using a weekly planner; start tracking grades every Friday; start attending extra help before falling behind; start taking the most rigorous appropriate courses.",
  },
  {
    label: "Learner",
    text: "Start using textbooks; start reviewing notes weekly; start reading independently; start using active recall and practice tests.",
  },
  {
    label: "Applier",
    text: "Start tracking opportunities monthly; start applications earlier; start asking for feedback before submitting work.",
  },
  {
    label: "Connector",
    text: "Start introducing myself to teachers; start attending office hours; start connecting with peers who push me.",
  },
  {
    label: "Giver",
    text: "Start supporting a cause consistently; start finding ways to help classmates or community members.",
  },
  {
    label: "Starter",
    text: "Start taking initiative when I notice a problem; start leading a project, club effort, or solution.",
  },
];

const stopExamples = [
  {
    label: "Striver",
    text: "Stop waiting until the last minute; stop settling for easier classes without a reason; stop letting low grades surprise me.",
  },
  {
    label: "Learner",
    text: "Stop memorizing without understanding; stop ignoring textbooks; stop doing homework just to finish it.",
  },
  {
    label: "Applier",
    text: "Stop waiting until deadlines are close; stop avoiding opportunities because they feel intimidating.",
  },
  {
    label: "Connector",
    text: "Stop trying to figure everything out alone; stop avoiding teachers when I am confused.",
  },
  {
    label: "Giver",
    text: "Stop only thinking about my own success; stop doing random service without purpose or consistency.",
  },
  { label: "Starter", text: "Stop complaining without acting; stop waiting for someone else to lead." },
];

const strengthenExamples = [
  {
    label: "Striver",
    text: "Strengthen consistency, focus, time management, resilience, and academic ambition.",
  },
  {
    label: "Learner",
    text: "Strengthen reading, research, note-taking, studying, curiosity, and mastery.",
  },
  {
    label: "Applier",
    text: "Strengthen opportunity tracking, application planning, feedback use, and follow-through.",
  },
  {
    label: "Connector",
    text: "Strengthen teacher relationships, peer networks, mentor relationships, and communication.",
  },
  {
    label: "Giver",
    text: "Strengthen service, community care, generosity, and creating value for others.",
  },
  {
    label: "Starter",
    text: "Strengthen initiative, leadership, problem-solving, ownership, and courage.",
  },
];

const part4: Part = {
  id: "p4",
  number: "Part 4",
  title: "My Start / Stop / Strengthen Reset",
  blocks: [
    { kind: "subhead", text: "What I Need to Start" },
    f({
      kind: "table",
      key: "d1.pw.start",
      label: "Based on my self-audit, I need to start doing these things this year:",
      rows: 3,
      addRows: true,
      examplesTitle: "Examples of what you can choose from or adapt",
      examples: startExamples,
      columns: [
        { key: "action", label: "I Need to Start\u2026", type: "long" },
        { key: "behaviors", label: "Guiding Behavior This Supports", type: "behaviors" },
        { key: "why", label: "Why This Matters", type: "long" },
      ],
    }),
    { kind: "subhead", text: "What I Need to Stop" },
    f({
      kind: "table",
      key: "d1.pw.stop",
      label: "Based on my self-audit, I need to stop doing these things this year:",
      rows: 3,
      addRows: true,
      examplesTitle: "Examples you can choose from or adapt",
      examples: stopExamples,
      columns: [
        { key: "action", label: "I Need to Stop\u2026", type: "long" },
        { key: "behaviors", label: "Guiding Behavior This Affects", type: "behaviors" },
        { key: "why", label: "Why This Is Holding Me Back", type: "long" },
      ],
    }),
    { kind: "subhead", text: "What I Need to Strengthen" },
    f({
      kind: "table",
      key: "d1.pw.strengthen",
      label: "Based on my self-audit, I need to strengthen these habits, skills, or mindsets:",
      rows: 3,
      addRows: true,
      examplesTitle: "Examples you can choose from or adapt",
      examples: strengthenExamples,
      columns: [
        { key: "action", label: "I Need to Strengthen\u2026", type: "long" },
        { key: "behaviors", label: "Guiding Behavior This Supports", type: "behaviors" },
        { key: "why", label: "What Stronger Would Look Like", type: "long" },
      ],
    }),
    {
      kind: "vault",
      title: "Go deeper in The Vault",
      text: "Watch \u201cBuilding Habits That Stick\u201d in The Vault before Monday's session to sharpen your reset plan.",
      href: VAULT_VIDEOS.habits,
      cta: "Watch it in The Vault",
    },
  ],
};

export const day1: Day = {
  day: 1,
  date: "Monday, August 17, 2026",
  shortDate: "Mon Aug 17",
  title: "The Back-to-School Reset",
  coreQuestion:
    "What do I need to start, stop, and strengthen to become a stronger student this year?",
  pages: {
    "pre-work": {
      day: 1,
      section: "pre-work",
      eyebrow: "Asynchronous Pre-Work",
      title: "The Back-to-School Reset Reflection",
      coreQuestion:
        "What do I need to start, stop, and strengthen to become a stronger student this year?",
      subtitle:
        "Before the start of the Back-to-School Orientation, complete this self-audit honestly and thoughtfully. This is not a grade, and it is not about judging yourself. It is about identifying what was truly working, what was not working, and what needs to change so you can begin the school year with stronger habits, clearer expectations, and a better plan. As you complete the assessment, think about your actions during the past school year and summer. Do not answer based on what you intended to do, hoped to do, or did once or twice. Answer based on what your habits, choices, and results show.",
      parts: [part1, part2, part3, part4],
    },
    session: {
      day: 1,
      section: "session",
      eyebrow: "Live Session Notes",
      title: "Monday Guided Notes",
      subtitle: "Follow along with the live sessions. Capture what you hear and what it means for you.",
      parts: [
        {
          id: "recap",
          title: "From the TeenSHARP team",
          blocks: [{ kind: "recap", day: 1 }],
        },
        {
          id: "keynote",
          number: "2:00 PM",
          title: "Kick Off Keynote \u2014 Dr. Dan Porterfield",
          intro: "Introduced by Ms. Tatiana Poladko, TeenSHARP Co-Founder and Chief Program Officer.",
          blocks: [
            f({
              kind: "long",
              key: "d1.s.keynote.quote",
              label: "The line that stuck with me most:",
              rows: 3,
            }),
            f({
              kind: "long",
              key: "d1.s.keynote.means",
              label: "What that means for my school year:",
              rows: 3,
            }),
          ],
        },
        {
          id: "panel",
          number: "2:40 PM",
          title: "What Top Students Do Differently",
          intro:
            "Panel with Arely Reyes (Amherst '29), Aanyae Anderson (Wake Forest '29), and Justin Dorce (Washington University in St. Louis '29).",
          blocks: [
            f({
              kind: "table",
              key: "d1.s.panel.bypanelist",
              label:
                "Notes by panelist \u2014 capture what each one actually said, not a summary:",
              rows: 3,
              addRows: true,
              columns: [
                { key: "panelist", label: "Panelist", type: "text" },
                { key: "practice", label: "Specific practice or system they described", type: "long" },
                { key: "evidence", label: "Proof it worked (result, story, number)", type: "long" },
                { key: "steal", label: "What I am stealing and when I start", type: "long" },
              ],
            }),
            f({
              kind: "table",
              key: "d1.s.panel.habits",
              label: "Habits top students named that I do not yet have:",
              rows: 3,
              addRows: true,
              columns: [
                { key: "habit", label: "Habit", type: "long" },
                { key: "start", label: "How I would start it", type: "long" },
              ],
            }),
            f({
              kind: "long",
              key: "d1.s.panel.question",
              label: "A question I still have for them:",
              rows: 2,
            }),
          ],
        },
        {
          id: "workshop",
          number: "3:35 PM",
          title: "Workshop: Your Back-to-School Reset",
          intro: "Led by Ms. Tatiana Poladko.",
          blocks: [
            f({
              kind: "long",
              key: "d1.s.workshop.notes",
              label: "Key ideas and frameworks from the workshop:",
              rows: 6,
            }),
            f({
              kind: "long",
              key: "d1.s.workshop.shift",
              label: "Something I now see differently about last year:",
              rows: 3,
            }),
          ],
        },
      ],
    },
    lab: {
      day: 1,
      section: "lab",
      eyebrow: "Blueprint Lab",
      title: "Build Section 1: My Reset Plan",
      subtitle:
        "Your pre-work is pulled in below. Refine it \u2014 do not retype it. This becomes the first section of your Blueprint.",
      parts: [
        {
          id: "carry",
          title: "Before you build this section",
          blocks: [
            {
              kind: "carry",
              title: "From your pre-work",
              from: [
                "d1.pw.strongest",
                "d1.pw.strongest.thisyear",
                "d1.pw.reset",
                "d1.pw.reset.table",
                "d1.pw.helped.continue",
                "d1.pw.hurt",
                "d1.pw.hurt.differently",
                "d1.pw.warnings.table",
                "d1.pw.start",
                "d1.pw.stop",
                "d1.pw.strengthen",
              ],
            },
          ],
        },
        {
          id: "habits",
          title: "Habits I Will Build and Break",
          blocks: [
            f({
              kind: "table",
              key: "d1.lab.build",
              label: "Habits I will build this year",
              prefillFrom: "d1.pw.start",
              rows: 3,
              addRows: true,
              columns: [
                { key: "action", label: "Habit to build", type: "long" },
                { key: "behaviors", label: "Guiding Behavior", type: "behaviors" },
                { key: "why", label: "How I will make it happen", type: "long" },
              ],
            }),
            f({
              kind: "table",
              key: "d1.lab.break",
              label: "Habits I will break this year",
              prefillFrom: "d1.pw.stop",
              rows: 3,
              addRows: true,
              columns: [
                { key: "action", label: "Habit to break", type: "long" },
                { key: "behaviors", label: "Guiding Behavior", type: "behaviors" },
                { key: "why", label: "What I will do instead", type: "long" },
              ],
            }),
          ],
        },
        {
          id: "derailers",
          title: "My Derailers and Early Alarms",
          blocks: [
            f({
              kind: "table",
              key: "d1.lab.derailers",
              label: "When I see this warning sign, here is my response plan",
              prefillFrom: "d1.pw.warnings.table",
              rows: 3,
              addRows: true,
              columns: [
                { key: "sign", label: "Warning Sign", type: "long" },
                { key: "usually", label: "What I Usually Do", type: "long" },
                { key: "instead", label: "My Response Plan", type: "long" },
              ],
            }),
          ],
        },
        {
          id: "support",
          title: "My Support People",
          blocks: [
            f({
              kind: "table",
              key: "d1.lab.support",
              label: "The people who will help me hold this plan",
              rows: 3,
              addRows: true,
              columns: [
                { key: "name", label: "Name", type: "text" },
                { key: "role", label: "Their role (teacher, parent, counselor, peer)", type: "text" },
                { key: "ask", label: "What I will ask them for", type: "long" },
              ],
            }),
          ],
        },
        {
          id: "first2weeks",
          title: "My First Two Weeks",
          blocks: [
            f({
              kind: "table",
              key: "d1.lab.first2weeks",
              label: "Commitments I will complete in the first two weeks of school",
              rows: 3,
              addRows: true,
              columns: [
                { key: "commitment", label: "Commitment", type: "long" },
                { key: "date", label: "Do it by (date)", type: "text" },
              ],
            }),
            {
              kind: "vault",
              title: "Go deeper in The Vault",
              text: "The Vault's Reset Playbook walks through how to protect a plan like this in the first month of school.",
              href: VAULT_VIDEOS.reset,
              cta: "Watch the Reset Playbook",
            },
          ],
        },
      ],
    },
    reflect: {
      day: 1,
      section: "reflect",
      eyebrow: "End-of-Day Analysis",
      title: "Monday Reflection",
      parts: [
        {
          id: "reflect",
          title: "Today's analysis",
          blocks: [
            f({
              kind: "long",
              key: "d1.r.insights",
              label: "Insights I gained today, and the evidence behind each one:",
              rows: 5,
            }),
            f({
              kind: "long",
              key: "d1.r.takeaways",
              label:
                "My takeaways \u2014 what I now know about how last year actually went and what it will take to run this year differently:",
              rows: 5,
            }),
            f({
              kind: "long",
              key: "d1.r.discomfort",
              label:
                "What today made uncomfortable, and what that discomfort is telling me to change:",
              rows: 4,
            }),
            f({
              kind: "long",
              key: "d1.r.commit",
              label: "My commitments before tomorrow \u2014 each with a first step and a time:",
              rows: 4,
            }),
            f({
              kind: "short",
              key: "d1.r.share",
              label: "Who I am telling about these commitments, and when:",
              placeholder: "Parent, counselor, teacher, or peer \u2014 with the date",
            }),
            {
              kind: "offer",
              id: "vault",
              placement: "d1.reflect",
            },
          ],
        },

      ],
    },
  },
};
