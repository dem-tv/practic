const {
  MODE,
  VITE_API_HOST_DEVELOPMENT,
  VITE_API_HOST_TESTING,
  VITE_API_HOST_STAGING,
  VITE_API_HOST_PRODUCTION,
}: Record<string, string> = import.meta.env;

const API_HOSTS = {
  development: VITE_API_HOST_DEVELOPMENT,
  testing: VITE_API_HOST_TESTING,
  staging: VITE_API_HOST_STAGING,
  production: VITE_API_HOST_PRODUCTION,
} as const;

export const API_HOST = API_HOSTS[MODE as keyof typeof API_HOSTS];
