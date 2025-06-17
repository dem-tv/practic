<script setup lang="ts" generic="Item extends Record<string, unknown>">
import type { PropType } from 'vue';

import type { StringKeys } from '@/utils/utils.types';

type ItemStringKeys = StringKeys<Item>;
type ItemKeys = keyof Item;

const props = defineProps({
  /**
   * Элементы списка.
   */
  items: {
    type: Array as PropType<Item[]>,
    default: () => [] as Item[],
  },

  /**
   * Идентификатор, по которому производится выбор ключа для элементов списка.
   */
  keyField: {
    type: String as PropType<ItemStringKeys | 'name'>,
    default: 'name',
  },
});
</script>

<template>
  <ul class="vertical-list">
    <li
      v-for="item in props.items"
      :key="item[props.keyField as ItemKeys] as string"
    >
      <slot
        name="item"
        :item="item"
      />
    </li>
  </ul>
</template>

<style lang="scss" src="./VerticalList.scss"></style>
