import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { OfferEngagement } from "@/components/admin/OfferEngagement";
import { RecapEditor } from "@/components/admin/RecapEditor";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { DAYS, SECTION_LABELS, SECTION_ORDER, sectionKeys } from "@/lib/content/book";
import { completionFor, isAnswered, useIsStaff, type ResponseMap } from "@/lib/responses";
import { useAuth } from "@/lib/useAuth";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Staff Dashboard | Back-to-School Blueprint" },
      {
        name: "description",
        content:
          "Staff view of student progress across Back-to-School Success Week pre-work, session notes, and blueprint labs.",
      },
      { property: "og:title", content: "Staff Dashboard | Back-to-School Blueprint" },
      { property: "og:description", content: "Track student completion across the week." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type Student = {
  id: string;
  full_name: string | null;
  school: string | null;
  grade: string | null;
  responses: ResponseMap;
};

function AdminPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { data: isStaff, isLoading: roleLoading } = useIsStaff(user?.id);

  useEffect(() => {
    if (!loading && !user) void navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  const students = useQuery({
    queryKey: ["admin-students"],
    enabled: Boolean(isStaff),
    queryFn: async (): Promise<Student[]> => {
      const [{ data: profiles, error: pErr }, { data: rows, error: rErr }] = await Promise.all([
        supabase.from("profiles").select("id, full_name, school, grade"),
        supabase.from("responses").select("user_id, question_key, value"),
      ]);
      if (pErr) throw pErr;
      if (rErr) throw rErr;

      const byUser = new Map<string, ResponseMap>();
      for (const r of rows ?? []) {
        const map = byUser.get(r.user_id) ?? {};
        map[r.question_key] = r.value;
        byUser.set(r.user_id, map);
      }
      return (profiles ?? []).map((p) => ({ ...p, responses: byUser.get(p.id) ?? {} }));
    },
  });

  if (loading || roleLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">Checking your access\u2026</p>
      </div>
    );
  }

  if (!isStaff) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 text-center">
        <div>
          <h1 className="font-display text-2xl uppercase tracking-wide text-forest">
            Staff access only
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This dashboard is limited to TeenSHARP staff accounts.
          </p>
        </div>
      </div>
    );
  }

  const list = students.data ?? [];
  const allKeys = DAYS.flatMap((d) => SECTION_ORDER.flatMap((s) => sectionKeys(d.day, s)));

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-rule bg-forest px-6 py-5 text-forest-foreground">
        <h1 className="font-display text-2xl uppercase tracking-wide">Staff Dashboard</h1>
        <p className="text-sm text-forest-foreground/75">
          {list.length} student{list.length === 1 ? "" : "s"} enrolled
        </p>
      </header>

      <div className="mx-auto max-w-7xl space-y-12 px-6 py-8">
        {students.isLoading ? (
          <p className="text-sm text-muted-foreground">Loading student progress\u2026</p>
        ) : list.length === 0 ? (
          <p className="text-sm text-muted-foreground">No students have signed up yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-rule bg-card">
            <table className="w-full min-w-[60rem] border-collapse text-sm">
              <thead>
                <tr className="bg-forest/5">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-forest">
                    Student
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-forest">
                    Overall
                  </th>
                  {DAYS.flatMap((d) =>
                    SECTION_ORDER.map((s) => (
                      <th
                        key={`${d.day}-${s}`}
                        className="px-2 py-3 text-center text-[10px] font-semibold uppercase leading-tight tracking-wide text-forest"
                      >
                        D{d.day}
                        <br />
                        {SECTION_LABELS[s].split(" ")[0]}
                      </th>
                    )),
                  )}
                </tr>
              </thead>
              <tbody>
                {list.map((s) => {
                  const overall = completionFor(s.responses, allKeys);
                  return (
                    <tr key={s.id} className="border-t border-rule">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-ink">{s.full_name ?? "Unnamed student"}</p>
                        <p className="text-xs text-muted-foreground">
                          {[s.school, s.grade ? `Grade ${s.grade}` : null]
                            .filter(Boolean)
                            .join(" \u00b7 ")}
                        </p>
                      </td>
                      <td className="w-40 px-4 py-3">
                        <Progress value={overall.pct} className="h-2" />
                        <span className="text-xs text-muted-foreground">{overall.pct}%</span>
                      </td>
                      {DAYS.flatMap((d) =>
                        SECTION_ORDER.map((sec) => {
                          const keys = sectionKeys(d.day, sec);
                          const done = keys.filter((k) => isAnswered(s.responses[k])).length;
                          const pct = keys.length ? Math.round((done / keys.length) * 100) : 0;
                          return (
                            <td key={`${d.day}-${sec}`} className="px-2 py-3 text-center">
                              <span
                                className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                                  pct === 100
                                    ? "bg-vault text-vault-foreground"
                                    : pct > 0
                                      ? "bg-forest/10 text-forest"
                                      : "text-muted-foreground"
                                }`}
                              >
                                {pct}%
                              </span>
                            </td>
                          );
                        }),
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {user?.id ? <RecapEditor authorId={user.id} /> : null}

        <OfferEngagement />
      </div>
    </div>
  );
}
