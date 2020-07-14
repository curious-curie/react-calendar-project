import {
  isBefore,
  isAfter,
  isSameMonth,
  addMonths,
  addDays,
  isSameDay,
  lastDayOfMonth,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  format,
} from 'date-fns';

export const hasMonth = (obj, currentDate) => {
  const start = new Date(obj.start);
  const end = new Date(obj.end);
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

export const createIntervalArray = (dates) => {
  const start = new Date(dates[0]);
  const end = new Date(dates[1]);
  return eachDayOfInterval({ start, end }).map((date) => format(date, 'yyyy-MM-dd'));
};

export const createMonthArray = (date) => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  return createDateArray({ start, end });
};

export const getSchedulesByMonth = (currentDate, schedules) => {
  let newSchedules = [];
  schedules.forEach((schedule) => {
    if (hasMonth(schedule, currentDate)) {
      const start = isBefore(schedule.start, startOfMonth(currentDate)) ? startOfMonth(currentDate) : schedule.start;
      const end =
        isAfter(schedule.end, lastDayOfMonth(currentDate)) || isSameDay(schedule.end, lastDayOfMonth(currentDate))
          ? lastDayOfMonth(currentDate)
          : schedule.end;
      if (!isSameDay(end, start) && isBefore(end, start)) {
        return [];
      }
      let dateArray = isSameDay(end, start) ? createDateArray({ start, end: start }) : createDateArray({ start, end });
      dateArray.forEach((date) => {
        const items = newSchedules[date];
        newSchedules[date] = items ? [...items, schedule] : [schedule];
      });
    }
  });
  return newSchedules;
};

export const getSchedulesByDates = (dates, schedules) => {
  let newSchedules = [];
  dates.forEach((currentDate) => {
    schedules.forEach((schedule) => {
      if (hasMonth(schedule, currentDate)) {
        const start = isBefore(schedule.start, startOfMonth(currentDate)) ? startOfMonth(currentDate) : schedule.start;
        const end = isAfter(schedule.end, lastDayOfMonth(currentDate)) ? lastDayOfMonth(currentDate) : schedule.end;
        if (!isSameDay(end, start) && isBefore(end, start)) {
          return [];
        }
        let dateArray = isSameDay(end, start)
          ? createDateArray({ start, end: start })
          : createDateArray({ start, end });
        dateArray.forEach((date) => {
          const items = newSchedules[date];
          newSchedules[date] = items ? [...items, schedule] : [schedule];
        });
      }
    });
  });
  return newSchedules;
};
