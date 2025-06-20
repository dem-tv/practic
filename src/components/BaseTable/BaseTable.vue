<script setup lang="ts" generic="TableRow extends Record<string, unknown>">
import Vue3EasyDataTable from 'vue3-easy-data-table';

import type { TableColumn } from '@/types/table.types';

import { useBaseDataTableCellContent } from '@/components/BaseTable/useBaseDataTableCellContent';

const props = defineProps({
  /**
   * Данные столбцов таблицы.
   * Каждый столбец - объект с полями:
   * `text` - подпись в хэдере столбца,
   * `value` - поле строки таблицы, которое будет выведено под этим столбцом,
   * `format` - форматирование ячеек для текущего столбца,
   */
  columns: {
    type: Array as PropType<TableColumn<TableRow>[]>,
    default: () => [],
  },
  /**
   * Строки таблицы, содержащие данные ячеек.
   * Каждая срока - массив объектов, в которых:
   * ключ - поле `column.filed`,
   * значение - значение, выводимое в ячейке.
   */
  rows: {
    type: Array as PropType<TableRow[]>,
    default: () => [],
  },
});

const { formattedCellsContent } = useBaseDataTableCellContent({
  columns: () => props.columns,
});
</script>

<template>
  <Vue3EasyDataTable
    :headers="props.columns"
    :items="props.rows"
    hide-footer
  >
    <template #header="column">
      {{ column.text }}
    </template>
    <template
      v-for="column in props.columns"
      #[`item-${column.value}`]="item"
      :key="column.text"
    >
      <BaseDataTableCellContent
        v-if="formattedCellsContent?.get(column)?.format"
        v-bind="formattedCellsContent?.get(column)?.format(item) || {}"
      />
      <template v-else>
        {{ item[column.value] }}
      </template>
    </template>
  </Vue3EasyDataTable>
</template>

<style src="./BaseTable.scss"></style>
