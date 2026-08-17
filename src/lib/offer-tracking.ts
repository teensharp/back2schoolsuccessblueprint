import { useEffect, useRef } from "react";

import { supabase } from "@/integrations/supabase/client";

type EventType = "view" | "click";

const seen = new Set<string>();

async function record(
  userId: string | undefined,
  offerId: string,
  placement: string,
  eventType: EventType,
) {
  if (!userId) return;
  const dedupe = `${userId}:${offerId}:${placement}:${eventType}`;
  if (eventType === "view") {
    if (seen.has(dedupe)) return;
    seen.add(dedupe);
  }
  const { error } = await supabase.from("offer_events").insert({
    user_id: userId,
    offer_id: offerId,
    placement,
    event_type: eventType,
  });
  if (error) console.error("Offer event failed", error);
}

/** Logs a single view per offer + placement per session. */
export function useOfferView(userId: string | undefined, offerId: string, placement: string) {
  const done = useRef(false);
  useEffect(() => {
    if (done.current) return;
    done.current = true;
    void record(userId, offerId, placement, "view");
  }, [userId, offerId, placement]);
}

export function trackOfferClick(
  userId: string | undefined,
  offerId: string,
  placement: string,
) {
  void record(userId, offerId, placement, "click");
}
