import { VAULT_HOME } from "@/lib/brand";

/**
 * "Your Next Step" offers — the TeenSHARP family product ladder, surfaced
 * contextually inside the book. Copy lives here so staff can retune wording,
 * pricing, and links without touching layout.
 *
 * Grade routing: an offer shows only when the student's grade is in `grades`
 * (empty means every grade). Grades are matched against the raw profile value,
 * so "11", "11th", and "Grade 11" all resolve.
 */

export type Offer = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  price: string;
  cta: string;
  href: string;
  /** Grade numbers this offer is meant for. Empty = all grades. */
  grades: number[];
  tone?: "vault" | "forest";
};

export const OFFERS: Offer[] = [
  {
    id: "vault",
    eyebrow: "Your next step",
    title: "The Vault",
    body: "Back-to-School Success Week ends Thursday. The Vault is where this blueprint keeps moving: on-demand workshops, deadline drops, and a community that asks how the plan is going.",
    bullets: [
      "Full library of academic and college-readiness workshops",
      "Monthly live Q&A with the TeenSHARP team",
      "Opportunity and scholarship deadline alerts",
    ],
    price: "$79 / year",
    cta: "Join The Vault",
    href: VAULT_HOME,
    grades: [],
    tone: "vault",
  },
  {
    id: "strategy-session",
    eyebrow: "Want a second set of eyes?",
    title: "Family Strategy Session",
    body: "A 90-minute working session with a TeenSHARP advisor to pressure-test the plan you just built \u2014 course rigor, testing timeline, and the summer you should be aiming for.",
    bullets: [
      "Review of your transcript and course trajectory",
      "A prioritized action list for this school year",
      "Written follow-up your family can hold you to",
    ],
    price: "$249",
    cta: "Book a strategy session",
    href: "https://teensharp.org/advising",
    grades: [9, 10, 11],
    tone: "forest",
  },
  {
    id: "junior-advising",
    eyebrow: "Junior year is the year",
    title: "Junior Year College Advising",
    body: "Year-long advising built around the roadmap in this blueprint: college list, testing plan, summer applications, and the relationships that produce strong recommendations.",
    bullets: [
      "College list built to your academic profile and aid needs",
      "Summer program and scholarship application support",
      "Essay foundation work before senior year starts",
    ],
    price: "From $1,500",
    cta: "See junior advising",
    href: "https://teensharp.org/advising",
    grades: [11],
    tone: "forest",
  },
  {
    id: "senior-advising",
    eyebrow: "Senior year, done right",
    title: "Senior Year Application Advising",
    body: "Full-service support through every application: essays, financial aid, interviews, and the decision itself \u2014 so the work you did this week turns into offers.",
    bullets: [
      "Unlimited essay review and revision",
      "Financial aid and scholarship strategy",
      "Interview prep and final decision support",
    ],
    price: "From $4,500",
    cta: "See senior advising",
    href: "https://teensharp.org/advising",
    grades: [12],
    tone: "forest",
  },
];

/** Pulls the first grade number out of values like "11", "11th", "Grade 11". */
export function parseGrade(grade: string | null | undefined): number | null {
  if (!grade) return null;
  const match = /\d{1,2}/.exec(grade);
  if (!match) return null;
  const n = Number(match[0]);
  return n >= 6 && n <= 12 ? n : null;
}

export function offerFor(id: string, grade: string | null | undefined): Offer | null {
  const offer = OFFERS.find((o) => o.id === id);
  if (!offer) return null;
  if (offer.grades.length === 0) return offer;
  const g = parseGrade(grade);
  // Unknown grade still sees advising offers; better to show than to hide.
  if (g === null) return offer;
  return offer.grades.includes(g) ? offer : null;
}
