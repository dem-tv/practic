import type { Dayjs } from 'dayjs';

import { dayjs } from '@/utils/dayjs';

import { MAX_HOURS, MAX_MINUTES, MAX_SECONDS } from '@/constants/dates';

export function getDateMaxTime(date: string | Dayjs, format: string) {
  return dayjs(date, format)
    .set('hour', MAX_HOURS)
    .set('minute', MAX_MINUTES)
    .set('second', MAX_SECONDS)
    .format(format);
}
