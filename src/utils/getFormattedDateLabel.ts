import { getLocaleDate, getLocaleYearMonth } from '@/utils/getLocaleDateTime';
import { uppercaseFirstLetter } from '@/utils/uppercaseFirstLetter';

import { DATE_FORMAT_PICKER, DATE_MONTH_FORMAT_PICKER } from '@/constants/dates';

export const getFormattedDateLabel = (
  date: string,
  format: typeof DATE_FORMAT_PICKER | typeof DATE_MONTH_FORMAT_PICKER = DATE_FORMAT_PICKER,
) => {
  if (format === DATE_MONTH_FORMAT_PICKER) {
    return uppercaseFirstLetter(getLocaleYearMonth(date));
  }
  return getLocaleDate(date);
};
