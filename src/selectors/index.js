import { createSelector } from 'reselect';

const getLabelFilter = (state) => state.labels.labelFilter;
const getSchedules = (state) => state.schedules.schedules;

export const getFilteredSchedules = createSelector([getLabelFilter, getSchedules], (labelFilter, schedules) => {
  if (!labelFilter.length) return schedules;
  return schedules.filter((schedule) => labelFilter.includes(schedule.label.id));
});
