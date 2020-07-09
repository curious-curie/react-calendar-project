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
      endDate: '2020-07-17',
      id: 1,
      label: { id: 1, title: '기본' },
      memo: '1234',
      startDate: '2020-07-14',
      title: 'test123',
    },
    {
      endDate: '2020-08-27',
      id: 2,
      label: { id: 2, title: '회사' },
      memo: '회사일임',
      startDate: '2020-06-11',
      title: '회사일',
    },
    {
      endDate: '2020-07-13T13:00',
      id: 3,
      label: { id: 2, title: '회사' },
      memo: '회사일임',
      startDate: '2020-07-13T13:00',
      title: '2',
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
      const newDate = createIntervalArray([action.payload.startDate, action.payload.endDate]);
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
      const newDate = createIntervalArray([action.payload.startDate, action.payload.endDate]);
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
          prevDate = createIntervalArray([schedule.startDate, schedule.endDate]);
          nextDate = createIntervalArray([action.payload.startDate, action.payload.endDate]);
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
