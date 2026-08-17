import { Mail, MessageCircle } from "lucide-react";

import { ADVISING_EMAIL, WOODSON_URL } from "@/lib/brand";

/** Support line that appears at the bottom of every page of the book. */
export function HelpFooter() {
  return (
    <footer className="mt-12 rounded-lg border border-rule bg-card p-5 print:mt-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-display text-sm uppercase tracking-[0.18em] text-forest">
            If you have questions
          </p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Ask Woodson, TeenSHARP&rsquo;s virtual advisor, any time &mdash; or email the advising
            team and a person will get back to you.
          </p>
          <div className="mt-3 flex flex-wrap gap-2 print:hidden">
            <a
              href={WOODSON_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-forest px-4 py-2 text-sm font-semibold text-forest-foreground hover:bg-forest/90"
            >
              <MessageCircle className="h-4 w-4" />
              Ask Woodson
            </a>
            <a
              href={`mailto:${ADVISING_EMAIL}`}
              className="inline-flex items-center gap-2 rounded-md border border-forest/30 px-4 py-2 text-sm font-semibold text-forest hover:bg-forest/10"
            >
              <Mail className="h-4 w-4" />
              {ADVISING_EMAIL}
            </a>
          </div>
          <p className="mt-2 hidden text-sm text-ink print:block">
            Woodson: {WOODSON_URL} &middot; {ADVISING_EMAIL}
          </p>
        </div>
      </div>
    </footer>
  );
}
