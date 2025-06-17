import { dayjs } from '@/utils/dayjs';

type FormatType = 'date' | 'dateTime' | 'yearMonth';

const timeOptions: Partial<Intl.DateTimeFormatOptions> = {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
};

const dateOptions: Partial<Intl.DateTimeFormatOptions> = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
};

const yearMonthOptions: Partial<Intl.DateTimeFormatOptions> = {
  year: 'numeric',
  month: 'long',
};

const options: Record<FormatType, Partial<Intl.DateTimeFormatOptions>> = {
  date: dateOptions,
  dateTime: {
    ...dateOptions,
    ...timeOptions,
  },
  yearMonth: yearMonthOptions,
};

export function getFormattedDateTime(date: string, format: FormatType = 'date') {
  if (!date) {
    return '';
  }

  const dateInstance = dayjs(date).toDate();

  const formatter = new Intl.DateTimeFormat(navigator.language, options[format]);

  if (format === 'yearMonth') {
    const parts = formatter.formatToParts(dateInstance);

    const month = parts.find((part) => part.type === 'month');
    const year = parts.find((part) => part.type === 'year');

    return `${month?.value} ${year?.value}`;
  }

  return formatter.format(dateInstance);
}
