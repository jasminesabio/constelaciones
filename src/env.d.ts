/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly AIRTABLE_BASE_ID: string;
  readonly AIRTABLE_API_KEY: string;
  readonly CONSTELACIONES_PASSWORD: string;
  readonly NOTIFICATION_EMAIL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}