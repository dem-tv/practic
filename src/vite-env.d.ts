/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;

  readonly VITE_API_HOST_DEVELOPMENT: string;
  readonly VITE_API_HOST_TESTING: string;
  readonly VITE_API_HOST_STAGING: string;
  readonly VITE_API_HOST_PRODUCTION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
