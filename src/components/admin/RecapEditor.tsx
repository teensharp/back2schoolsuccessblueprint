import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DAYS } from "@/lib/content/book";
import { draftSessionRecap } from "@/lib/recap-ai.functions";
import { useAllRecaps, useSaveRecap, type SessionRecap } from "@/lib/recaps";

function DayRecap({
  day,
  title,
  existing,
  authorId,
}: {
  day: number;
  title: string;
  existing: SessionRecap | undefined;
  authorId: string;
}) {
  const [heading, setHeading] = useState(existing?.title ?? `${title} \u2014 Session Recap`);
  const [body, setBody] = useState(existing?.body ?? "");
  const [notes, setNotes] = useState("");
  const [drafting, setDrafting] = useState(false);
  const draft = useServerFn(draftSessionRecap);
  const save = useSaveRecap();

  const generate = async () => {
    if (notes.trim().length < 20) {
      toast.error("Paste at least a few lines of session notes first.");
      return;
    }
    setDrafting(true);
    try {
      const result = await draft({ data: { day, notes: notes.trim() } });
      setBody(result.draft);
      toast.success("Draft ready \u2014 edit it before publishing.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not draft the recap.");
    } finally {
      setDrafting(false);
    }
  };

  const store = (published: boolean) => {
    if (!body.trim()) {
      toast.error("Write or generate a recap first.");
      return;
    }
    save.mutate(
      { day, title: heading.trim() || title, body: body.trim(), published, authorId },
      {
        onSuccess: () => toast.success(published ? "Published to students." : "Draft saved."),
        onError: (error) =>
          toast.error(error instanceof Error ? error.message : "Could not save the recap."),
      },
    );
  };

  return (
    <div className="rounded-lg border border-rule bg-card p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-display text-lg uppercase tracking-wide text-forest">
          Day {day} &middot; {title}
        </h3>
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
            existing?.published
              ? "bg-vault text-vault-foreground"
              : existing
                ? "bg-forest/10 text-forest"
                : "text-muted-foreground"
          }`}
        >
          {existing?.published ? "Published" : existing ? "Draft saved" : "Not written"}
        </span>
      </div>

      <label className="mt-4 block text-xs font-semibold uppercase tracking-wide text-forest">
        Recap heading
      </label>
      <Input className="mt-1" value={heading} onChange={(e) => setHeading(e.target.value)} />

      <label className="mt-4 block text-xs font-semibold uppercase tracking-wide text-forest">
        Raw session notes (for the AI draft only &mdash; students never see this)
      </label>
      <Textarea
        className="mt-1"
        rows={4}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Speakers, claims, moments, assignments given, anything said that students should carry forward."
      />
      <Button
        variant="outline"
        size="sm"
        className="mt-2"
        onClick={() => void generate()}
        disabled={drafting}
      >
        {drafting ? (
          <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
        ) : (
          <Sparkles className="mr-1.5 h-4 w-4" />
        )}
        Draft with AI
      </Button>

      <label className="mt-4 block text-xs font-semibold uppercase tracking-wide text-forest">
        Recap students will read
      </label>
      <Textarea className="mt-1" rows={10} value={body} onChange={(e) => setBody(e.target.value)} />

      <div className="mt-3 flex flex-wrap gap-2">
        <Button
          size="sm"
          className="bg-forest text-forest-foreground hover:bg-forest/90"
          onClick={() => store(true)}
          disabled={save.isPending}
        >
          Publish to students
        </Button>
        <Button variant="outline" size="sm" onClick={() => store(false)} disabled={save.isPending}>
          Save as draft
        </Button>
      </div>
    </div>
  );
}

export function RecapEditor({ authorId }: { authorId: string }) {
  const recaps = useAllRecaps(true);
  const byDay = new Map((recaps.data ?? []).map((r) => [r.day, r]));

  return (
    <section className="space-y-4">
      <div>
        <h2 className="font-display text-xl uppercase tracking-wide text-forest">Session recaps</h2>
        <p className="text-sm text-muted-foreground">
          Published recaps appear in the box at the top of each day&rsquo;s guided notes.
        </p>
      </div>
      {recaps.isLoading ? (
        <p className="text-sm text-muted-foreground">Loading recaps&hellip;</p>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {DAYS.map((d) => (
            <DayRecap
              key={d.day}
              day={d.day}
              title={d.title}
              existing={byDay.get(d.day)}
              authorId={authorId}
            />
          ))}
        </div>
      )}
    </section>
  );
}
