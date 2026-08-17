import { Sparkles } from "lucide-react";

import { usePublishedRecaps } from "@/lib/recaps";

/**
 * Cohort recap written by the TeenSHARP team after each live session
 * (drafted with AI, edited and published by staff).
 */
export function RecapBox({ day, section = "session" }: { day: number; section?: string }) {
  const { data, isLoading } = usePublishedRecaps();
  const recap = data?.find((r) => r.day === day && r.section === section);

  if (isLoading) return null;

  if (!recap) {
    return (
      <div className="rounded-lg border border-dashed border-forest/35 bg-vault/10 p-5">
        <p className="flex items-center gap-2 font-display text-base uppercase tracking-wide text-forest">
          <Sparkles className="h-4 w-4" />
          Session recap from the TeenSHARP team
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Your recap lands here shortly after the session ends. Take your own notes first \u2014 the
          recap is there to fill gaps, not replace your thinking.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-forest/25 bg-vault/20 p-5">
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-vault-foreground/80">
        <Sparkles className="h-4 w-4" />
        Session recap from the TeenSHARP team
      </p>
      {recap.title ? (
        <h4 className="mt-1.5 font-display text-xl uppercase tracking-wide text-forest">
          {recap.title}
        </h4>
      ) : null}
      <p className="mt-2 whitespace-pre-line text-[15px] leading-relaxed text-ink">{recap.body}</p>
    </div>
  );
}
