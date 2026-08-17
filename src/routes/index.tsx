import logo from "@/assets/teensharp-logo.png.asset.json";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { BookPage } from "@/components/workbook/BookPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BOOK_SUBTITLE,
  BOOK_TITLE,
  PROGRAM_DATES,
  PROGRAM_NAME,
  DAYS,
} from "@/lib/content/book";
import { useAuth } from "@/lib/useAuth";
import { useProfile, useSaveProfile } from "@/lib/responses";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "My Back-to-School Blueprint | TeenSHARP Bridge Week 2026" },
      {
        name: "description",
        content:
          "A fillable four-day workbook for Back-to-School Success Week 2026: pre-work, guided session notes, blueprint labs, and end-of-day analysis.",
      },
      { property: "og:title", content: "My Back-to-School Blueprint" },
      {
        property: "og:description",
        content:
          "Build a personalized roadmap to excel academically, lead purposefully, and pursue elite opportunities.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CoverPage,
});

function CoverPage() {
  return (
    <BookPage>
      {() => <Cover />}
    </BookPage>
  );
}

function Cover() {
  const { user } = useAuth();
  const { data: profile } = useProfile(user?.id);
  const save = useSaveProfile(user?.id);

  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (profile && !hydrated) {
      setName(profile.full_name ?? "");
      setSchool(profile.school ?? "");
      setGrade(profile.grade ?? "");
      setHydrated(true);
    }
  }, [profile, hydrated]);

  const commit = () => {
    save.mutate({ full_name: name, school, grade });
  };

  return (
    <div className="space-y-10">
      <div className="overflow-hidden rounded-xl border border-forest/20 bg-forest text-forest-foreground shadow-lg">
        <div className="flex flex-wrap items-center gap-4 border-b border-white/10 px-8 py-5">
          <span className="rounded-md bg-brand-surface px-3 py-1.5">
            <img src={logo.url} alt="TeenSHARP" className="h-8 w-auto" />
          </span>
          <p className="font-display text-sm uppercase tracking-[0.3em] text-vault">
            The Vault &middot; Bridge Week
          </p>
        </div>
        <div className="px-8 py-12">
          <p className="font-display text-sm uppercase tracking-[0.2em] text-vault">
            {PROGRAM_NAME} &middot; {PROGRAM_DATES}
          </p>
          <h1 className="mt-4 font-display text-5xl uppercase leading-[1.02] tracking-wide sm:text-6xl">
            {BOOK_TITLE}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-forest-foreground/85">
            {BOOK_SUBTITLE}
          </p>

          <div className="mt-10 max-w-xl space-y-4 rounded-lg bg-paper p-6 text-ink">
            <p className="font-display text-lg uppercase tracking-wide text-forest">
              This blueprint belongs to
            </p>
            <div>
              <Label htmlFor="cover-name">Full name</Label>
              <Input
                id="cover-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={commit}
                placeholder="Write your name"
                className="mt-1.5 border-0 border-b-2 border-forest/40 bg-transparent px-0 text-2xl font-semibold shadow-none focus-visible:ring-0"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="cover-school">School</Label>
                <Input
                  id="cover-school"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  onBlur={commit}
                  className="mt-1.5 bg-background"
                />
              </div>
              <div>
                <Label htmlFor="cover-grade">Grade this year</Label>
                <Input
                  id="cover-grade"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  onBlur={commit}
                  placeholder="9, 10, 11, or 12"
                  className="mt-1.5 bg-background"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {save.isPending ? "Saving\u2026" : "Saved automatically when you click away."}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="bg-vault text-vault-foreground hover:bg-vault/90">
              <Link to="/day/$day/$section" params={{ day: "1", section: "pre-work" }}>
                Start Day 1 pre-work <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/30 bg-transparent text-forest-foreground hover:bg-white/10"
            >
              <Link to="/contents">Table of contents</Link>
            </Button>
          </div>
        </div>
      </div>

      <section>
        <h2 className="font-display text-2xl uppercase tracking-wide text-forest">
          Four days, four questions
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {DAYS.map((d) => (
            <Link
              key={d.day}
              to="/day/$day/$section"
              params={{ day: String(d.day), section: "pre-work" }}
              className="rounded-lg border border-rule bg-card p-5 transition-colors hover:border-forest"
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-vault-foreground/70">
                Day {d.day} &middot; {d.shortDate}
              </p>
              <h3 className="mt-1 font-display text-xl uppercase tracking-wide text-forest">
                {d.title}
              </h3>
              <p className="mt-2 text-sm italic leading-relaxed text-ink/80">{d.coreQuestion}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
