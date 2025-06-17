<script setup lang="ts">
import type { PropType } from 'vue';
import type { RouteLocationNamedRaw } from 'vue-router';

import type { TabId, TabListParams } from '@/types/tabList.types';

const props = defineProps({
  /**
   * Страница, на которую переадресовывает вкладка при помощи `router-link`.
   */
  to: {
    type: Object as PropType<RouteLocationNamedRaw>,
    default: null,
  },

  /**
   * ID элемента, по которому будет производиться сравнение для выбора активной вкладки
   * Если если model родительского элемента string, иначе сравнивает по индексу в списке
   */
  id: {
    type: [String, Number] as PropType<TabId>,
    default: null,
  },

  /**
   * Состояние заблокированного поля.
   */
  disabled: {
    type: Boolean,
    default: false,
  },
});

const { activeTabId, setActiveTab, tabList } = inject('active-tab') as TabListParams;

const listItem = ref();

const currentNodeIndex = computed(() => {
  if (tabList.value) {
    return tabList.value?.indexOf(listItem.value);
  }

  return 0;
});

const isStringModel = computed(() => typeof activeTabId.value === 'string');

const isActive = computed(() => {
  if (isStringModel.value) {
    return activeTabId.value === props.id;
  }

  return activeTabId.value === currentNodeIndex.value;
});

function onClick() {
  if (isStringModel.value) {
    setActiveTab(props.id);
    return;
  }

  setActiveTab(currentNodeIndex.value);
}
</script>

<template>
  <li
    ref="listItem"
    class="tab-list-item"
  >
    <TabButton
      :to="props.to"
      :active="isActive"
      :disabled="props.disabled"
      @click="onClick"
    >
      <slot />
    </TabButton>
  </li>
</template>

<style lang="scss" src="./TabListItem.scss"></style>
