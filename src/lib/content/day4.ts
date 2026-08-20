import { VAULT_VIDEOS } from "@/lib/brand";
import { PROGRAM_CATALOG } from "./programs";
import { f, type Block, type Day } from "./types";
import nsliyWorksheet from "@/assets/nsliy/TeenSHARP_NSLI-Y_Application_Guided_Worksheet.pdf.asset.json";
import nsliyHome from "@/assets/nsliy/1-3.png.asset.json";
import nsliyHelpful from "@/assets/nsliy/2.png.asset.json";
import nsliyRequirements from "@/assets/nsliy/4.png.asset.json";
import nsliyDates from "@/assets/nsliy/5.png.asset.json";
import nsliyComponents from "@/assets/nsliy/6.png.asset.json";
import nsliyImpact from "@/assets/nsliy/7.png.asset.json";

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
              text: "Rafael walks through how he managed an intense senior year of applications and deadlines.",
              href: VAULT_VIDEOS.rafael.href,
              cta: `Watch: ${VAULT_VIDEOS.rafael.title}`,
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
              ],
            }),
          ],
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
          id: "workshop",
          number: "3:05 PM",
          title: "Workshop: The Making of an Applier",
          intro: "Led by Alina de Zoysa, TeenSHARP Pre-College Program Coordinator and Alumna '21.",
          blocks: [
            {
              kind: "resource",
              label: "NSLI-Y Application Guided Worksheet",
              text: "The full worksheet is built into this page below \u2014 work it here and everything saves automatically. Use this download only if you want a paper copy.",
              href: nsliyWorksheet.url,
              cta: "Download the PDF copy",
            },
            {
              kind: "prose",
              text: "Breakout-room goal: understand the opportunity, identify every requirement, and leave with a realistic application plan.",
            },

            {
              kind: "subhead",
              text: "Part 1: Research the Opportunity (10 minutes)",
            },
            {
              kind: "note",
              text: "Program snapshot: The National Security Language Initiative for Youth (NSLI-Y) is a merit-based scholarship program for U.S. high school students who want to study languages considered important to U.S. national security and economic competitiveness. Participants take part in immersive summer or academic-year programs abroad, where they study their target language, live with host families for all or part of the program, engage with local communities, and participate in cultural activities.",
            },
            {
              kind: "prose",
              text: "Step 1 (2 min): Start your research at the NSLI-Y home page \u2014 that is where you should start for every opportunity you apply to. Begin by making sure you are eligible. Even if you are not currently eligible, doing this activity builds your experience navigating the application process for a competitive summer program. First, click the \u201cEligibility\u201d tab.",
            },
            {
              kind: "image",
              src: nsliyHome.url,
              alt: "NSLI-Y homepage with the Eligibility button highlighted",
              caption: "Click \u201cEligibility\u201d on the NSLI-Y home page.",
            },
            {
              kind: "prose",
              text: "On the eligibility page, pay specific attention to the \u201cSummer & Academic Year Abroad\u201d requirements, then answer the following questions.",
            },
            f({
              kind: "long",
              key: "d4.s.nsliy.q1",
              label: "1. What are the main eligibility requirements for this program?",
              rows: 4,
            }),
            f({
              kind: "long",
              key: "d4.s.nsliy.q2",
              label:
                "2. Are you eligible for the Summer 2027 cohort of NSLI-Y? Explain which requirements you meet and which you do not.",
              rows: 3,
            }),
            {
              kind: "prose",
              text: "Return to the home page and answer the following question.",
            },
            f({
              kind: "long",
              key: "d4.s.nsliy.q3",
              label: "3. In your own words, what are NSLI-Y's main goals?",
              rows: 3,
            }),
            {
              kind: "prose",
              text: "Step 2 (1 min): Scroll down to the \u201cHelpful Information\u201d section of the home page.",
            },
            {
              kind: "image",
              src: nsliyHelpful.url,
              alt: "The Helpful Information grid on the NSLI-Y site",
              caption:
                "The Helpful Information grid is the map of the entire application \u2014 every page you visit next is one of these tiles.",
            },
            {
              kind: "prose",
              text: "Step 3 (2 min): You have already explored the eligibility page. Now move on to the \u201cParticipation Requirements\u201d page.",
            },
            {
              kind: "image",
              src: nsliyRequirements.url,
              alt: "Participation Requirements tile highlighted",
              caption: "Open \u201cParticipation Requirements.\u201d",
            },
            {
              kind: "prose",
              text: "Briefly read the \u201cParticipant Expectations\u201d section at the top of that page, then answer the following question.",
            },
            f({
              kind: "long",
              key: "d4.s.nsliy.q4",
              label: "4. What type of skills is NSLI-Y looking for a participant to possess?",
              rows: 3,
            }),
            {
              kind: "prose",
              text: "Step 4 (1 min): Go back to the home page, then click the \u201cDates & Deadlines\u201d page.",
            },
            {
              kind: "image",
              src: nsliyDates.url,
              alt: "Dates and Deadlines tile highlighted",
              caption: "Open \u201cDates & Deadlines.\u201d",
            },
            {
              kind: "note",
              text: "The dates still reflect the Summer 2026 and Academic Year 2026-27 timeline. NSLI-Y has not posted the Summer 2027 timeline yet, but the dates will be very similar. Use last year's dates as your guide, and answer the questions below based on the Summer 2026 timeline.",
            },
            f({
              kind: "short",
              key: "d4.s.nsliy.q5",
              label: "5. When was the Summer 2026 application due?",
            }),
            f({
              kind: "short",
              key: "d4.s.nsliy.q6",
              label: "6. When was the recommendation and legal guardian statement due?",
            }),
            f({
              kind: "short",
              key: "d4.s.nsliy.q7",
              label: "7. When were semifinalists notified?",
            }),
            {
              kind: "prose",
              text: "Step 5 (2 min): Return to the home page and click the \u201cApplication Components\u201d page.",
            },
            {
              kind: "image",
              src: nsliyComponents.url,
              alt: "Application Components tile highlighted",
              caption: "Open \u201cApplication Components.\u201d",
            },
            f({
              kind: "long",
              key: "d4.s.nsliy.q8",
              label:
                "8. What applicant information will NSLI-Y collect within the first part of the application?",
              rows: 3,
            }),
            f({
              kind: "long",
              key: "d4.s.nsliy.q9",
              label:
                "9. What are the three written portions of the application that need to be completed?",
              rows: 3,
            }),
            f({
              kind: "long",
              key: "d4.s.nsliy.q10",
              label: "10. What documents will you need to upload to complete your application?",
              rows: 3,
            }),
            f({
              kind: "long",
              key: "d4.s.nsliy.q11",
              label:
                "11. You will need two pieces of supplemental information: a recommendation and a legal guardian statement. What are the requirements for your recommender?",
              rows: 3,
            }),
            {
              kind: "prose",
              text: "Step 6 (3 min): You now know whether you are eligible, what the participation requirements are, what the application components are, and when everything is due. Now learn about the program itself. Return to the home page and click the \u201cImpact\u201d tab. Your research on the program should show up directly in your essays \u2014 they must demonstrate that you are ready to fully participate in NSLI-Y.",
            },
            {
              kind: "image",
              src: nsliyImpact.url,
              alt: "NSLI-Y homepage with the Impact button highlighted",
              caption: "Open the \u201cImpact\u201d tab.",
            },
            f({
              kind: "long",
              key: "d4.s.nsliy.q12",
              label:
                "12. Name two things about NSLI-Y that would make this opportunity valuable or interesting to you.",
              rows: 4,
            }),
            f({
              kind: "long",
              key: "d4.s.nsliy.q13",
              label:
                "13. What qualities do you think NSLI-Y is looking for in a strong applicant? What evidence makes you think that?",
              rows: 4,
            }),

            {
              kind: "subhead",
              text: "Part 2: Plan Your Application Timeline (6 minutes)",
            },
            {
              kind: "prose",
              text: "How long does this application really take? Here is TeenSHARP's honest estimate for each step:",
            },
            {
              kind: "prose",
              text: "Read the NSLI-Y website and confirm you are eligible \u2014 20-30 min\nRead the full application from top to bottom \u2014 5-10 min\nGather your background, experience, and program/language preferences for the \u201capplicant information\u201d section \u2014 10 min\nIdentify and ask permission from one recommender (ask in person, then email follow-up) \u2014 10-15 min plus wait time\nComplete and send your Brag Sheet to your recommender \u2014 30-60 min\nBrainstorm the three written responses \u2014 15-20 min each\nWrite first drafts \u2014 30-40 min each; about 2.5-3 hrs total\nGet feedback, then revise and proofread \u2014 about 2 weeks\nComplete the final application, submit, and save the confirmation \u2014 30 min",
            },
            f({
              kind: "short",
              key: "d4.s.nsliy.underestimated",
              label: "Which step did you underestimate most?",
            }),
            f({
              kind: "table",
              key: "d4.s.nsliy.recommenders",
              label: "Identifying recommenders",
              rows: 2,
              addRows: true,
              columns: [
                { key: "contact", label: "Contact", type: "text" },
                { key: "why", label: "Why this person is a strong contact", type: "long" },
                { key: "ask", label: "When will you ask permission?", type: "date" },
              ],
            }),
            {
              kind: "prose",
              text: "Work backwards to identify your next steps:",
            },
            f({
              kind: "table",
              key: "d4.s.nsliy.backward",
              label: "My backward calendar for this application",
              rows: 1,
              columns: [
                { key: "official", label: "Official deadline", type: "date" },
                { key: "personal", label: "My personal deadline", type: "date" },
                { key: "feedback", label: "Feedback complete by", type: "date" },
                { key: "draft", label: "First draft complete by", type: "date" },
                { key: "recommender", label: "Recommender asked by", type: "date" },
                { key: "start", label: "I will start on", type: "date" },
              ],
            }),
            {
              kind: "note",
              text: "Application Ninja takeaway: a strong application is not one big task. It is a sequence \u2014 preliminary research, then an application timeline plan, then gathering information, then drafting, then feedback, then submission.",
            },

            {
              kind: "subhead",
              text: "Part 3: Writing Strong Essays",
            },
            {
              kind: "prose",
              text: "Read the two essay examples below. Both answer the same prompt. After reading the prompt and both examples, respond to the questions. We will discuss your answers during the session.",
            },
            {
              kind: "note",
              text: "Essay prompt: You may be hosted by a family, and just as you are curious about your host family, school, and instructors, they will be curious about you. Here is a chance to tell them about yourself in a letter. Address the questions below in your letter to communicate who you are and your motivation for applying to the program.",
            },
            {
              kind: "prose",
              text: "Strong essay example:",
            },
            {
              kind: "prose",
              text: "Dear Host Family,\n\n\u60a8\u597d! or \uc548\ub155\ud558\uc2ed\ub2c8\uae4c! I am [Student Name], a 15-year-old from [City, State], and I can already picture myself at your dinner table, learning how to use chopsticks while eating cultural dishes and laughing with you.\n\nMy friends say I bring new ideas to every hangout and make sure no one feels left out. Last week, I invited my friends to a dumpling restaurant where everything is handmade. By the end of the night, we laughed, shared stories, and befriended the owner. That is me, turning simple moments into memories.\n\nI thrive when learning new things. While learning Spanish, I stumbled, mixing tenses and making classmates giggle, but I didn't quit. I practiced daily with language apps, rewatched my favorite shows in Spanish, and spoke with native speakers whenever I could. As I improved, I realized others might struggle too, so I started tutoring to help them through the early stages. Now I'm nearly fluent in Spanish and have even dabbled in Japanese. Each language shows how words bridge people and cultures.\n\nMy dream careers are in international relations and teaching. Living with you means having conversations where we share our perspectives and learn from one another's backgrounds. That kind of exchange strengthens global awareness and teaching skills.\n\nI sincerely appreciate your openness in welcoming me and sharing your culture. Your generosity allows me to grow, learn, and connect in ways I will carry forever. I am truly grateful for this opportunity.\n\nI cannot wait to meet you and create lifelong memories together.\n\n\uc548\ub155\ud788 \uacc4\uc138\uc694! or \u518d\u89c1!\nSincerely,\n[Student Name]",
            },
            f({
              kind: "long",
              key: "d4.s.nsliy.essay.strong",
              label: "1. Why do you think this would be considered a strong essay example?",
              rows: 4,
            }),
            {
              kind: "prose",
              text: "Work-in-progress example:",
            },
            {
              kind: "prose",
              text: "Hi, my name is [Student Name]. I am a 10th grader at [High School Name] in [City, State]. I think that the people close to me would say that I am a very calm person. I think that I stay to myself for the most part and don't get caught up in it too much. I am friendly and approachable. I don't try to mean mug people, I try to look approachable and not scary because that's just who I am. I also would think people would say I am smart because of how I apply myself in school, how I can answer questions correctly and ask for help and help others who don't understand. My relationship with my family is that we are all together but separate. We all understand each other and we love each other but the way we do things is different. In my family I have to be a student, a teacher, and an athlete. I am a student when I am doing my assignments and going to school learning from a teacher, I am a teacher and older brother to my younger sisters. I have to teach them different stuff when we study together when they don't understand... Everybody likes being around me and I have a certain maturity that allows people to trust me more than other people. To me what is important is making it to a good college and playing basketball at the highest level... I know what colleges I am thinking of going to but it might take me a little longer until I know what my 1A option will be.",
            },
            f({
              kind: "long",
              key: "d4.s.nsliy.essay.wip",
              label:
                "2. Why do you think this would be considered an essay that is still a work in progress?",
              rows: 4,
            }),
            f({
              kind: "long",
              key: "d4.s.nsliy.essay.advice",
              label: "3. What advice would you give this student to make this essay stronger?",
              rows: 4,
            }),

            {
              kind: "subhead",
              text: "Closing reflection",
            },
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
