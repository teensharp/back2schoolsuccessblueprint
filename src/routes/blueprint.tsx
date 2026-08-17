import { Link, createFileRoute } from "@tanstack/react-router";
import { CalendarPlus, Printer, Share2 } from "lucide-react";
import { useState } from "react";

import { BookPage } from "@/components/workbook/BookPage";
import { Button } from "@/components/ui/button";
import { DAYS } from "@/lib/content/book";
import { pageFields } from "@/lib/content/types";
import { VAULT_HOME } from "@/lib/brand";
import { downloadIcs, isValidDate, nextWeekday, type CalendarEvent } from "@/lib/ics";
import { isAnswered, type ResponseMap } from "@/lib/responses";

export const Route = createFileRoute("/blueprint")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "My Blueprint | Back-to-School Success Week 2026" },
      {
        name: "description",
        content:
          "Everything you built this week in one place: your reset plan, course roadmap, leadership move, and opportunity deadlines, ready to export to your calendar.",
      },
      { property: "og:title", content: "My Blueprint" },
      {
        property: "og:description",
        content: "Your four-day plan, in your own words, ready to share and put on the calendar.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <BookPage>{(ctx) => <Blueprint responses={ctx.responses} />}</BookPage>,
});

function display(value: unknown): { rows: string[][]; text: string } | null {
  if (typeof value === "string") return value.trim() ? { rows: [], text: value } : null;
  if (Array.isArray(value)) {
    if (value.every((v) => typeof v === "string")) {
      const list = (value as string[]).filter(Boolean);
      return list.length ? { rows: [], text: list.join(", ") } : null;
    }
    const rows = (value as Record<string, string>[])
      .map((r) => Object.values(r).map((v) => v ?? "").filter(Boolean))
      .filter((r) => r.length > 0);
    return rows.length ? { rows, text: "" } : null;
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, string>).filter(([, v]) => v);
    return entries.length
      ? { rows: [], text: entries.map(([k, v]) => `${k}: ${v}`).join(" \u00b7 ") }
      : null;
  }
  return null;
}

function collectEvents(responses: ResponseMap): CalendarEvent[] {
  const events: CalendarEvent[] = [];

  const committed = responses["d4.lab.committed"];
  if (Array.isArray(committed)) {
    for (const row of committed as Record<string, string>[]) {
      if (isValidDate(row["deadline"]) && row["name"]) {
        events.push({
          title: `Deadline: ${row["name"]}`,
          date: row["deadline"]!.trim(),
          description: row["why"] ?? "",
        });
      }
    }
  }

  const calendar = responses["d4.lab.calendar"];
  if (Array.isArray(calendar)) {
    for (const row of calendar as Record<string, string>[]) {
      if (isValidDate(row["date"]) && row["task"]) {
        events.push({
          title: row["task"]!.slice(0, 90),
          date: row["date"]!.trim(),
          description: row["opportunity"] ?? "",
        });
      }
    }
  }

  const requirements = responses["d4.lab.requirements"];
  if (Array.isArray(requirements)) {
    for (const row of requirements as Record<string, string>[]) {
      if (isValidDate(row["deadline"]) && row["name"]) {
        events.push({
          title: `Application due: ${row["name"]}`,
          date: row["deadline"]!.trim(),
          description: [row["essays"], row["recs"], row["other"]].filter(Boolean).join(" | "),
        });
      }
    }
  }

  const meetings = responses["d2.pw.meetings"];
  if (Array.isArray(meetings)) {
    for (const row of meetings as Record<string, string>[]) {
      if (isValidDate(row["date"]) && row["teacher"]) {
        events.push({
          title: `Teacher conversation: ${row["teacher"]}`,
          date: row["date"]!.trim(),
          description: row["time"] ?? "",
        });
      }
    }
  }

  const studyHours = responses["d3.pw.studyhours"];
  if (Array.isArray(studyHours)) {
    for (const row of studyHours as Record<string, string>[]) {
      const start = row["day"] ? nextWeekday(row["day"]) : null;
      const hours = (row["hours"] ?? "").trim();
      if (start && hours) {
        events.push({
          title: `Study block \u2014 ${hours}h`,
          date: start,
          description: row["blocks"] ?? "",
          weeklyCount: 40,
        });
      }
    }
  }

  const reviewDay = responses["d3.pw.review.day"];
  if (typeof reviewDay === "string" && reviewDay.trim()) {
    const start = nextWeekday(reviewDay);
    if (start) {
      events.push({
        title: "Weekly calendar review",
        date: start,
        description: `Evaluate last week's blocks and adjust (${reviewDay.trim()}).`,
        weeklyCount: 40,
      });
    }
  }

  const firstDate = responses["d3.lab.first.date"];
  const firstAction = responses["d3.lab.first.action"];
  if (typeof firstDate === "string" && isValidDate(firstDate) && typeof firstAction === "string") {
    events.push({ title: `Leadership first step: ${firstAction}`, date: firstDate.trim() });
  }

  return events;
}

