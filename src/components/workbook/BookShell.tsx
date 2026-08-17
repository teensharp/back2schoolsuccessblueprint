import { Link, useNavigate } from "@tanstack/react-router";
import { Check, LogOut, Menu } from "lucide-react";
import { useState, type ReactNode } from "react";

import logo from "@/assets/teensharp-logo.png.asset.json";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import { DAYS, SECTION_LABELS, SECTION_ORDER, sectionKeys } from "@/lib/content/book";
import { completionFor, type ResponseMap } from "@/lib/responses";

import { HelpFooter } from "./HelpFooter";

function NavContent({
  responses,
  onNavigate,
}: {
  responses: ResponseMap;
  onNavigate?: () => void;
}) {
  return (
    <nav className="space-y-6 text-sm">
      <div className="space-y-1">
        {[
          { to: "/", label: "Cover" },
          { to: "/contents", label: "Table of Contents" },
          { to: "/agenda", label: "Week Agenda" },
          { to: "/blueprint", label: "My Blueprint" },
        ].map((l) => (
          <Link
            key={l.to}
            to={l.to}
            onClick={onNavigate}
            activeOptions={{ exact: true }}
            activeProps={{ className: "bg-forest text-forest-foreground" }}
            className="block rounded-md px-3 py-1.5 font-semibold text-ink hover:bg-forest/10"
          >
            {l.label}
          </Link>
        ))}
      </div>

      {DAYS.map((d) => (
        <div key={d.day}>
          <p className="px-3 font-display text-sm uppercase tracking-wide text-forest">
            Day {d.day} &middot; {d.title}
          </p>
          <div className="mt-1 space-y-0.5">
            {SECTION_ORDER.map((s) => {
              const { pct } = completionFor(responses, sectionKeys(d.day, s));
              return (
                <Link
                  key={s}
                  to="/day/$day/$section"
                  params={{ day: String(d.day), section: s }}
                  onClick={onNavigate}
                  activeProps={{ className: "bg-forest text-forest-foreground" }}
                  className="flex items-center justify-between gap-2 rounded-md px-3 py-1.5 text-ink hover:bg-forest/10"
                >
                  <span>{SECTION_LABELS[s]}</span>
                  {pct === 100 ? (
                    <Check className="h-3.5 w-3.5 text-vault" />
                  ) : pct > 0 ? (
                    <span className="text-[11px] opacity-70">{pct}%</span>
                  ) : null}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

export function BookShell({
  children,
  responses,
  saveLabel,
  studentName,
}: {
  children: ReactNode;
  responses: ResponseMap;
  saveLabel?: string | undefined;
  studentName?: string | undefined;
}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const signOut = async () => {
    await supabase.auth.signOut();
    void navigate({ to: "/auth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-rule bg-forest text-forest-foreground">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-forest-foreground hover:bg-white/10 lg:hidden"
                aria-label="Open contents"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto bg-paper">
              <SheetTitle className="font-display uppercase tracking-wide text-forest">
                Contents
              </SheetTitle>
              <div className="mt-4">
                <NavContent responses={responses} onNavigate={() => setOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>

          <Link to="/" className="flex items-center gap-3">
            <span className="rounded-md bg-paper px-2 py-1">
              <img src={logo.url} alt="TeenSHARP" className="h-6 w-auto" />
            </span>
            <span className="font-display text-base uppercase tracking-wide">
              Back-to-School Blueprint
            </span>
          </Link>

          <div className="ml-auto flex items-center gap-3">
            {saveLabel ? (
              <span className="hidden text-xs text-forest-foreground/70 sm:inline">{saveLabel}</span>
            ) : null}
            {studentName ? (
              <span className="hidden text-xs font-semibold sm:inline">{studentName}</span>
            ) : null}
            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
              className="text-forest-foreground hover:bg-white/10"
            >
              <LogOut className="mr-1.5 h-4 w-4" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl gap-8 px-4 py-8">
        <aside className="sticky top-24 hidden h-fit w-64 shrink-0 lg:block">
          <NavContent responses={responses} />
        </aside>
        <main className="min-w-0 flex-1">
          {children}
          <HelpFooter />
        </main>
      </div>
    </div>
  );
}
