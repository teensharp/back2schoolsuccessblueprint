import { ExternalLink, ListChecks, Quote } from "lucide-react";

import { BEHAVIOR_DEFINITIONS, type BehaviorName } from "@/lib/content/behaviors";
import { findField } from "@/lib/content/book";
import type { Block, Page, Part } from "@/lib/content/types";
import { isAnswered, type ResponseMap } from "@/lib/responses";

import { OfferCard } from "./OfferCard";
import { RecapBox } from "./RecapBox";
import { WorkbookField } from "./WorkbookField";

const VAULT_URL = "https://teensharp.org/the-vault";

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
      const items = block.from
        .map((key) => ({ key, text: renderCarried(ctx.responses[key]) }))
        .filter((i) => i.text.trim().length > 0);
      return (
        <div className="rounded-lg border border-dashed border-forest/40 bg-vault/10 p-5">
          <p className="flex items-center gap-2 font-display text-base uppercase tracking-wide text-forest">
            <Quote className="h-4 w-4" />
            {block.title}
          </p>
          {items.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">
              Nothing carried over yet. Finish the earlier pages and your own words will show up
              here.
            </p>
          ) : (
            <ul className="mt-3 space-y-2">
              {items.map((i) => (
                <li key={i.key} className="whitespace-pre-line text-sm leading-relaxed text-ink">
                  {i.text}
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
