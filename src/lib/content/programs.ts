/**
 * Summer enrichment catalog students choose from on Day 4.
 * Grouped by interest area; each entry notes the grades it serves.
 * Staff can extend this list without touching layout.
 */

export type Program = {
  name: string;
  grades: string;
  note: string;
};

export type ProgramGroup = {
  area: string;
  programs: Program[];
};

export const PROGRAM_CATALOG: ProgramGroup[] = [
  {
    area: "STEM, Research, and Engineering",
    programs: [
      { name: "MIT MITES / MOSTEC", grades: "11", note: "Free STEM program for students from underrepresented backgrounds. Deadline typically early February." },
      { name: "Research Science Institute (RSI)", grades: "11", note: "Free, highly selective research program at MIT. Deadline typically mid-January." },
      { name: "Simons Summer Research Program", grades: "11", note: "Paid mentored research at Stony Brook. Deadline typically early February." },
      { name: "Garcia Summer Research Program", grades: "10\u201311", note: "Polymer research at Stony Brook. Deadline typically February." },
      { name: "NIH / NCI Summer Internship Program", grades: "10\u201312", note: "Paid biomedical research internships. Deadline typically early March." },
      { name: "Girls Who Code Summer Immersion", grades: "9\u201311", note: "Free virtual computer science program. Deadline typically March." },
      { name: "Carnegie Mellon SAMS", grades: "10\u201311", note: "Free STEM scholars program. Deadline typically March." },
      { name: "Clark Scholars Program (Texas Tech)", grades: "11", note: "Paid seven-week research program. Deadline typically February." },
    ],
  },
  {
    area: "Humanities, Writing, and the Arts",
    programs: [
      { name: "Telluride Association Summer Seminar (TASS)", grades: "10\u201311", note: "Free, intensive humanities seminar. Deadline typically early January." },
      { name: "Iowa Young Writers' Studio", grades: "10\u201312", note: "Creative writing; need-based aid available. Deadline typically February." },
      { name: "Kenyon Review Young Writers", grades: "10\u201312", note: "Selective writing workshop. Deadline typically February." },
      { name: "Interlochen Arts Camp", grades: "9\u201312", note: "Music, theatre, visual arts; scholarships available. Rolling with priority deadlines." },
      { name: "Sewanee Young Writers' Conference", grades: "10\u201312", note: "Writing intensive with aid. Deadline typically March." },
    ],
  },
  {
    area: "Business, Economics, and Entrepreneurship",
    programs: [
      { name: "LEDA Career Institute", grades: "11", note: "Free leadership and college prep for high-achieving students. Deadline typically January." },
      { name: "Bank of America Student Leaders", grades: "11\u201312", note: "Paid nonprofit internship plus leadership summit. Deadline typically January." },
      { name: "Wharton Global Youth (Leadership in the Business World)", grades: "11", note: "Financial aid available. Deadline typically February." },
      { name: "Management and Technology Summer Institute (Penn)", grades: "10\u201312", note: "Business and engineering. Deadline typically February." },
    ],
  },
  {
    area: "Public Service, Law, and Government",
    programs: [
      { name: "U.S. Senate Page Program", grades: "11", note: "Paid semester program in Washington. Deadlines vary by senator." },
      { name: "Junior State of America Summer School", grades: "9\u201312", note: "Government and debate; aid available. Deadline typically spring." },
      { name: "Princeton Summer Journalism Program", grades: "11", note: "Free journalism program for low-income students. Deadline typically February." },
      { name: "Anytown / NCCJ Leadership Institutes", grades: "9\u201312", note: "Regional social justice leadership programs. Deadlines vary by region." },
    ],
  },
  {
    area: "Health, Medicine, and Public Health",
    programs: [
      { name: "Stanford Medical Youth Science Program", grades: "10\u201311", note: "Free residential program for low-income students. Deadline typically March." },
      { name: "Summer Health Professions Education Program (SHPEP)", grades: "College", note: "Know it now, apply later \u2014 map the path to it." },
      { name: "Local hospital volunteer and shadow programs", grades: "9\u201312", note: "Apply through your regional hospital system; deadlines are often spring." },
    ],
  },
  {
    area: "College Access and Scholars Programs",
    programs: [
      { name: "QuestBridge College Prep Scholars", grades: "11", note: "Free; opens the door to the National College Match. Deadline typically late March." },
      { name: "Coca-Cola Scholars", grades: "12", note: "National scholarship. Deadline typically late September." },
      { name: "Jack Kent Cooke Young Scholars", grades: "8", note: "Know the timeline so younger siblings do not miss it." },
      { name: "TeenSHARP College Prep Programs", grades: "9\u201312", note: "Ask your advisor which track fits your year." },
    ],
  },
];
