<script setup lang="ts">
import type { TabId, TabListParams } from '@/types/tabList.types';

/** Принимает и отдаёт ключ таба. */
const model = defineModel<TabId>({ default: 0 });

const elementList = ref();

const activeTabId = computed(() => model.value);

const tabList = computed(() => {
  if (elementList.value?.children) {
    return Array.from(elementList.value.children) satisfies HTMLElement[];
  }

  return [] as HTMLElement[];
});

function setActiveTab(value: string | number) {
  model.value = value;
}

provide<TabListParams>('active-tab', { activeTabId, setActiveTab, tabList });
</script>

<template>
  <ul
    ref="elementList"
    class="tab-list"
  >
    <slot />
  </ul>
</template>

<style lang="scss" src="./TabList.scss"></style>
