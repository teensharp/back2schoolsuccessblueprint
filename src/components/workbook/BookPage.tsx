import { useNavigate } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import { useAuth } from "@/lib/useAuth";
import { useAutoSave, useProfile, useResponses, type ResponseMap } from "@/lib/responses";

import { BookShell } from "./BookShell";

const SAVE_LABELS: Record<string, string> = {
  idle: "",
  saving: "Saving\u2026",
  saved: "All changes saved",
  error: "Could not save \u2014 check your connection",
};

export type BookContext = {
  userId: string;
  responses: ResponseMap;
  setValue: (key: string, value: unknown) => void;
  grade: string | null;
};

/**
 * Wraps every workbook page: requires a session, loads answers once, and
 * hands children a save-on-type context.
 */
export function BookPage({ children }: { children: (ctx: BookContext) => ReactNode }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { data: responses } = useResponses(user?.id);
  const { data: profile } = useProfile(user?.id);
  const { setValue, state } = useAutoSave(user?.id);

  useEffect(() => {
    if (!loading && !user) void navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Opening your blueprint\u2026</p>
      </div>
    );
  }

  const map = responses ?? {};

  return (
    <BookShell
      responses={map}
      saveLabel={SAVE_LABELS[state]}
      studentName={profile?.full_name ?? undefined}
    >
      {children({ userId: user.id, responses: map, setValue, grade: profile?.grade ?? null })}
    </BookShell>
  );
}
