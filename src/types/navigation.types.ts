import type { RouteLocationNamedRaw } from 'vue-router';

export type NavItem = {
  title: string;
  to: RouteLocationNamedRaw | null;
  children?: NavItem[];
};
