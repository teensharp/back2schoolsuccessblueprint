import { Link, createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { BookPage } from "@/components/workbook/BookPage";
import { Progress } from "@/components/ui/progress";
import { DAYS, SECTION_LABELS, SECTION_ORDER, sectionKeys } from "@/lib/content/book";
import { completionFor, type ResponseMap } from "@/lib/responses";

export const Route = createFileRoute("/contents")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Table of Contents | Back-to-School Blueprint" },
      {
        name: "description",
        content:
          "Every page of your Bridge Week 2026 blueprint, with how much of each section you have finished.",
      },
      { property: "og:title", content: "Table of Contents | Back-to-School Blueprint" },
      {
        property: "og:description",
        content: "Track your progress through all four days of Back-to-School Success Week.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <BookPage>{(ctx) => <Contents responses={ctx.responses} />}</BookPage>,
});

function Contents({ responses }: { responses: ResponseMap }) {
  const allKeys = DAYS.flatMap((d) => SECTION_ORDER.flatMap((s) => sectionKeys(d.day, s)));
  const overall = completionFor(responses, allKeys);

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-vault-foreground/70">
          Your book
        </p>
        <h1 className="mt-1 font-display text-4xl uppercase tracking-wide text-forest">
          Table of Contents
        </h1>
        <div className="mt-4 max-w-md">
          <Progress value={overall.pct} className="h-2" />
          <p className="mt-2 text-sm text-muted-foreground">
            {overall.done} of {overall.total} prompts answered &middot; {overall.pct}% complete
          </p>
        </div>
      </header>

      <div className="space-y-6">
        {DAYS.map((d) => {
          const dayKeys = SECTION_ORDER.flatMap((s) => sectionKeys(d.day, s));
          const dayPct = completionFor(responses, dayKeys).pct;
          return (
            <section key={d.day} className="rounded-lg border border-rule bg-card p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-vault-foreground/70">
                    Day {d.day} &middot; {d.date}
                  </p>
                  <h2 className="font-display text-2xl uppercase tracking-wide text-forest">
                    {d.title}
                  </h2>
                </div>
                <span className="text-sm font-semibold text-forest">{dayPct}%</span>
              </div>
              <p className="mt-2 text-sm italic text-ink/80">{d.coreQuestion}</p>

              <ul className="mt-4 divide-y divide-rule border-t border-rule">
                {SECTION_ORDER.map((s) => {
                  const c = completionFor(responses, sectionKeys(d.day, s));
                  return (
                    <li key={s}>
                      <Link
                        to="/day/$day/$section"
                        params={{ day: String(d.day), section: s }}
                        className="flex items-center justify-between gap-3 py-3 text-sm hover:text-forest"
                      >
                        <span className="font-semibold">{SECTION_LABELS[s]}</span>
                        <span className="flex items-center gap-2 text-muted-foreground">
                          {c.done}/{c.total}
                          {c.pct === 100 ? <Check className="h-4 w-4 text-forest" /> : null}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      <Link
        to="/blueprint"
        className="inline-flex items-center rounded-md bg-forest px-5 py-2.5 text-sm font-semibold text-forest-foreground hover:bg-forest/90"
      >
        View my finished blueprint
      </Link>
    </div>
  );
}
