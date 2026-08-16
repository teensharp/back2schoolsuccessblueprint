import { Link, createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";

import { BookPage } from "@/components/workbook/BookPage";
import { AGENDA, AGENDA_NOTE, HELPFUL_LINKS } from "@/lib/content/agenda";
import { BEHAVIORS, BEHAVIOR_DEFINITIONS } from "@/lib/content/behaviors";
import { PROGRAM_DATES } from "@/lib/content/book";

export const Route = createFileRoute("/agenda")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Week Agenda | Back-to-School Success Week 2026" },
      {
        name: "description",
        content:
          "The full four-day agenda for TeenSHARP Back-to-School Success Week, August 17-20, 2026, with session times, speakers, and daily core questions.",
      },
      { property: "og:title", content: "Week Agenda | Back-to-School Success Week 2026" },
      {
        property: "og:description",
        content: "Sessions, panels, workshops, and blueprint labs for all four days.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <BookPage>{() => <Agenda />}</BookPage>,
});

function Agenda() {
  return (
    <div className="space-y-10">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-vault-foreground/70">
          {PROGRAM_DATES}
        </p>
        <h1 className="mt-1 font-display text-4xl uppercase tracking-wide text-forest">
          Week Agenda
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{AGENDA_NOTE}</p>
      </header>

      <div className="grid gap-4 lg:grid-cols-4">
        {AGENDA.map((d) => (
          <section
            key={d.day}
            className="flex flex-col overflow-hidden rounded-lg border border-rule bg-card"
          >
            <div className="bg-forest px-4 py-3 text-forest-foreground">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-vault">
                {d.weekday} &middot; {d.date}
              </p>
              <h2 className="mt-1 font-display text-lg uppercase leading-tight tracking-wide">
                {d.title}
              </h2>
              <p className="mt-2 text-xs italic leading-relaxed text-forest-foreground/80">
                {d.coreQuestion}
              </p>
            </div>
            <ul className="flex-1 divide-y divide-rule">
              {d.items.map((item, i) => (
                <li
                  key={i}
                  className={`px-4 py-3 ${item.kind === "break" ? "bg-muted/50" : item.kind === "lab" ? "bg-vault/10" : ""}`}
                >
                  <p className="text-xs font-bold text-forest">{item.time}</p>
                  <p className="mt-0.5 text-sm font-semibold leading-snug text-ink">{item.title}</p>
                  {item.detail ? (
                    <p className="mt-1 text-xs leading-relaxed text-ink/75">{item.detail}</p>
                  ) : null}
                  {item.by ? (
                    <p className="mt-1 text-xs italic leading-relaxed text-muted-foreground">
                      {item.by}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
            <div className="border-t border-rule p-3">
              <Link
                to="/day/$day/$section"
                params={{ day: String(d.day), section: "session" }}
                className="text-xs font-semibold text-forest underline underline-offset-4"
              >
                Open Day {d.day} notes
              </Link>
            </div>
          </section>
        ))}
      </div>

      <section>
        <h2 className="font-display text-2xl uppercase tracking-wide text-forest">
          The Six Guiding Behaviors
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {BEHAVIORS.map((b) => (
            <div key={b} className="rounded-lg border border-rule bg-card p-4">
              <p className="font-display text-lg uppercase tracking-wide text-forest">{b}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink/80">{BEHAVIOR_DEFINITIONS[b]}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl uppercase tracking-wide text-forest">Helpful Links</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {HELPFUL_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-forest/30 bg-paper px-4 py-2 text-sm font-semibold text-forest hover:bg-forest/5"
            >
              {l.label}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
