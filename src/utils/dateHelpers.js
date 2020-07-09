import {
  isBefore,
  isAfter,
  isSameMonth,
  addMonths,
  addDays,
  lastDayOfMonth,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  format,
} from 'date-fns';

export const hasMonth = (obj, currentDate) => {
  const start = new Date(obj.startDate);
  const end = new Date(obj.endDate);
  const prevLastDay = lastDayOfMonth(addMonths(currentDate, -1));
  const nextFirstDay = addDays(lastDayOfMonth(currentDate), 1);
  const isIncluded =
    (isSameMonth(start, currentDate) || isBefore(start, nextFirstDay)) &&
    (isSameMonth(end, currentDate) || isAfter(end, prevLastDay));
  return isIncluded;
};

export const createDateArray = ({ start, end }) => {
  return eachDayOfInterval({ start, end }).map((date) => format(date, 'yyyy-MM-dd'));
};

export const createMonthArray = (date) => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  return createDateArray({ start, end });
};