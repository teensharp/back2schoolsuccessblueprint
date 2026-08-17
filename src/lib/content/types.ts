/**
 * Content schema for the fillable book.
 *
 * Every question lives in a content file (never in a component), so wording,
 * options and helper examples can be edited without touching layout.
 * `key` is the stable storage key written to the `responses` table — changing a
 * key orphans previously saved answers, so add new keys rather than renaming.
 */

export type TableColumn = {
  key: string;
  label: string;
  /**
   * "text" = single line, "long" = textarea, "behaviors" = guiding-behavior
   * checkboxes, "number" = numeric cell (can feed a live total),
   * "check" = a single done/not-done box, "date" = YYYY-MM-DD.
   */
  type?: "text" | "long" | "behaviors" | "number" | "check" | "date";
};

/** A scoring band shown live under a yes/no self-evaluation. */
export type Band = {
  /** Inclusive lower bound of "yes" answers. */
  min: number;
  label: string;
  text: string;
};

export type Field =
  | { kind: "short"; key: string; label: string; placeholder?: string; prefillFrom?: string }
  | {
      kind: "long";
      key: string;
      label: string;
      placeholder?: string;
      rows?: number;
      prefillFrom?: string;
    }
  | { kind: "select"; key: string; label: string; options: string[]; prefillFrom?: string }
  | {
      kind: "checklist";
      key: string;
      label: string;
      options: string[];
      other?: boolean;
      prefillFrom?: string;
    }
  | {
      kind: "agree";
      key: string;
      label?: string;
      statements: string[];
      /** Defaults to Agree/Disagree. The 4.0 Challenge uses Yes/No. */
      choices?: [string, string];
      /** Show a live count of the first choice, with bands. */
      score?: boolean;
      bands?: Band[];
    }
  | {
      kind: "table";
      key: string;
      label: string;
      columns: TableColumn[];
      rows: number;
      addRows?: boolean;
      examples?: { label: string; text: string }[];
      examplesTitle?: string;
      prefillFrom?: string;
      /** Column key whose numeric values are summed and shown under the table. */
      totalColumn?: string;
      totalLabel?: string;
      /** Target range for the total, e.g. 30-35 study hours. */
      targetMin?: number;
      targetMax?: number;
    };

export type Block =
  | { kind: "prose"; text: string }
  | { kind: "subhead"; text: string }
  | { kind: "note"; text: string }
  | { kind: "video"; label: string; href?: string }
  | { kind: "vault"; title: string; text: string; href?: string; cta?: string }
  | { kind: "carry"; from: string[]; title: string }
  /** Staff-written recap of the live session, published from the dashboard. */
  | { kind: "recap"; day: number; section?: string }
  /** Contextual "Your Next Step" offer, routed by the student's grade. */
  | { kind: "offer"; id: string; placement: string }
  /** A reference image with a caption, e.g. the model Google Calendar. */
  | { kind: "image"; src: string; alt: string; caption?: string }
  /** Auto-built list of every statement the student answered "No" to. */
  | { kind: "fixlist"; title: string; from: string[]; intro?: string }
  /** Numbered principles with an explanation and a worked example. */
  | {
      kind: "principles";
      title?: string;
      items: { title: string; text: string; example?: string }[];
    }
  | {
      kind: "group";
      letter?: string;
      title: string;
      definition?: string;
      tally?: boolean;
      blocks: Block[];
    }
  | ({ kind: "field" } & { field: Field });


export type Part = {
  id: string;
  number?: string;
  title: string;
  intro?: string;
  blocks: Block[];
};

export type SectionId = "pre-work" | "session" | "lab" | "reflect";

export type Page = {
  day: number;
  section: SectionId;
  eyebrow: string;
  title: string;
  subtitle?: string;
  coreQuestion?: string;
  parts: Part[];
};

export type Day = {
  day: number;
  date: string;
  shortDate: string;
  title: string;
  coreQuestion: string;
  pages: Record<SectionId, Page>;
};

/** Convenience helper so content files read cleanly. */
export const f = (field: Field): Block => ({ kind: "field", field });

/** Collects every field key on a page, in order. */
export function pageFields(page: Page): Field[] {
  const out: Field[] = [];
  const walk = (blocks: Block[]) => {
    for (const b of blocks) {
      if (b.kind === "field") out.push(b.field);
      else if (b.kind === "group") walk(b.blocks);
    }
  };
  for (const part of page.parts) walk(part.blocks);
  return out;
}
