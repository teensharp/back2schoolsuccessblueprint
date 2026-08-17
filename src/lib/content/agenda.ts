export type AgendaItem = {
  time: string;
  title: string;
  detail?: string;
  by?: string;
  kind?: "break" | "lab" | "session";
};

export type AgendaDay = {
  day: number;
  date: string;
  weekday: string;
  title: string;
  coreQuestion: string;
  items: AgendaItem[];
};

export const AGENDA_NOTE = "All times indicated in the agenda are Eastern Standard Time.";

export const AGENDA: AgendaDay[] = [
  {
    day: 1,
    date: "August 17, 2026",
    weekday: "Monday",
    title: "Back-to-School Reset",
    coreQuestion:
      "What do I need to start, stop, and strengthen to become a stronger student this year?",
    items: [
      {
        time: "2:00 PM",
        title: "Back-to-School Success Week Kick Off",
        detail: "Keynote: Dr. Dan Porterfield, CEO, Jack Kent Cooke Foundation",
        by: "Ms. Tatiana Poladko, TeenSHARP Co-Founder and Chief Program Officer",
        kind: "session",
      },
      {
        time: "2:40 PM",
        title: "What Top Students Do Differently",
        detail:
          "A panel conversation with Arely Reyes, TeenSHARP '25, Amherst College '29; Aanyae Anderson, TeenSHARP '25, Wake Forest University '29; and Justin Dorce, TeenSHARP '25, Washington University in St. Louis '29",
        by: "Ms. Sara Petty",
        kind: "session",
      },
      { time: "3:30 PM", title: "Break", kind: "break" },
      {
        time: "3:35 PM",
        title: "Workshop: Your Back-to-School Reset",
        by: "Ms. Tatiana Poladko",
        kind: "session",
      },
      { time: "4:30 PM", title: "Blueprint Lab", kind: "lab" },
    ],
  },
  {
    day: 2,
    date: "August 18, 2026",
    weekday: "Tuesday",
    title: "The College-Ready Roadmap",
    coreQuestion:
      "How will my courses, grades, learning habits, and teacher relationships show I am ready for selective colleges?",
    items: [
      {
        time: "2:00 PM",
        title: "What Academic Readiness Really Looks Like",
        detail: "A Conversation with College Admission Officers. Speaker: Kate Heekin, Williams College",
        by: "Ms. Sara Petty",
        kind: "session",
      },
      {
        time: "2:45 PM",
        title: "Choosing Challenge: A Student Story of Academic Growth",
        detail:
          "Speaker: Ana Paula Rodriguez Vazquez, TeenSHARP alumna '24, Boston University '29",
        by: "Ms. Sara Petty",
        kind: "session",
      },
      { time: "3:15 PM", title: "Break", kind: "break" },
      {
        time: "3:20 PM",
        title: "Workshop: The Science of Learning",
        by: "Ms. Tatiana Poladko",
        kind: "session",
      },
      { time: "4:30 PM", title: "Blueprint Lab", kind: "lab" },
    ],
  },
  {
    day: 3,
    date: "August 19, 2026",
    weekday: "Wednesday",
    title: "The Leadership Playbook",
    coreQuestion:
      "How will I lead, serve, contribute, and build a meaningful track record this year?",
    items: [
      {
        time: "2:00 PM",
        title: "Wednesday Progress Check",
        detail: "Ask questions / share insights",
        by: "Ms. Tatiana Poladko & Ms. Sara Petty",
        kind: "session",
      },
      {
        time: "2:30 PM",
        title: "More Than a Student: Becoming a Leader in Your School and Community",
        detail:
          "A panel discussion with Matias Moreno, Benjamin Franklin HS (PA); Caitlyn Grimes, Lawrence HS (NJ); Rafael Farrera-Juarez, TeenSHARP Alumnus '26, Harvard University '30",
        by: "Ms. Sara Petty",
        kind: "session",
      },
      { time: "3:30 PM", title: "Break", kind: "break" },
      {
        time: "3:35 PM",
        title: "Workshop: The Leadership Playbook",
        by: "Ms. Tatiana Poladko",
        kind: "session",
      },
      { time: "4:30 PM", title: "Blueprint Lab", kind: "lab" },
      {
        time: "6:00 PM",
        title: 'Parent Workshop: "Parent Like an Olympic Coach"',
        by: "Ms. Deborah Yanez, TeenSHARP Senior Manager of Parent Programs",
        kind: "session",
      },
    ],
  },
  {
    day: 4,
    date: "August 20, 2026",
    weekday: "Thursday",
    title: "The Opportunity Blueprint",
    coreQuestion:
      "How will I take advantage of out-of-school opportunities to learn, explore, and grow?",
    items: [
      {
        time: "2:00 PM",
        title: "Summer Learning Symposium",
        detail: "Student presentations and reflections from the summer.",
        kind: "session",
      },
      { time: "3:00 PM", title: "Break", kind: "break" },
      {
        time: "3:05 PM",
        title: "Workshop: The Making of an Applier",
        by: "Alina de Zoysa, TeenSHARP Pre-College Program Coordinator and TeenSHARP Alumna '21",
        kind: "session",
      },
      { time: "4:00 PM", title: "Blueprint Lab and Final Reflections", kind: "lab" },
    ],
  },
];
