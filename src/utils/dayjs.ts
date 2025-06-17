import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isYesterday from 'dayjs/plugin/isYesterday';
import minMax from 'dayjs/plugin/minMax';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import relativeTime from 'dayjs/plugin/relativeTime';
import toObject from 'dayjs/plugin/toObject';

dayjs.extend(customParseFormat);
dayjs.extend(toObject);
dayjs.extend(relativeTime);
dayjs.extend(isYesterday);
dayjs.extend(quarterOfYear);
dayjs.extend(minMax);

export { dayjs };
