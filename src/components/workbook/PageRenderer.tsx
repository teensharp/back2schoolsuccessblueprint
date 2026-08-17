import { ExternalLink, ListChecks, Quote } from "lucide-react";

import { VAULT_HOME } from "@/lib/brand";
import { BEHAVIOR_DEFINITIONS, type BehaviorName } from "@/lib/content/behaviors";
import { findField } from "@/lib/content/book";
import type { Block, Page, Part } from "@/lib/content/types";
import { isAnswered, type ResponseMap } from "@/lib/responses";

import { RecapBox } from "./RecapBox";
import { WorkbookField } from "./WorkbookField";

const VAULT_URL = VAULT_HOME;

type Ctx = {
  responses: ResponseMap;
  onChange: (key: string, value: unknown) => void;
  userId?: string | undefined;
  grade?: string | null | undefined;
};


function renderCarried(value: unknown): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) {
    return value
      .map((v) =>
        typeof v === "string"
          ? v
          : Object.values(v as Record<string, string>)
              .filter(Boolean)
              .join(" \u2014 "),
      )
      .filter(Boolean)
      .join("\n");
  }
  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, string>)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
  }
  return "";
}


function BlockView({ block, ctx }: { block: Block; ctx: Ctx }) {
  switch (block.kind) {
    case "prose":
      return <p className="text-[15px] leading-relaxed text-ink/85">{block.text}</p>;

    case "subhead":
      return (
        <h4 className="font-display text-lg uppercase tracking-wide text-forest">{block.text}</h4>
      );

    case "note":
      return (
        <p className="rounded-md border-l-4 border-vault bg-vault/10 px-4 py-3 text-sm leading-relaxed text-ink">
          {block.text}
        </p>
      );

    case "video":
      return (
        <a
          href={block.href ?? VAULT_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-forest/30 bg-paper px-4 py-2.5 text-sm font-semibold text-forest hover:bg-forest/5"
        >
          {block.label}
          <ExternalLink className="h-4 w-4" />
        </a>
      );

    case "vault":
      return (
        <div className="rounded-lg border border-forest/25 bg-forest p-5 text-forest-foreground">
          <p className="font-display text-lg uppercase tracking-wide text-vault">{block.title}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-forest-foreground/85">{block.text}</p>
          <a
            href={block.href ?? VAULT_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-md bg-vault px-4 py-2 text-sm font-semibold text-vault-foreground hover:opacity-90"
          >
            {block.cta ?? "Open The Vault"}
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      );

    case "carry": {
      const entries = block.from.map((key) => {
        const field = findField(key);
        const label = field && "label" in field ? (field.label ?? "") : "";
        const kind = field?.kind;
        const value = ctx.responses[key];
        const text = renderCarried(value).trim();
        const words = text.split(/\s+/).filter(Boolean).length;

        let status: "missing" | "thin" | "done";
        if (words === 0) {
          status = "missing";
        } else if (kind === "select" || kind === "checklist" || kind === "agree") {
          // Choice answers are either made or not — depth does not apply.
          status = "done";
        } else if (kind === "table") {
          const expected = "rows" in field! ? (field as { rows: number }).rows : 0;
          const filled = Array.isArray(value)
            ? value.filter(
                (row) =>
                  row &&
                  Object.values(row as Record<string, string>).some(
                    (v) => typeof v === "string" && v.trim(),
                  ),
              ).length
            : 0;
          status = expected && filled < Math.ceil(expected / 2) ? "thin" : "done";
        } else if (kind === "short") {
          status = words < 8 ? "thin" : "done";
        } else {
          status = words < 25 ? "thin" : "done";
        }

        return { key, label: label || key, status };
      });
      const total = entries.length;
      const done = entries.filter((i) => i.status === "done").length;
      const missing = entries.filter((i) => i.status === "missing");
      const thin = entries.filter((i) => i.status === "thin");
      const pct = total ? Math.round((done / total) * 100) : 0;
      const dayNumber = Number(/^d(\d)\./.exec(block.from[0] ?? "")?.[1] ?? 0);

      return (
        <div className="rounded-lg border border-dashed border-forest/40 bg-vault/10 p-5">
          <p className="text-sm font-semibold text-ink">
            You have completed {done} of {total} pre-work prompts
            {dayNumber ? ` for Day ${dayNumber}` : ""}.
          </p>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-forest/15">
            <div className="h-full rounded-full bg-forest" style={{ width: `${pct}%` }} />
          </div>

          {missing.length === 0 && thin.length === 0 ? (
            <p className="mt-3 text-sm leading-relaxed text-ink/85">
              Your pre-work is complete &mdash; build from it, do not repeat it.
            </p>
          ) : (
            <>
              <p className="mt-3 text-sm leading-relaxed text-ink/85">
                This Lab is only as strong as the pre-work behind it. Skipped or one-line answers
                produce a thin Blueprint. Go back, finish the work with real evidence and detail,
                then build here.
              </p>
              {missing.length > 0 ? (
                <div className="mt-4 border-t border-forest/15 pt-3">
                  <p className="text-sm font-semibold text-forest">Not answered yet</p>
                  <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm text-ink/85">
                    {missing.map((i) => (
                      <li key={i.key}>{i.label}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {thin.length > 0 ? (
                <div className="mt-4 border-t border-forest/15 pt-3">
                  <p className="text-sm font-semibold text-forest">Needs more depth</p>
                  <p className="mt-1 text-xs leading-relaxed text-ink/70">
                    These answers are too short to show real thinking. Go back and add evidence,
                    examples, and specifics.
                  </p>
                  <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm text-ink/85">
                    {thin.map((i) => (
                      <li key={i.key}>{i.label}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </>
          )}
        </div>
      );
    }

    case "recap":
      return <RecapBox day={block.day} section={block.section ?? "session"} />;

    case "offer":
      // "Your Next Step" upsell cards are hidden for now. Restore by rendering
      // <OfferCard id={block.id} placement={block.placement} userId={ctx.userId} grade={ctx.grade} />
      return null;


    case "image":
      return (
        <figure className="overflow-hidden rounded-lg border border-rule bg-paper">
          <img src={block.src} alt={block.alt} loading="lazy" className="w-full" />
          {block.caption ? (
            <figcaption className="border-t border-rule px-4 py-3 text-sm leading-relaxed text-ink/80">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      );

    case "principles":
      return (
        <div className="space-y-4">
          {block.title ? (
            <h4 className="font-display text-lg uppercase tracking-wide text-forest">
              {block.title}
            </h4>
          ) : null}
          <ol className="space-y-4">
            {block.items.map((item, i) => (
              <li key={item.title} className="rounded-lg border border-rule bg-card p-4">
                <p className="flex items-baseline gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forest font-display text-xs text-forest-foreground">
                    {i + 1}
                  </span>
                  <span className="font-display text-lg uppercase tracking-wide text-forest">
                    {item.title}
                  </span>
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/85">{item.text}</p>
                {item.example ? (
                  <p className="mt-2 rounded-md border-l-4 border-vault bg-vault/10 px-3 py-2 text-sm leading-relaxed text-ink">
                    <span className="font-semibold">In practice: </span>
                    {item.example}
                  </p>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      );

    case "fixlist": {
      const items: string[] = [];
      for (const key of block.from) {
        const field = findField(key);
        if (!field || field.kind !== "agree") continue;
        const answers = (ctx.responses[key] ?? {}) as Record<string, string>;
        const no = field.choices?.[1] ?? "Disagree";
        field.statements.forEach((statement, i) => {
          if (answers[String(i)] === no) items.push(statement);
        });
      }
      return (
        <div className="rounded-lg border border-forest/30 bg-paper p-5">
          <p className="flex items-center gap-2 font-display text-base uppercase tracking-wide text-forest">
            <ListChecks className="h-4 w-4" />
            {block.title}
          </p>
          {block.intro ? (
            <p className="mt-1.5 text-sm leading-relaxed text-ink/80">{block.intro}</p>
          ) : null}
          {items.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">
              Nothing here yet. Complete the self-evaluation and every item you marked No shows up
              as work to do.
            </p>
          ) : (
            <ul className="mt-3 list-disc space-y-1.5 pl-5">
              {items.map((t, i) => (
                <li key={i} className="text-sm leading-relaxed text-ink">
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }

    case "group": {
      const definition =
        block.definition ?? BEHAVIOR_DEFINITIONS[block.title as BehaviorName] ?? undefined;

      return (
        <section className="rounded-lg border border-rule bg-card p-5 shadow-sm">
          <div className="mb-3 flex items-baseline gap-3">
            {block.letter ? (
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest font-display text-sm text-forest-foreground">
                {block.letter}
              </span>
            ) : null}
            <div>
              <h4 className="font-display text-xl uppercase tracking-wide text-forest">
                {block.title}
              </h4>
              {definition ? (
                <p className="mt-1 text-sm leading-relaxed text-ink/80">{definition}</p>
              ) : null}
            </div>
          </div>
          <div className="space-y-5">
            {block.blocks.map((b, i) => (
              <BlockView key={i} block={b} ctx={ctx} />
            ))}
          </div>
        </section>
      );
    }

    case "field":
      return <WorkbookField field={block.field} responses={ctx.responses} onChange={ctx.onChange} />;

    default:
      return null;
  }
}

function PartView({ part, ctx }: { part: Part; ctx: Ctx }) {
  return (
    <section className="space-y-5">
      <header className="border-b-2 border-forest/20 pb-2">
        {part.number ? (
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-vault-foreground/70">
            {part.number}
          </p>
        ) : null}
        <h3 className="font-display text-2xl uppercase tracking-wide text-forest">{part.title}</h3>
        {part.intro ? (
          <p className="mt-1.5 text-[15px] leading-relaxed text-ink/80">{part.intro}</p>
        ) : null}
      </header>
      <div className="space-y-6">
        {part.blocks.map((b, i) => (
          <BlockView key={i} block={b} ctx={ctx} />
        ))}
      </div>
    </section>
  );
}

export function PageRenderer({ page, ctx }: { page: Page; ctx: Ctx }) {
  return (
    <article className="space-y-10">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-vault-foreground/70">
          Day {page.day} &middot; {page.eyebrow}
        </p>
        <h2 className="mt-1 font-display text-4xl uppercase leading-tight tracking-wide text-forest">
          {page.title}
        </h2>
        {page.coreQuestion ? (
          <p className="mt-3 border-l-4 border-vault pl-4 text-lg italic leading-relaxed text-ink">
            {page.coreQuestion}
          </p>
        ) : null}
        {page.subtitle ? (
          <p className="mt-3 text-[15px] leading-relaxed text-ink/80">{page.subtitle}</p>
        ) : null}
      </header>
      {page.parts.map((part) => (
        <PartView key={part.id} part={part} ctx={ctx} />
      ))}
    </article>
  );
}

export { isAnswered };
