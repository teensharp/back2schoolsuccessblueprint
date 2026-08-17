import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";

export type SessionRecap = {
  id: string;
  day: number;
  section: string;
  title: string;
  body: string;
  published: boolean;
  updated_at: string;
};

const RECAPS_KEY = ["session-recaps"] as const;

/** Published recaps only — this is what students read at the top of their notes. */
export function usePublishedRecaps() {
  return useQuery({
    queryKey: [...RECAPS_KEY, "published"],
    queryFn: async (): Promise<SessionRecap[]> => {
      const { data, error } = await supabase
        .from("session_summaries")
        .select("id, day, section, title, body, published, updated_at")
        .eq("published", true);
      if (error) throw error;
      return (data ?? []) as SessionRecap[];
    },
  });
}

/** Every recap, draft or published. Staff only — RLS enforces it. */
export function useAllRecaps(enabled: boolean) {
  return useQuery({
    queryKey: [...RECAPS_KEY, "all"],
    enabled,
    queryFn: async (): Promise<SessionRecap[]> => {
      const { data, error } = await supabase
        .from("session_summaries")
        .select("id, day, section, title, body, published, updated_at")
        .order("day");
      if (error) throw error;
      return (data ?? []) as SessionRecap[];
    },
  });
}

export function useSaveRecap() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (recap: {
      day: number;
      section?: string;
      title: string;
      body: string;
      published: boolean;
      authorId: string;
    }) => {
      const { error } = await supabase.from("session_summaries").upsert(
        {
          day: recap.day,
          section: recap.section ?? "session",
          title: recap.title,
          body: recap.body,
          published: recap.published,
          author_id: recap.authorId,
        },
        { onConflict: "day,section" },
      );
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: RECAPS_KEY }),
  });
}
