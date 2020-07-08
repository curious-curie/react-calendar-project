import { store } from './index';
import {
  isBefore,
  isAfter,
  isSameMonth,
  addMonths,
  addDays,
  startOfMonth,
  lastDayOfMonth,
  eachDayOfInterval,
  format,
} from 'date-fns';

export const getEventsByMonth = (currentDate) => {
  const { schedules } = store.getState().schedules;
  let newSchedules = [];
  schedules.forEach((schedule) => {
    if (hasMonth(schedule, currentDate)) {
      const start = isBefore(new Date(schedule.startDate), startOfMonth(currentDate))
        ? startOfMonth(currentDate)
        : new Date(schedule.startDate);
      const end = isAfter(new Date(schedule.endDate), lastDayOfMonth(currentDate))
        ? lastDayOfMonth(currentDate)
        : new Date(schedule.endDate);
      if (isBefore(end, start)) return [];
      const dateArray = eachDayOfInterval({ start, end }).map((date) => format(date, 'yyyy-MM-dd'));
      dateArray.forEach((date) => {
        const items = newSchedules[date];
        newSchedules[date] = items ? [...items, schedule] : [schedule];
      });
    }
  });
  return newSchedules;
};

export const getEventByID = (id) => {
  const { schedules } = store.getState().schedules;
  return schedules.find((schedule) => +schedule.id === id);
};

const hasMonth = (obj, currentDate) => {
  const start = new Date(obj.startDate);
  const end = new Date(obj.endDate);
  const prevLastDay = lastDayOfMonth(addMonths(currentDate, -1));
  const nextFirstDay = addDays(lastDayOfMonth(currentDate), 1);
  const isIncluded =
    (isSameMonth(start, currentDate) || isBefore(start, nextFirstDay)) &&
    (isSameMonth(end, currentDate) || isAfter(end, prevLastDay));
  return isIncluded;
};
