/**
 * TeenSHARP brand constants: support channels and Vault video links.
 * Staff can retune these without touching layout or content files.
 */

export const WOODSON_URL = "https://woodsonai.vercel.app/";
export const ADVISING_EMAIL = "advising@teensharp.org";

/** Base Vault watch link. Add new video IDs here and reference them by key. */
const VAULT_WATCH = "https://teensharpvault.com/watch/sample";

export const VAULT_VIDEOS = {
  habits: `${VAULT_WATCH}/2e61f0fb-2171-470a-a726-ee3ea5363417`,
  reset: `${VAULT_WATCH}/2e61f0fb-2171-470a-a726-ee3ea5363417`,
  admissions: `${VAULT_WATCH}/2e61f0fb-2171-470a-a726-ee3ea5363417`,
  studySystems: `${VAULT_WATCH}/2e61f0fb-2171-470a-a726-ee3ea5363417`,
  leadership: `${VAULT_WATCH}/2e61f0fb-2171-470a-a726-ee3ea5363417`,
  calendar: `${VAULT_WATCH}/2e61f0fb-2171-470a-a726-ee3ea5363417`,
  initiative: `${VAULT_WATCH}/2e61f0fb-2171-470a-a726-ee3ea5363417`,
  opportunities: `${VAULT_WATCH}/2e61f0fb-2171-470a-a726-ee3ea5363417`,
  applications: `${VAULT_WATCH}/2e61f0fb-2171-470a-a726-ee3ea5363417`,
} as const;

export const VAULT_HOME = "https://teensharpvault.com";
