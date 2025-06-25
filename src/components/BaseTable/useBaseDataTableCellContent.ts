import type { TableCellContent, TableColumn } from '@/types/table.types';

type Settings<TableRow extends Record<string, unknown>> = {
  columns: () => TableColumn<TableRow>[];
};

/**
 * @returns Map, состоящий из ссылки на колонку и объекта с полем format, возвращающего отформатированный контент.
 */
export function useBaseDataTableCellContent<TableRow extends Record<string, unknown>>(
  settings: Settings<TableRow>,
) {
  const columns = toRef(settings.columns);

  const formattedCellsContent = computed(() => {
    const mappedContent: Map<
      TableColumn<TableRow>,
      { format: (TableRow) => TableCellContent }
    > = new Map();

    columns.value.forEach((column) => {
      if (column.format) {
        const format = (row: TableRow) => {
          const result = column.format
            ? column.format(row)
            : {
                component: null,
              };

          return typeof result === 'string'
            ? {
                textContent: result,
                component: null,
              }
            : result;
        };

        mappedContent.set(unref(column), { format });
      }
    });

    return mappedContent;
  });

  return { formattedCellsContent, column: columns.value[0] };
}
