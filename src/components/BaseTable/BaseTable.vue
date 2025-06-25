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

const getColumnClassNames = (column: TableColumn<TableRow>) => {
  return {
    'base-table__header-cell': true,
    'base-table__header-cell--active': column.value === 'spent_hours',
  };
};
</script>

<template>
  <Vue3EasyDataTable
    table-class-name="base-table"
    class="base-table"
    :headers="props.columns"
    :items="props.rows"
    body-item-class-name="base-table__cell"
    body-row-class-name="base-table__row"
    header-class-name="base-table__header"
    :header-item-class-name="getColumnClassNames"
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
