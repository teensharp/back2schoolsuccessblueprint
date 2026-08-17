import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const input = z.object({
  day: z.number().int().min(1).max(4),
  /** Raw staff notes, transcript snippets, or bullet points from the live session. */
  notes: z.string().min(20).max(12000),
});

const DAY_TITLE: Record<number, string> = {
  1: "Monday \u2014 Reset and the six guiding behaviors",
  2: "Tuesday \u2014 Academic readiness and the college-ready roadmap",
  3: "Wednesday \u2014 Leadership, service, and time as a system",
  4: "Thursday \u2014 Opportunities, applications, and deadlines",
};

/** Staff-only: turns raw session notes into a cohort recap staff then edit and publish. */
export const draftSessionRecap = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => input.parse(data))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    const { data: staff, error: roleError } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .in("role", ["admin", "staff"]);
    if (roleError) throw new Error("Could not verify your access.");
    if (!staff || staff.length === 0) throw new Error("Staff access required.");

    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("AI is not configured for this project.");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3.5-flash",
        messages: [
          {
            role: "system",
            content:
              "You write the TeenSHARP cohort recap that appears at the top of students' guided notes after a live session. " +
              "Audience: high school students who are deeply committed to self-improvement. Assume rigor; never write to a low bar. " +
              "Voice: warm, direct, second person plural where natural. No emojis. " +
              "Structure: two sentences on what the session was really about; 'What was said that matters' with three to five specific bullets " +
              "naming speakers and concrete claims; 'What we expect you to do with it' with two to four bullets that name an action and a deadline. " +
              "Never invent quotes, names, statistics, or events that are not in the notes. Under 320 words.",
          },
          {
            role: "user",
            content: `Session: ${DAY_TITLE[data.day]}\n\nRaw notes from the session:\n\n${data.notes}`,
          },
        ],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`AI gateway failed [${res.status}]: ${text}`);
      if (res.status === 429) throw new Error("Too many requests right now. Try again in a minute.");
      if (res.status === 402) throw new Error("AI credits are exhausted for this workspace.");
      throw new Error(`AI request failed [${res.status}]`);
    }

    const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const draft = json.choices?.[0]?.message?.content?.trim() ?? "";
    if (!draft) throw new Error("The draft came back empty. Try again.");
    return { draft };
  });
