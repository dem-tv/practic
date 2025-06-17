import type { ComputedRef } from 'vue';

export type TabId = string | number;

export type TabListParams = {
  activeTabId: ComputedRef<TabId>;
  setActiveTab: (key: TabId) => void;
  tabList: ComputedRef<HTMLElement[]>;
};
