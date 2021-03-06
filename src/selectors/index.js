import { createSelector } from 'reselect';

const getLabelFilter = (state) => state.labels.labelFilter;
const getSchedules = (state) => state.schedules.schedules;
const getRepeatedSchedules = (state) => state.schedules.repeatedSchedules;

export const getMergedSchedules = createSelector(
  [getSchedules, getRepeatedSchedules],
  (schedules, repeatedSchedules) => {
    const itemsToAppend = Object.values(repeatedSchedules)
      .map((item) => item)
      .flat();
    const merged = [...itemsToAppend, ...schedules];
    return merged;
  }
);

export const getFilteredSchedules = createSelector([getLabelFilter, getMergedSchedules], (labelFilter, merged) => {
  if (!labelFilter.length) return merged;
  return merged.filter((schedule) => labelFilter.includes(schedule.label.id));
});

export const getScheduleById = (state, id) => {
  const { schedules } = state.schedules;
  return schedules.find((schedule) => +schedule.id === +id);
};
