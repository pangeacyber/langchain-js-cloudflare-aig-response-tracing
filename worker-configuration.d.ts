interface Env {
  // biome-ignore lint/correctness/noUndeclaredVariables: global
  AI: Ai;

  CLOUDFLARE_ACCOUNT_ID: string;
  CLOUDFLARE_API_TOKEN: string;

  PANGEA_AI_GUARD_TOKEN: string;
  PANGEA_DOMAIN: string;
}
