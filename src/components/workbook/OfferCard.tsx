import { ArrowUpRight, Check } from "lucide-react";

import { offerFor } from "@/lib/content/offers";
import { trackOfferClick, useOfferView } from "@/lib/offer-tracking";

export function OfferCard({
  id,
  placement,
  userId,
  grade,
}: {
  id: string;
  placement: string;
  userId?: string | undefined;
  grade?: string | null | undefined;
}) {
  const offer = offerFor(id, grade);
  useOfferView(offer ? userId : undefined, id, placement);
  if (!offer) return null;

  const dark = offer.tone !== "vault";

  return (
    <aside
      className={`rounded-xl border p-6 print:hidden ${
        dark
          ? "border-forest/25 bg-forest text-forest-foreground"
          : "border-vault/50 bg-vault/15 text-ink"
      }`}
    >
      <p
        className={`text-xs font-bold uppercase tracking-[0.18em] ${
          dark ? "text-vault" : "text-vault-foreground/80"
        }`}
      >
        {offer.eyebrow}
      </p>
      <h4 className="mt-1 font-display text-2xl uppercase tracking-wide">{offer.title}</h4>
      <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-forest-foreground/85" : "text-ink/85"}`}>
        {offer.body}
      </p>
      <ul className="mt-3 space-y-1.5">
        {offer.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm leading-snug">
            <Check className={`mt-0.5 h-4 w-4 shrink-0 ${dark ? "text-vault" : "text-forest"}`} />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <a
          href={offer.href}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackOfferClick(userId, offer.id, placement)}
          className="inline-flex items-center gap-2 rounded-md bg-vault px-5 py-2.5 text-sm font-semibold text-vault-foreground hover:opacity-90"
        >
          {offer.cta}
          <ArrowUpRight className="h-4 w-4" />
        </a>
        <span
          className={`text-sm font-semibold ${dark ? "text-forest-foreground/80" : "text-ink/70"}`}
        >
          {offer.price}
        </span>
      </div>
    </aside>
  );
}
