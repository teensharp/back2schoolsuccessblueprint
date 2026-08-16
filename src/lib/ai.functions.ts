import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const input = z.object({
  day: z.number().int().min(1).max(4),
  /** Label/answer pairs the student wrote today, already trimmed client-side. */
  answers: z
    .array(z.object({ label: z.string().max(300), text: z.string().max(2000) }))
    .max(40),
  regenerate: z.boolean().optional(),
});

const MAX_GENERATIONS = 5;

const DAY_FOCUS: Record<number, string> = {
  1: "resetting habits and the six guiding behaviors (Striver, Learner, Applier, Connector, Giver, Starter)",
  2: "academic readiness and a college-ready course roadmap",
  3: "leadership, service, and building a real track record",
  4: "out-of-school opportunities, applications, and deadlines",
};

export const generateDaySummary = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => input.parse(data))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    const { data: existing } = await supabase
      .from("ai_summaries")
      .select("summary, generation_count")
      .eq("user_id", userId)
      .eq("day", data.day)
      .maybeSingle();

    if (existing?.summary && !data.regenerate) {
      return { summary: existing.summary, cached: true, remaining: MAX_GENERATIONS - (existing.generation_count ?? 1) };
    }

    const count = existing?.generation_count ?? 0;
    if (count >= MAX_GENERATIONS) {
      return {
        summary: existing?.summary ?? "",
        cached: true,
        remaining: 0,
        limited: true,
      };
    }

    const written = data.answers.filter((a) => a.text.trim().length > 0);
    if (written.length === 0) {
      return { summary: "", cached: false, remaining: MAX_GENERATIONS - count, empty: true };
    }

    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("AI is not configured for this project.");

    const body = {
      model: "google/gemini-3.5-flash",
      messages: [
        {
          role: "system",
          content:
            "You are a warm, direct TeenSHARP coach writing an end-of-day analysis inside a high school student's Back-to-School Blueprint. " +
            "Write in second person, plain language, no emojis, no headings longer than four words. " +
            "Structure: (1) two sentences naming the pattern you see in their own words, quoting a short phrase they wrote; " +
            "(2) 'What is working' with two bullets; (3) 'Where you will slip' with two honest bullets; " +
            "(4) 'Your one move tomorrow' with a single specific action tied to what they wrote. " +
            "Never invent facts they did not write. Under 220 words.",
        },
        {
          role: "user",
          content:
            `Day ${data.day} focus: ${DAY_FOCUS[data.day]}.\n\nThe student wrote:\n\n` +
            written.map((a) => `${a.label}\n${a.text}`).join("\n\n"),
        },
      ],
    };

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`AI gateway failed [${res.status}]: ${text}`);
      if (res.status === 429) throw new Error("Too many requests right now. Try again in a minute.");
      if (res.status === 402) throw new Error("AI credits are exhausted for this workspace.");
      throw new Error(`AI request failed [${res.status}]`);
    }

    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const summary = json.choices?.[0]?.message?.content?.trim() ?? "";
    if (!summary) throw new Error("The coach summary came back empty. Try again.");

    const { error } = await supabase.from("ai_summaries").upsert(
      {
        user_id: userId,
        day: data.day,
        summary,
        generation_count: count + 1,
      },
      { onConflict: "user_id,day" },
    );
    if (error) console.error("Failed to cache summary", error);

    return { summary, cached: false, remaining: MAX_GENERATIONS - (count + 1) };
  });
