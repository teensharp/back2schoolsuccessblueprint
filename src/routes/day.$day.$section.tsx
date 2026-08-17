import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { BookPage } from "@/components/workbook/BookPage";
import { PageRenderer } from "@/components/workbook/PageRenderer";
import { DayReflection } from "@/components/workbook/DayReflection";
import { SECTION_LABELS, bookOrder, getPage } from "@/lib/content/book";
import type { SectionId } from "@/lib/content/types";

export const Route = createFileRoute("/day/$day/$section")({
  ssr: false,
  head: ({ params }) => {
    const page = getPage(Number(params.day), params.section);
    const title = page
      ? `${page.title} \u2014 Day ${page.day} | Back-to-School Blueprint`
      : "Back-to-School Blueprint";
    const description = page
      ? page.subtitle ??
        page.coreQuestion ??
        `Day ${page.day} ${page.eyebrow} for TeenSHARP Bridge Week 2026.`
      : "Your fillable Back-to-School Success Week workbook.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: DaySectionPage,
});

function DaySectionPage() {
  const { day, section } = Route.useParams();
  const page = getPage(Number(day), section);
  if (!page) throw notFound();

  const order = bookOrder();
  const idx = order.findIndex((o) => o.day === Number(day) && o.section === section);
  const prev = idx > 0 ? order[idx - 1] : undefined;
  const next = idx >= 0 && idx < order.length - 1 ? order[idx + 1] : undefined;

  return (
    <BookPage>
      {(ctx) => (
        <div className="space-y-10">
          <PageRenderer page={page} ctx={{
              responses: ctx.responses,
              onChange: ctx.setValue,
              userId: ctx.userId,
              grade: ctx.grade,
            }} />

          {section === "reflect" ? (
            <DayReflection day={Number(day)} userId={ctx.userId} responses={ctx.responses} />
          ) : null}

          <nav className="flex items-center justify-between gap-4 border-t border-rule pt-6">
            {prev ? (
              <Link
                to="/day/$day/$section"
                params={{ day: String(prev.day), section: prev.section }}
                className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                Day {prev.day} &middot; {SECTION_LABELS[prev.section as SectionId]}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                to="/day/$day/$section"
                params={{ day: String(next.day), section: next.section }}
                className="inline-flex items-center gap-2 rounded-md bg-forest px-4 py-2 text-sm font-semibold text-forest-foreground hover:bg-forest/90"
              >
                Day {next.day} &middot; {SECTION_LABELS[next.section as SectionId]}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <Link
                to="/blueprint"
                className="inline-flex items-center gap-2 rounded-md bg-forest px-4 py-2 text-sm font-semibold text-forest-foreground hover:bg-forest/90"
              >
                See my finished blueprint
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </nav>
        </div>
      )}
    </BookPage>
  );
}
