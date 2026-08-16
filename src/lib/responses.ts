import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";

import { supabase } from "@/integrations/supabase/client";

export type ResponseMap = Record<string, unknown>;

export const RESPONSES_KEY = ["responses"] as const;

export function useResponses(userId: string | undefined) {
  return useQuery({
    queryKey: [...RESPONSES_KEY, userId],
    enabled: Boolean(userId),
    queryFn: async (): Promise<ResponseMap> => {
      const { data, error } = await supabase.from("responses").select("question_key, value");
      if (error) throw error;
      const map: ResponseMap = {};
      for (const row of data ?? []) map[row.question_key] = row.value;
      return map;
    },
  });
}

export type SaveState = "idle" | "saving" | "saved" | "error";

/**
 * Debounced auto-save. Writes go into the local query cache immediately so
 * typing never stalls, then upsert to the database after a short pause.
 */
export function useAutoSave(userId: string | undefined) {
  const queryClient = useQueryClient();
  const [state, setState] = useState<SaveState>("idle");
  const pending = useRef<Map<string, unknown>>(new Map());
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flush = useCallback(async () => {
    if (!userId || pending.current.size === 0) return;
    const batch = Array.from(pending.current.entries()).map(([question_key, value]) => ({
      user_id: userId,
      question_key,
      value: value as never,
    }));
    pending.current.clear();
    setState("saving");
    const { error } = await supabase
      .from("responses")
      .upsert(batch, { onConflict: "user_id,question_key" });
    if (error) {
      console.error("Auto-save failed", error);
      setState("error");
      return;
    }
    setState("saved");
  }, [userId]);

  const setValue = useCallback(
    (key: string, value: unknown) => {
      queryClient.setQueryData<ResponseMap>([...RESPONSES_KEY, userId], (prev) => ({
        ...(prev ?? {}),
        [key]: value,
      }));
      pending.current.set(key, value);
      setState("saving");
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => void flush(), 700);
    },
    [flush, queryClient, userId],
  );

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
      void flush();
    };
  }, [flush]);

  return { setValue, state, flushNow: flush };
}

export function useProfile(userId: string | undefined) {
  return useQuery({
    queryKey: ["profile", userId],
    enabled: Boolean(userId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, school, grade")
        .eq("id", userId!)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });
}

export function useSaveProfile(userId: string | undefined) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (patch: { full_name?: string; school?: string; grade?: string }) => {
      if (!userId) throw new Error("Not signed in");
      const { error } = await supabase
        .from("profiles")
        .upsert({ id: userId, ...patch }, { onConflict: "id" });
      if (error) throw error;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["profile", userId] });
    },
  });
}

export function useIsStaff(userId: string | undefined) {
  return useQuery({
    queryKey: ["is-staff", userId],
    enabled: Boolean(userId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId!);
      if (error) throw error;
      return (data ?? []).some((r) => r.role === "admin" || r.role === "staff");
    },
  });
}

/** A field counts as answered when it holds any non-empty content. */
export function isAnswered(value: unknown): boolean {
  if (value == null) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.some((v) => isAnswered(v));
  if (typeof value === "object") {
    return Object.values(value as Record<string, unknown>).some((v) => isAnswered(v));
  }
  return true;
}

export function completionFor(responses: ResponseMap | undefined, keys: string[]) {
  if (keys.length === 0) return { done: 0, total: 0, pct: 0 };
  const done = keys.filter((k) => isAnswered(responses?.[k])).length;
  return { done, total: keys.length, pct: Math.round((done / keys.length) * 100) };
}
