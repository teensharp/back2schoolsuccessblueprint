import { VAULT_VIDEOS } from "@/lib/brand";
import { f, type Day } from "./types";

const TEXTBOOK_SCRIPT =
  "\u201cWill we use a textbook in this class? Having a textbook is a critical condition for my success \u2014 I read ahead before lessons, and I use it to review after class. If we are not assigned one, is there a text in your classroom library or the book room I could borrow for the year? If not, what text would you recommend I get on my own so I can read ahead?\u201d";

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
        "Selective colleges read a transcript as a story about the choices you made. Before Tuesday's session, run the 4.0 Challenge on yourself, set up your teacher conversations, and gather the real facts of your academic record so you are working from evidence rather than memory.",
      parts: [
        {
          id: "p0",
          number: "Part 1",
          title: "The 4.0 Challenge Self-Evaluation",
          intro:
            "Answer Yes only if the statement is true for every subject you are currently taking. A Yes for two classes and a No for the third is a No. This is not a quiz you pass \u2014 it is the inventory that tells you exactly which systems you are missing.",
          blocks: [
            {
              kind: "note",
              text: "Every No you record becomes an item on your fix list, and your fix list carries into Tuesday's Blueprint Lab. Answer accurately and the plan builds itself. Answer generously and you will spend the year fixing the same problems.",
            },
            {
              kind: "group",
              letter: "1",
              title: "Learning Tools",
              definition:
                "You cannot read ahead, review, or work practice problems without the source material in your hands.",
              blocks: [
                f({
                  kind: "agree",
                  key: "d2.pw.eval.tools",
                  choices: ["Yes", "No"],
                  score: true,
                  bands: [
                    { min: 2, label: "Equipped", text: "You have the material and you use it before class. Protect this." },
                    { min: 1, label: "Half-equipped", text: "You own the tool and do not use it, or you use what you have and are missing texts. Close the gap this week." },
                    { min: 0, label: "Unequipped", text: "You are learning from class time alone. This is the first thing to fix \u2014 use the textbook script in Part 2." },
                  ],
                  statements: [
                    "I have a textbook for every class.",
                    "I read the textbook to prepare for every lesson, before the lesson.",
                  ],
                }),
              ],
            },
            {
              kind: "group",
              letter: "2",
              title: "Study Habits",
              definition:
                "What you do between classes decides your grade. Class time only shows you what to study.",
              blocks: [
                f({
                  kind: "agree",
                  key: "d2.pw.eval.habits",
                  choices: ["Yes", "No"],
                  score: true,
                  bands: [
                    { min: 3, label: "Systematic", text: "Your habits are built to produce A-level work. Now increase the difficulty of what you study." },
                    { min: 2, label: "Partially built", text: "You have real habits with a hole in them. Name the missing one and schedule it." },
                    { min: 0, label: "Reactive", text: "You are responding to assignments instead of running a system. Rebuild this in the Blueprint Lab." },
                  ],
                  statements: [
                    "I review my notes for accuracy and completeness before I start homework.",
                    "I regularly use outside sources \u2014 Khan Academy, IXL, or equivalent \u2014 to understand concepts I did not master in class.",
                    "I know exactly what I need to improve to earn an A in each class, and I have already started those steps.",
                  ],
                }),
              ],
            },
            {
              kind: "group",
              letter: "3",
              title: "Time Management",
              definition:
                "If it is not on a calendar, it does not exist. This category predicts your GPA better than talent does.",
              blocks: [
                f({
                  kind: "agree",
                  key: "d2.pw.eval.time",
                  choices: ["Yes", "No"],
                  score: true,
                  bands: [
                    { min: 3, label: "In control", text: "Your week is planned and your work lands on time. Hold this standard through November." },
                    { min: 2, label: "Uneven", text: "You plan sometimes. Sometimes is what produces the missing-assignment email in October." },
                    { min: 0, label: "Improvising", text: "You are running the year on memory and adrenaline. Wednesday's pre-work rebuilds your calendar from scratch." },
                  ],
                  statements: [
                    "I create or update a study schedule every week.",
                    "My study schedule includes extracurricular activities and weekends.",
                    
                    "Every assignment I have submitted was proofread and turned in on time.",
                  ],
                }),
              ],
            },
            {
              kind: "group",
              letter: "4",
              title: "Organization",
              definition:
                "Where and how you study determines how much of the hour actually counts as studying.",
              blocks: [
                f({
                  kind: "agree",
                  key: "d2.pw.eval.org",
                  choices: ["Yes", "No"],
                  score: true,
                  bands: [
                    { min: 4, label: "Set up to focus", text: "Your environment does the work for you. Keep it." },
                    { min: 2, label: "Leaking attention", text: "Some of your study hours are half-hours. Fix the environment before you add more time." },
                    { min: 0, label: "Studying in noise", text: "Your hours are not producing what they should. Change the setup this week." },
                  ],
                  statements: [
                    "I study without music playing or a screen running in the background.",
                    "I sit upright at a table or desk while studying.",
                    "I keep a separate binder or folder for every subject.",
                    "A parent, teacher, or mentor has reviewed my notes and confirmed they are legible and easy to use.",
                  ],
                }),
              ],
            },
            {
              kind: "group",
              letter: "5",
              title: "Teacher Relations",
              definition:
                "The adults closest to your work are the fastest route to a higher grade \u2014 and the people who will write about you later.",
              blocks: [
                f({
                  kind: "agree",
                  key: "d2.pw.eval.teachers",
                  choices: ["Yes", "No"],
                  score: true,
                  bands: [
                    { min: 4, label: "In partnership", text: "You are already treating teachers as collaborators. Part 2 makes it deliberate." },
                    { min: 2, label: "Occasional contact", text: "You reach out when something goes wrong. Move to a standing weekly rhythm." },
                    { min: 0, label: "Invisible", text: "Your teachers do not yet know what you are trying to do. Part 2 fixes this with actual meetings." },
                  ],
                  statements: [
                    "I use a planner or planning app every day.",
                    "I check with my teacher whenever I am unsure which assignments are due.",
                    "In my most challenging classes, I meet with the teacher weekly to review concepts and notes.",
                    "I contact TeenSHARP academic coaches or staff within 48 hours of receiving a grade below 85%.",
                    "I stay after school to review any assignment on which I received below an A.",
                  ],
                }),
              ],
            },
            {
              kind: "group",
              letter: "6",
              title: "Learning Supports",
              definition:
                "Asking for help early is a Striver move. Waiting until the grade is already low is not.",
              blocks: [
                f({
                  kind: "agree",
                  key: "d2.pw.eval.supports",
                  choices: ["Yes", "No"],
                  score: true,
                  bands: [
                    { min: 3, label: "Supported", text: "You have people around your learning. Use them before the next assessment, not after." },
                    { min: 1, label: "Under-supported", text: "You are carrying more of this alone than you need to. Recruit one person this week." },
                    { min: 0, label: "Isolated", text: "You are relying entirely on yourself. That is the most expensive way to earn a 4.0." },
                  ],
                  statements: [
                    "I have a tutor for every class where I do not currently have an A.",
                    "I have asked high-achieving students in my classes to study with me or explain material.",
                    "I have asked a TeenSHARP student who is strong in my weak subjects for help.",
                  ],
                }),
              ],
            },
            {
              kind: "subhead",
              text: "Your fix list",
            },
            {
              kind: "fixlist",
              title: "Everything I marked No",
              intro:
                "This is your working list. It carries into Tuesday's Blueprint Lab, where you will assign each item a first action and a date.",
              from: [
                "d2.pw.eval.tools",
                "d2.pw.eval.habits",
                "d2.pw.eval.time",
                "d2.pw.eval.org",
                "d2.pw.eval.teachers",
                "d2.pw.eval.supports",
              ],
            },
            f({
              kind: "long",
              key: "d2.pw.eval.learned",
              label:
                "What this evaluation showed me about how I have actually been operating \u2014 be specific about patterns, not feelings:",
              rows: 4,
            }),
            f({
              kind: "long",
              key: "d2.pw.eval.mindset",
              label:
                "Based on these answers, where does my work fall short of a whatever-it-takes standard, and where does it already meet it?",
              rows: 4,
            }),
            f({
              kind: "long",
              key: "d2.pw.eval.changes",
              label:
                "The changes I am making to my academic routine, and the exact days and times they will happen:",
              rows: 4,
            }),
            {
              kind: "offer",
              id: "vault",
              placement: "d2.pre-work.4.0-evaluation",
            },
            {
              kind: "subhead",
              text: "Summer Learning Symposium",
            },
            {
              kind: "note",
              text: "Complete the Summer Learning Symposium slide before Tuesday's session so you know what your peers presented and how their summer work connects to the academic record you are building.",
            },
            {
              kind: "video",
              label: "Summer Learning Symposium Slide",
              href: "https://forms.gle/SAjppcB2hn8x36mR8",
            },
          ],
        },
        {
          id: "p-teachers",
          number: "Part 2",
          title: "Jumpstart the Partnership With Every Teacher",
          intro:
            "Your teachers are partners in your learning journey. They are not there to merely give out grades (although yes, they do do that); they are there to help you discover answers to the questions you have and unlock new questions. They also can write letters of recommendation that can unlock opportunities for you. Your assignment: schedule and hold a conversation with every one of your teachers during Back-to-School Week.",
          blocks: [
            {
              kind: "principles",
              title: "The eleven questions",
              items: [
                {
                  title: "Know who is teaching you",
                  text: "1. What is your educational background? 2. Why do you enjoy teaching? Ask these first \u2014 they change the temperature of the whole conversation.",
                },
                {
                  title: "Learn the standard",
                  text: "3. What expectations do you have of your students? 4. What is your top student like? Write the answer to question 4 down word for word: it is the rubric for how you will show up in that room.",
                },
                {
                  title: "Understand the workload",
                  text: "5. How much should we study each day? 6. What types of assessments do you assign, and what is the best way to prepare for them? 7. Do you have examples of A-level work on projects, papers, or essays?",
                  example:
                    "Ask for the A-level example in writing or a copy you can keep. You cannot hit a standard you have never seen.",
                },
                {
                  title: "Agree on the feedback loop",
                  text: "8. What is the best way to reach you? 9. Can you provide regular feedback on my performance and assignments? 10. Can we set a time for a regular check-in?",
                  example:
                    "Leave the conversation with a day and time for the check-in, not a vague yes.",
                },
                {
                  title: "Secure the textbook \u2014 question 11",
                  text: "Every class needs a text you can read ahead in. If the class does not assign one, use this script:",
                  example: TEXTBOOK_SCRIPT,
                },
              ],
            },
            {
              kind: "note",
              text: "If a teacher says there is no textbook and none to lend, ask for a recommended title, then bring that title to your TeenSHARP advisor and to The Vault community \u2014 someone may have a copy.",
            },
            f({
              kind: "table",
              key: "d2.pw.meetings",
              label: "My teacher conversations \u2014 scheduled during Back-to-School Week",
              rows: 6,
              addRows: true,
              columns: [
                { key: "teacher", label: "Teacher", type: "text" },
                { key: "subject", label: "Subject", type: "text" },
                { key: "date", label: "Meeting date", type: "date" },
                { key: "time", label: "Time", type: "text" },
                { key: "confirmed", label: "Confirmed", type: "check" },
              ],
            }),
            {
              kind: "note",
              text: "Confirmed meetings with a date export to your calendar from the Blueprint page, so you cannot forget one.",
            },
            f({
              kind: "table",
              key: "d2.pw.conversations",
              label: "Conversation log \u2014 fill this in right after each meeting",
              rows: 4,
              addRows: true,
              columns: [
                { key: "teacher", label: "Teacher", type: "text" },
                { key: "top", label: "Their description of a top student, in their words", type: "long" },
                { key: "prep", label: "How they said to prepare for assessments", type: "long" },
                { key: "textbook", label: "Textbook answer and what I secured", type: "long" },
                { key: "checkin", label: "Our standing check-in (day and time)", type: "text" },
              ],
            }),
            f({
              kind: "long",
              key: "d2.pw.conversations.pattern",
              label:
                "Across these conversations, what did teachers agree on about what strong students do \u2014 and where does my current practice fall short of it?",
              rows: 4,
            }),
          ],
        },
        {
          id: "p1",
          number: "Part 3",
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
          number: "Part 4",
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
          number: "Part 5",
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
          number: "Part 6",
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
              text: "Aja explains why she chose the harder course load and how she carried it — useful before you defend your own roadmap.",
              href: VAULT_VIDEOS.aja.href,
              cta: `Watch: ${VAULT_VIDEOS.aja.title}`,
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
          id: "recap",
          title: "From the TeenSHARP team",
          blocks: [{ kind: "recap", day: 2 }],
        },
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
              label: "Insights I gained that I did not walk in with:",
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
              label: "The equivalent hard choices in front of me right now:",
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
              label: "The study habits I am replacing, and exactly what replaces them:",
              rows: 4,
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
          title: "Before you build this section",
          blocks: [
            {
              kind: "carry",
              title: "From your pre-work and session notes",
              from: [
                "d2.pw.rigor",
                "d2.pw.rigor.why",
                "d2.pw.strategies.hardest",
                "d2.pw.time",
                "d2.pw.teachers.gap",
                "d2.pw.conversations.pattern",
                "d2.s.science.replace",
                "d2.pw.eval.learned",
                "d2.pw.eval.changes",
              ],
            },
          ],
        },
        {
          id: "fix",
          title: "My 4.0 Fix List",
          intro:
            "Every No from your self-evaluation, turned into work with an owner and a date. Nothing on this list stays vague.",
          blocks: [
            {
              kind: "fixlist",
              title: "What I marked No on the 4.0 Challenge",
              from: [
                "d2.pw.eval.tools",
                "d2.pw.eval.habits",
                "d2.pw.eval.time",
                "d2.pw.eval.org",
                "d2.pw.eval.teachers",
                "d2.pw.eval.supports",
              ],
            },
            f({
              kind: "table",
              key: "d2.lab.fixplan",
              label: "My fix plan",
              rows: 5,
              addRows: true,
              columns: [
                { key: "item", label: "What I marked No", type: "long" },
                { key: "action", label: "The specific action that turns it to Yes", type: "long" },
                { key: "who", label: "Who I need", type: "text" },
                { key: "date", label: "By when", type: "date" },
              ],
            }),
            f({
              kind: "long",
              key: "d2.lab.fixplan.hardest",
              label:
                "Which of these fixes will be hardest for me to sustain past week three, and what makes it survive anyway?",
              rows: 3,
            }),
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
          title: "Teacher Partnership Plan",
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
            f({
              kind: "long",
              key: "d2.lab.textbooks",
              label:
                "Textbook status by class \u2014 which ones I secured, which are still open, and my next move on each:",
              prefillFrom: "d2.pw.conversations.pattern",
              rows: 4,
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
              kind: "offer",
              id: "strategy-session",
              placement: "d2.lab.roadmap",
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
          title: "Today's analysis",
          blocks: [
            f({
              kind: "long",
              key: "d2.r.insights",
              label: "Insights I gained today, and the evidence behind each one:",
              rows: 5,
            }),
            f({
              kind: "long",
              key: "d2.r.takeaways",
              label: "My takeaways \u2014 what I now know about my own academic operation that I did not know this morning:",
              rows: 5,
            }),
            f({
              kind: "long",
              key: "d2.r.discomfort",
              label:
                "What today made uncomfortable, and what that discomfort is telling me to change:",
              rows: 4,
            }),
            f({
              kind: "long",
              key: "d2.r.commit",
              label: "My commitments before tomorrow \u2014 each with a time and a first step:",
              rows: 4,
            }),
            f({
              kind: "short",
              key: "d2.r.share",
              label: "Who I am telling about these commitments, and when:",
              placeholder: "Parent, counselor, teacher, or peer \u2014 with the date",
            }),
          ],
        },
      ],
    },
  },
};
