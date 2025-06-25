import type { GlobalComponents } from 'vue';

import type { StringKeys } from '@/types/utils.types';

export type TableCellContent = {
  component: keyof GlobalComponents | 'span' | 'p' | null;
  arguments?: Record<string, unknown>;
  textContent?: string | number;
};

export type TableColumn<TableRow extends Record<string, unknown>> = {
  /** Подпись в хэдере столбца. */
  text: string;

  /**
   * Поле строки таблицы, по которому будет взято значение если не указан формат.
   * Также является индентификатором колоки.
   * */
  value: StringKeys<TableRow>;

  /** Функция форматирования ячейки строки, принимает строку таблицы и возвращает значение ячейки изменённом виде.  */
  format?: (row: TableRow) => string | TableCellContent;

  /** Добавляет сортировку для указанного столбца, сортирует уже имеющиеся данные */
  sortable?: boolean;
};

export type RowNumberingSettings = {
  pageIndex: number;
  pageSize: number;
};
