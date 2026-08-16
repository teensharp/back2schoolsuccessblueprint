import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { generateDaySummary } from "@/lib/ai.functions";
import { DAYS, SECTION_ORDER, sectionKeys } from "@/lib/content/book";
import { pageFields } from "@/lib/content/types";
import { isAnswered, type ResponseMap } from "@/lib/responses";

function flatten(value: unknown): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(flatten).filter(Boolean).join("; ");
  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>)
      .map(([k, v]) => (flatten(v) ? `${k}: ${flatten(v)}` : ""))
      .filter(Boolean)
      .join("; ");
  }
  return "";
}

/** Collects the labelled answers a student wrote across the whole day. */
function dayAnswers(day: number, responses: ResponseMap) {
  const d = DAYS.find((x) => x.day === day);
  if (!d) return [];
  const out: { label: string; text: string }[] = [];
  for (const section of SECTION_ORDER) {
    for (const field of pageFields(d.pages[section])) {
      const value = responses[field.key];
      if (!isAnswered(value)) continue;
      const label = "label" in field && field.label ? field.label : field.key;
      out.push({ label, text: flatten(value).slice(0, 2000) });
    }
  }
  return out.slice(0, 40);
}

export function DayReflection({
  day,
  userId,
  responses,
}: {
  day: number;
  userId: string;
  responses: ResponseMap;
}) {
  const queryClient = useQueryClient();
  const run = useServerFn(generateDaySummary);

  const cached = useQuery({
    queryKey: ["ai-summary", userId, day],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ai_summaries")
        .select("summary, generation_count")
        .eq("user_id", userId)
        .eq("day", day)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (regenerate: boolean) =>
      run({ data: { day, answers: dayAnswers(day, responses), regenerate } }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["ai-summary", userId, day] });
    },
  });

  const answered = sectionKeys(day, "reflect").some((k) => isAnswered(responses[k]));
  const summary = mutation.data?.summary ?? cached.data?.summary ?? "";
  const generations = cached.data?.generation_count ?? 0;
  const remaining = Math.max(0, 5 - generations);

  return (
    <section className="rounded-lg border border-forest/25 bg-forest p-6 text-forest-foreground">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 font-display text-xl uppercase tracking-wide text-vault">
          <Sparkles className="h-5 w-5" />
          Your coach read on Day {day}
        </h3>
        <span className="text-xs text-forest-foreground/60">{remaining} regenerations left</span>
      </div>

      <p className="mt-2 text-sm leading-relaxed text-forest-foreground/80">
        This reads everything you wrote today and hands back the pattern, the risk, and one move for
        tomorrow. Finish your reflection first so it has something honest to work with.
      </p>

      {summary ? (
        <div className="mt-4 whitespace-pre-line rounded-md bg-paper p-5 text-[15px] leading-relaxed text-ink">
          {summary}
        </div>
      ) : null}

      {mutation.isError ? (
        <p className="mt-3 text-sm text-vault">
          {mutation.error instanceof Error ? mutation.error.message : "Could not generate that."}
        </p>
      ) : null}

      <Button
        type="button"
        disabled={!answered || mutation.isPending || remaining === 0}
        onClick={() => mutation.mutate(Boolean(summary))}
        className="mt-4 bg-vault text-vault-foreground hover:bg-vault/90"
      >
        {mutation.isPending
          ? "Reading your day\u2026"
          : summary
            ? "Regenerate"
            : "Generate my end-of-day analysis"}
      </Button>

      {!answered ? (
        <p className="mt-2 text-xs text-forest-foreground/60">
          Answer today&apos;s reflection questions above to unlock this.
        </p>
      ) : null}
    </section>
  );
}
