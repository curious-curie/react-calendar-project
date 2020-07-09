import { createIntervalArray } from '@/utils/dateHelpers';

const GET_SCHEDULES = 'GET_SCHEDULES';
const CREATE_SCHEDULE = 'CREATE_SCHEDULE';
const DELETE_SCHEDULE = 'DELETE_SCHEDULE';
const EDIT_SCHEDULE = 'EDIT_SCHEDULE';

export const getSchedules = () => {
  // const schedules = JSON.parse(localStorage.getItem('schedules'));
  return {
    type: GET_SCHEDULES,
    payload: schedules,
  };
};

export const createSchedule = (schedule) => {
  return {
    type: CREATE_SCHEDULE,
    payload: schedule,
  };
};

export const editSchedule = (schedule) => {
  return {
    type: EDIT_SCHEDULE,
    payload: schedule,
  };
};

export const deleteSchedule = (schedule) => {
  return {
    type: DELETE_SCHEDULE,
    payload: schedule,
  };
};

const initialState = {
  schedules: [
    {
      end: new Date('2020-07-17'),
      id: 13412341234,
      label: { id: 1, title: '기본' },
      memo: '1234',
      start: new Date('2020-07-01'),
      allDay: true,
      title: '기본',
    },
    {
      end: new Date('2020-07-01'),
      id: 223512531235,
      label: { id: 2, title: '회사', color: 'skyblue' },
      memo: '회사일임',
      allDay: true,
      start: new Date('2020-06-11'),
      title: '회사일',
    },
    {
      end: new Date('2020-09-13T13:00'),
      id: 31461346134,
      label: { id: 2, title: '회사', color: 'skyblue' },
      memo: '회사일임',
      start: new Date('2020-07-01T13:00'),
      allDay: false,
      title: '회사2',
    },
  ],
  scheduleCount: [],
};

export default function schedules(state = initialState, action) {
  switch (action.type) {
    case GET_SCHEDULES:
      return {
        ...state,
        schedules: action.payload,
      };
    case CREATE_SCHEDULE: {
      const newDate = createIntervalArray([action.payload.start, action.payload.end]);
      const count = { ...state.scheduleCount };
      newDate.forEach((date) => {
        count[date] ? count[date]++ : (count[date] = 1);
      });
      const newSchedules = [...state.schedules, action.payload];
      // localStorage.setItem('schedules', JSON.stringify(newSchedules));
      return {
        ...state,
        schedules: newSchedules,
        scheduleCount: count,
      };
    }
    case DELETE_SCHEDULE: {
      const newDate = createIntervalArray([action.payload.start, action.payload.end]);
      const count = { ...state.scheduleCount };
      newDate.forEach((date) => count[date]--);
      const newSchedules = state.schedules.filter((schedule) => schedule.id !== action.payload.id);
      // localStorage.setItem('schedules', JSON.stringify(newSchedules));
      return {
        ...state,
        schedules: newSchedules,
        scheduleCount: count,
      };
    }
    case EDIT_SCHEDULE: {
      let prevDate, nextDate;
      const count = { ...state.scheduleCount };
      const newSchedules = state.schedules.map((schedule) => {
        if (+schedule.id === +action.payload.id) {
          prevDate = createIntervalArray([schedule.start, schedule.end]);
          nextDate = createIntervalArray([action.payload.start, action.payload.end]);
          schedule = { ...action.payload };
        }
        return schedule;
      });
      prevDate.forEach((date) => count[date]--);
      nextDate.forEach((date) => {
        count[date] ? count[date]++ : (count[date] = 1);
      });
      // localStorage.setItem('schedules', JSON.stringify(newSchedules));
      return {
        ...state,
        schedules: newSchedules,
        scheduleCount: count,
      };
    }
    default:
      return state;
  }
}
