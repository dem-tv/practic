import { dayjs } from '@/utils/dayjs';
import { getDateMaxTime } from '@/utils/getDateMaxTime';
import { getDateNullTime } from '@/utils/getDateNullTime';

import type { DateModel, PeriodListItem } from '@/types/datePeriod.types';

import { DATE_FORMAT_PICKER, DAY_INDEXES, WEEK_DAYS_COUNT } from '@/constants/dates';

export function getDefaultPeriods(): PeriodListItem[] {
  return [
    {
      id: 'today',
      label: 'Сегодня',
      value(format): DateModel {
        const currentDay = dayjs();
        const start = getDateNullTime(currentDay, format || DATE_FORMAT_PICKER);
        const end = getDateMaxTime(currentDay, format || DATE_FORMAT_PICKER);
        return [start, end];
      },
    },
    {
      id: 'yesterday',
      label: 'Вчера',
      value(format): DateModel {
        const yesterday = dayjs().subtract(1, 'day');
        const start = getDateNullTime(yesterday, format || DATE_FORMAT_PICKER);
        const end = getDateMaxTime(yesterday, format || DATE_FORMAT_PICKER);

        return [start, end];
      },
    },
    {
      id: 'this-week',
      label: 'Эта неделя',
      value(format): DateModel {
        const currentDay = dayjs();

        if (currentDay.day() === DAY_INDEXES.SUNDAY) {
          const start = getDateNullTime(
            currentDay.subtract(WEEK_DAYS_COUNT, 'day'),
            format || DATE_FORMAT_PICKER,
          );
          const end = getDateMaxTime(currentDay, format || DATE_FORMAT_PICKER);
          return [start, end];
        }

        const start = getDateNullTime(
          currentDay.day(DAY_INDEXES.MONDAY),
          format || DATE_FORMAT_PICKER,
        );
        const end = getDateMaxTime(currentDay, format || DATE_FORMAT_PICKER);
        return [start, end];
      },
    },
    {
      id: 'this-month',
      label: 'Этот месяц',
      value(format): DateModel {
        const currentDay = dayjs();
        const start = getDateNullTime(currentDay.startOf('month'), format || DATE_FORMAT_PICKER);
        const end = getDateMaxTime(currentDay, format || DATE_FORMAT_PICKER);

        return [start, end];
      },
    },
    {
      id: 'this-year',
      label: 'Этот год',
      value(format): DateModel {
        const currentDay = dayjs();
        const start = getDateNullTime(currentDay.startOf('year'), format || DATE_FORMAT_PICKER);
        const end = getDateMaxTime(currentDay, format || DATE_FORMAT_PICKER);

        return [start, end];
      },
    },
  ];
}
