import { isBefore, isAfter, startOfMonth, lastDayOfMonth, eachDayOfInterval, format } from 'date-fns';
import { hasMonth, createDateArray } from '@/utils/dateHelpers';
import { store } from './index';

// export const getEventsByMonth = (currentDate) => {
//   const { schedules } = store.getState().schedules;
//   let newSchedules = [];
//   schedules.forEach((schedule) => {
//     if (hasMonth(schedule, currentDate)) {
//       const start = isBefore( (schedule.start), startOfMonth(currentDate))
//         ? startOfMonth(currentDate)
//         :  (schedule.start);
//       const end = isAfter( (schedule.end), lastDayOfMonth(currentDate))
//         ? lastDayOfMonth(currentDate)
//         :  (schedule.end);
//       if (isBefore(end, start)) return [];
//       const dateArray = createDateArray({ start, end });
//       dateArray.forEach((date) => {
//         const items = newSchedules[date];
//         newSchedules[date] = items ? [...items, schedule] : [schedule];
//       });
//     }
//   });
//   return newSchedules;
// };
// temporary commented out since not used

// export const getSchedulesByMonth = (currentDate, schedules) => {
//   let newSchedules = [];
//   schedules.forEach((schedule) => {
//     if (hasMonth(schedule, currentDate)) {
//       const start = isBefore(schedule.start, startOfMonth(currentDate)) ? startOfMonth(currentDate) : schedule.start;
//       const end = isAfter(schedule.end, lastDayOfMonth(currentDate)) ? lastDayOfMonth(currentDate) : schedule.end;
//       if (isBefore(end, start)) return [];
//       const dateArray = createDateArray({ start, end });
//       dateArray.forEach((date) => {
//         const items = newSchedules[date];
//         newSchedules[date] = items ? [...items, schedule] : [schedule];
//       });
//     }
//   });
//   return newSchedules;
// };
//temporary for test

export const getSchedules = (dates, schedules) => {
  let newSchedules = [];
  dates.forEach((currentDate) => {
    schedules.forEach((schedule) => {
      if (hasMonth(schedule, currentDate)) {
        const start = isBefore(schedule.start, startOfMonth(currentDate)) ? startOfMonth(currentDate) : schedule.start;
        const end = isAfter(schedule.end, lastDayOfMonth(currentDate)) ? lastDayOfMonth(currentDate) : schedule.end;
        if (isBefore(end, start)) return [];
        const dateArray = createDateArray({ start, end });
        dateArray.forEach((date) => {
          const items = newSchedules[date];
          newSchedules[date] = items ? [...items, schedule] : [schedule];
        });
      }
    });
  });
  return newSchedules;
};
//temporary for test

export const getEventByID = (id) => {
  const { schedules } = store.getState().schedules;
  return schedules.find((schedule) => +schedule.id === +id);
};
