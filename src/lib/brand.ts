/**
 * TeenSHARP brand constants: support channels and Vault video links.
 * Staff can retune these without touching layout or content files.
 */

export const WOODSON_URL = "https://woodsonai.vercel.app/";
export const ADVISING_EMAIL = "advising@teensharp.org";

/** Base Vault watch link. Add new video IDs here and reference them by key. */
const VAULT_WATCH = "https://teensharpvault.com/watch/sample";

/** Real Vault videos — titles copied exactly from teensharpvault.com. */
export const VAULT_VIDEOS = {
  camila: {
    title: "How Camila Changed Her Mindset and Her High School Journey",
    href: `${VAULT_WATCH}/2e61f0fb-2171-470a-a726-ee3ea5363417`,
  },
  aja: {
    title: "Choosing Challenge: Why Aja Leveled Up Her Curriculum",
    href: `${VAULT_WATCH}/341e7123-5871-4eae-87c6-2de31202ec40`,
  },
  rafael: {
    title: "How Rafael Navigated an Intense Senior Year of High School",
    href: `${VAULT_WATCH}/1a5cf6a3-2d04-43ad-b171-b5084e4a6317`,
  },
  dami: {
    title: "How Dami Fell in Love with Math in College",
    href: `${VAULT_WATCH}/c9ddfbfd-29f5-48de-bca8-6c3615cc4d01`,
  },
} as const;

export const VAULT_HOME = "https://teensharpvault.com";
