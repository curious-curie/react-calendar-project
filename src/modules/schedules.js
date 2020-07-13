import { createIntervalArray } from '@/utils/dateHelpers';
import { endOfYear, addYears } from 'date-fns';
import RRule from 'rrule';

const GET_SCHEDULES = 'GET_SCHEDULES';
const CREATE_SCHEDULE = 'CREATE_SCHEDULE';
const DELETE_SCHEDULE = 'DELETE_SCHEDULE';
const EDIT_SCHEDULE = 'EDIT_SCHEDULE';
const UPDATE_REPEAT_END = 'UPDATE_REPEAT_END';
const CREATE_REPEATED_SCHEDULES = 'CREATE_REPEATED_SCHEDULES';
const EDIT_REPEATED_SCHEDULES = 'EDIT_REPEATED_SCHEDULES';
const DELETE_REPEATED_SCHEDULES = 'DELETE_REPEATED_SCHEDULES';
const CREATE_RESERVATION = 'CREATE_RESERVATION';
const DELETE_RESERVATION = 'DELETE_RESERVATION';

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

export const updateRepeatEnd = () => {
  return {
    type: UPDATE_REPEAT_END,
  };
};

export const createRepeatedSchedules = (schedule) => {
  return {
    type: CREATE_REPEATED_SCHEDULES,
    payload: schedule,
  };
};

export const editRepeatedSchedules = (schedule) => {
  return {
    type: EDIT_REPEATED_SCHEDULES,
    payload: schedule,
  };
};

export const deleteRepeatedSchedules = (schedule) => {
  return {
    type: DELETE_REPEATED_SCHEDULES,
    payload: schedule,
  };
};

export const createReservation = (reservation) => {
  return {
    type: CREATE_RESERVATION,
    payload: reservation,
  };
};

export const deleteReservation = (reservation) => {
  return {
    type: DELETE_RESERVATION,
    payload: reservation,
  };
};
const initialState = {
  schedules: [],
  scheduleCount: [],
  repeatedSchedules: {},
  repeatEnd: endOfYear(new Date()),
  reservations: {},
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
      const id = action.payload.id.toString().split('-')[0];
      const count = { ...state.scheduleCount };
      newDate.forEach((date) => count[date]--);
      const newSchedules = state.schedules.filter((schedule) => +schedule.id !== +id);
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
      const id = action.payload.id.toString().split('-')[0];
      const newSchedules = state.schedules.map((schedule) => {
        if (+schedule.id === +id) {
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
    case UPDATE_REPEAT_END: {
      const newSchedules = { ...state.repeatedSchedules };
      const newRepeatEnd = addYears(state.repeatEnd, 1);
      Object.entries(newSchedules).forEach(([id, v]) => {
        const lastItem = v[v.length - 1];
        const createdSchedules = getRepeatedSchedules(lastItem, newRepeatEnd);
        if (state.repeatedSchedules[id]) {
          newSchedules[id] = [...state.repeatedSchedules[id], ...createdSchedules];
        }
      });
      // update repeated schedules
      return {
        ...state,
        repeatEnd: newRepeatEnd,
        repeatedSchedules: newSchedules,
      };
    }
    case CREATE_REPEATED_SCHEDULES: {
      const schedule = action.payload;
      const { id, repeatRule, start, end } = schedule;
      const createdSchedules = getRepeatedSchedules(schedule, state.repeatEnd);
      const newSchedules = { ...state.repeatedSchedules };
      if (state.repeatedSchedules[id]) {
        newSchedules[id] = [...state.repeatedSchedules[id], ...createdSchedules];
      } else {
        newSchedules[id] = createdSchedules;
      }
      return {
        ...state,
        repeatedSchedules: newSchedules,
      };
    }
    case EDIT_REPEATED_SCHEDULES: {
      const schedule = action.payload;
      const id = schedule.id.toString().split('-')[0];
      // const newSchedules = state.repeatedSchedules[schedule.id].map((item) => {
      //   return { ...action.payload, id: item.id, start: item.start, end: item.end };
      // });
      const newSchedules = getRepeatedSchedules(schedule, state.repeatEnd);
      const newRepeatedSchedules = { ...state.repeatedSchedules };
      newRepeatedSchedules[id] = newSchedules;
      return {
        ...state,
        repeatedSchedules: newRepeatedSchedules,
      };
    }
    case DELETE_REPEATED_SCHEDULES: {
      const id = action.payload.id.toString().split('-')[0];
      const newRepeatedSchedules = { ...state.repeatedSchedules };
      delete newRepeatedSchedules[id];
      return {
        ...state,
        repeatedSchedules: newRepeatedSchedules,
      };
    }
    case CREATE_RESERVATION: {
      const booking = action.payload;
      const date = booking.date;
      let newReservation = { ...state.reservations };
      if (state.reservations[date]) {
        newReservation = { ...state.reservations, [date]: [...state.reservations[date], action.payload] };
      } else {
        newReservation = { ...state.reservations, [date]: [action.payload] };
      }
      return {
        ...state,
        reservations: newReservation,
      };
    }
    case DELETE_RESERVATION: {
      const booking = action.payload;
      const date = booking.date;
      let newReservation = { ...state.reservations };
      newReservation = {
        ...state.reservations,
        [date]: state.reservations[date].filter((item) => +item.id !== +booking.id),
      };
      return {
        ...state,
        reservations: newReservation,
      };
    }
    default:
      return state;
  }
}

const getRepeatedSchedules = (schedule, until) => {
  const { id, repeatRule, start, end } = schedule;
  const offset = id.toString().split('-')[1] ? +id.toString().split('-')[1] : 0;
  const scheduleId = id.toString().split('-')[0];

  const freq = repeatRule === 'WK' || repeatRule === 'WKD' ? RRule.WEEKLY : repeatRule;
  const byweekday =
    repeatRule === 'WK'
      ? [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR]
      : repeatRule === 'WKD'
      ? [RRule.SA, RRule.SU]
      : null;

  const startRule = new RRule({
    freq,
    dtstart: new Date(start),
    until: until,
    byweekday,
  });
  const startArrays = startRule.all();
  const endRule = new RRule({
    freq,
    dtstart: new Date(end),
    count: startArrays.length,
    byweekday,
  });
  const endArrays = endRule.all();
  const createdSchedules = startArrays.map((date, index) => {
    return { ...schedule, start: date, end: endArrays[index], id: `${scheduleId}-${index + offset}` };
  });
  return createdSchedules.slice(1);
};
