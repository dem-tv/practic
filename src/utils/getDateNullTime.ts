import type { Dayjs } from 'dayjs';

import { dayjs } from '@/utils/dayjs';

export function getDateNullTime(date: string | Dayjs, format: string) {
  return dayjs(date, format).set('hour', 0).set('minute', 0).set('second', 0).format(format);
}
