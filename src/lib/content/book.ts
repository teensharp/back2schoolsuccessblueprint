import { day1 } from "./day1";
import { day2 } from "./day2";
import { day3 } from "./day3";
import { day4 } from "./day4";
import { pageFields, type Day, type Field, type Page, type SectionId } from "./types";

export const DAYS: Day[] = [day1, day2, day3, day4];

export const SECTION_ORDER: SectionId[] = ["pre-work", "session", "lab", "reflect"];

export const SECTION_LABELS: Record<SectionId, string> = {
  "pre-work": "Pre-Work",
  session: "Live Session Notes",
  lab: "Blueprint Lab",
  reflect: "End-of-Day Analysis",
};

export const BOOK_TITLE = "My Back-to-School Blueprint";
export const BOOK_SUBTITLE =
  "A Personalized Roadmap to Excel Academically, Grow Intellectually, Lead Purposefully, and Pursue Elite Opportunities";
export const PROGRAM_NAME = "TeenSHARP Bridge Week 2026";
export const PROGRAM_DATES = "August 17\u201320, 2026";

export function getDay(day: number): Day | undefined {
  return DAYS.find((d) => d.day === day);
}

export function getPage(day: number, section: string): Page | undefined {
  const d = getDay(day);
  if (!d) return undefined;
  if (!SECTION_ORDER.includes(section as SectionId)) return undefined;
  return d.pages[section as SectionId];
}

/** Every field key in the book, grouped by day+section. */
export function allSectionKeys(): { day: number; section: SectionId; keys: string[] }[] {
  return DAYS.flatMap((d) =>
    SECTION_ORDER.map((s) => ({
      day: d.day,
      section: s,
      keys: pageFields(d.pages[s]).map((field) => field.key),
    })),
  );
}

export function sectionKeys(day: number, section: SectionId): string[] {
  const page = getPage(day, section);
  return page ? pageFields(page).map((field) => field.key) : [];
}

/** Flat ordered list of every page in the book, for prev/next navigation. */
export function bookOrder(): { day: number; section: SectionId }[] {
  return DAYS.flatMap((d) => SECTION_ORDER.map((s) => ({ day: d.day, section: s })));
}

/** Finds a field anywhere in the book by its storage key. */
export function findField(key: string): Field | undefined {
  for (const d of DAYS) {
    for (const s of SECTION_ORDER) {
      const found = pageFields(d.pages[s]).find((f) => f.key === key);
      if (found) return found;
    }
  }
  return undefined;
}
