import { getFormattedDateTime } from '@/utils/getFormattedDateTime';

/**
 * @returns Дата (без времени), отформатированная в соответствии с региональными настройками браузера.
 */
export function getLocaleDate(date: string) {
  return getFormattedDateTime(date);
}

/**
 * @returns Дата и время, отформатированные в соответствии с региональными настройками браузера.
 */
export function getLocaleDateTime(date: string) {
  return getFormattedDateTime(date, 'dateTime');
}

/**
 * @returns Месяц и год, отформатированные в соответствии с региональными настройками браузера.
 */
export function getLocaleYearMonth(date: string) {
  return getFormattedDateTime(date, 'yearMonth');
}
