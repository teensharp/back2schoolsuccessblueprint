import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";
import { OFFERS } from "@/lib/content/offers";

type Row = { offer_id: string; placement: string; event_type: string };

export function OfferEngagement() {
  const events = useQuery({
    queryKey: ["offer-events"],
    queryFn: async (): Promise<Row[]> => {
      const { data, error } = await supabase
        .from("offer_events")
        .select("offer_id, placement, event_type");
      if (error) throw error;
      return (data ?? []) as Row[];
    },
  });

  const rows = events.data ?? [];
  const stats = OFFERS.map((offer) => {
    const mine = rows.filter((r) => r.offer_id === offer.id);
    const views = mine.filter((r) => r.event_type === "view").length;
    const clicks = mine.filter((r) => r.event_type === "click").length;
    return {
      id: offer.id,
      name: offer.title,
      views,
      clicks,
      rate: views ? Math.round((clicks / views) * 100) : 0,
    };
  });

  return (
    <section className="space-y-4">
      <div>
        <h2 className="font-display text-xl uppercase tracking-wide text-forest">
          Offer engagement
        </h2>
        <p className="text-sm text-muted-foreground">
          Views and clicks on the &ldquo;Your next step&rdquo; blocks across the book.
        </p>
      </div>
      <div className="overflow-x-auto rounded-lg border border-rule bg-card">
        <table className="w-full min-w-[36rem] border-collapse text-sm">
          <thead>
            <tr className="bg-forest/5 text-xs uppercase tracking-wide text-forest">
              <th className="px-4 py-3 text-left font-semibold">Offer</th>
              <th className="px-4 py-3 text-right font-semibold">Views</th>
              <th className="px-4 py-3 text-right font-semibold">Clicks</th>
              <th className="px-4 py-3 text-right font-semibold">Click rate</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((s) => (
              <tr key={s.id} className="border-t border-rule">
                <td className="px-4 py-3 text-ink">{s.name}</td>
                <td className="px-4 py-3 text-right">{s.views}</td>
                <td className="px-4 py-3 text-right">{s.clicks}</td>
                <td className="px-4 py-3 text-right">{s.rate}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