function Blueprint({ responses }: { responses: ResponseMap }) {
  const [copied, setCopied] = useState(false);
  const events = collectEvents(responses);

  const share = async () => {
    const lines = [
      "My Back-to-School Blueprint (TeenSHARP Back-to-School Success Week 2026)",
      "",
      ...DAYS.flatMap((d) => {
        const items = pageFields(d.pages.lab)
          .filter((f) => isAnswered(responses[f.key]))
          .slice(0, 3)
          .map((f) => {
            const shown = display(responses[f.key]);
            const text = shown?.text || shown?.rows.map((r) => r.join(" \u2014 ")).join("; ") || "";
            return `- ${"label" in f ? f.label : f.key} ${text}`.slice(0, 220);
          });
        return items.length ? [`${d.title}:`, ...items, ""] : [];
      }),
      "Ask me about it next week and hold me to it.",
    ];
    await navigator.clipboard.writeText(lines.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-10">
      <header className="rounded-xl border border-forest/20 bg-forest p-8 text-forest-foreground print:bg-white print:text-black">
        <p className="font-display text-sm uppercase tracking-[0.2em] text-vault">
          TeenSHARP &middot; The Vault
        </p>
        <h1 className="mt-2 font-display text-4xl uppercase tracking-wide">My Blueprint</h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-forest-foreground/85 print:text-black">
          Everything you decided this week, in your own words. Put the dates on your calendar, then
          tell one person who will hold you to it.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 print:hidden">
          <Button
            onClick={() => downloadIcs(events)}
            disabled={events.length === 0}
            className="bg-vault text-vault-foreground hover:bg-vault/90"
          >
            <CalendarPlus className="mr-1.5 h-4 w-4" />
            Add {events.length} date{events.length === 1 ? "" : "s"} to my calendar
          </Button>
          <Button
            variant="outline"
            onClick={share}
            className="border-white/30 bg-transparent text-forest-foreground hover:bg-white/10"
          >
            <Share2 className="mr-1.5 h-4 w-4" />
            {copied ? "Copied!" : "Copy my accountability share-out"}
          </Button>
          <Button
            variant="outline"
            onClick={() => window.print()}
            className="border-white/30 bg-transparent text-forest-foreground hover:bg-white/10"
          >
            <Printer className="mr-1.5 h-4 w-4" /> Print
          </Button>
        </div>
        {events.length === 0 ? (
          <p className="mt-3 text-xs text-forest-foreground/70 print:hidden">
            Add deadlines in the Day 4 lab using YYYY-MM-DD and they will show up here.
          </p>
        ) : null}
      </header>

      {DAYS.map((d) => {
        const fields = pageFields(d.pages.lab).filter((f) => isAnswered(responses[f.key]));
        return (
          <section key={d.day} className="rounded-lg border border-rule bg-card p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-vault-foreground/70">
              Day {d.day}
            </p>
            <h2 className="font-display text-2xl uppercase tracking-wide text-forest">{d.title}</h2>

            {fields.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">
                Nothing here yet.{" "}
                <Link
                  to="/day/$day/$section"
                  params={{ day: String(d.day), section: "lab" }}
                  className="font-semibold text-forest underline underline-offset-4"
                >
                  Build this section
                </Link>
                .
              </p>
            ) : (
              <dl className="mt-4 space-y-5">
                {fields.map((f) => {
                  const shown = display(responses[f.key]);
                  if (!shown) return null;
                  return (
                    <div key={f.key}>
                      <dt className="text-sm font-semibold text-forest">
                        {"label" in f ? f.label : f.key}
                      </dt>
                      <dd className="mt-1 text-[15px] leading-relaxed text-ink">
                        {shown.text ? (
                          <p className="whitespace-pre-line">{shown.text}</p>
                        ) : (
                          <ul className="list-disc space-y-1 pl-5">
                            {shown.rows.map((r, i) => (
                              <li key={i}>{r.join(" \u2014 ")}</li>
                            ))}
                          </ul>
                        )}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            )}
          </section>
        );
      })}

      <section className="rounded-lg border border-forest/25 bg-forest p-6 text-forest-foreground print:hidden">
        <h2 className="font-display text-xl uppercase tracking-wide text-vault">
          Keep this off the shelf
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-forest-foreground/85">
          The Vault is where this plan keeps moving: deadline reminders, essay feedback, and the
          people who will check on your commitments all year.
        </p>
        <a
          href={VAULT_HOME}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex rounded-md bg-vault px-5 py-2.5 text-sm font-semibold text-vault-foreground hover:opacity-90"
        >
          Open The Vault
        </a>
      </section>
    </div>
  );
}
