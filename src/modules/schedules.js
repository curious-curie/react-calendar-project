const GET_SCHEDULES = 'GET_SCHEDULES';
const CREATE_SCHEDULE = 'CREATE_SCHEDULE';
const DELETE_SCHEDULE = 'DELETE_SCHEDULE';
const EDIT_SCHEDULE = 'EDIT_SCHEDULE';

const GET_LABELS = 'GET_LABELS';
const CREATE_LABEL = 'CREATE_LABEL';

const APPLY_FILTER = 'APPLY_FILTER';
const REMOVE_FILTER = 'REMOVE_FILTER';
const RESET_FILTER = 'RESET_FILTER';

export const getSchedules = () => {
  const schedules = JSON.parse(localStorage.getItem('schedules'));
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

export const deleteSchedule = (id) => {
  return {
    type: DELETE_SCHEDULE,
    payload: id,
  };
};

export const getLabels = () => {
  // const labels = JSON.parse(localStorage.getItem('labels'));
  return {
    type: GET_LABELS,
    payload: labels,
  };
};

export const createLabel = (label) => {
  return {
    type: CREATE_LABEL,
    payload: label,
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
  labels: [
    {
      id: 1,
      title: '기본',
    },
    {
      id: 2,
      title: '회사',
      color: '#c5ebfe',
    },
  ],
  labelFilter: [],
};

export default function schedules(state = initialState, action) {
  switch (action.type) {
    case GET_SCHEDULES:
      return {
        ...state,
        schedules: action.payload,
      };
    case CREATE_SCHEDULE: {
      const newSchedules = [...state.schedules, action.payload];
      // localStorage.setItem('schedules', JSON.stringify(newSchedules));
      return {
        ...state,
        schedules: newSchedules,
      };
    }
    case DELETE_SCHEDULE: {
      const newSchedules = state.schedules.filter((schedule) => schedule.id !== action.payload);
      // localStorage.setItem('schedules', JSON.stringify(newSchedules));
      return {
        ...state,
        schedules: newSchedules,
      };
    }
    case EDIT_SCHEDULE: {
      const newSchedules = state.schedules.map((schedule) => {
        if (+schedule.id === +action.payload.id) {
          schedule = { ...action.payload };
        }
        return schedule;
      });
      // localStorage.setItem('schedules', JSON.stringify(newSchedules));
      return {
        ...state,
        schedules: newSchedules,
      };
    }
    case GET_LABELS:
      return {
        ...state,
        labels: action.payload,
      };
    case CREATE_LABEL:
      const newLabels = [...state.labels, action.payload];
      // localStorage.setItem('labels', JSON.stringify(newLabels));
      return {
        ...state,
        labels: newLabels,
      };
    case APPLY_FILTER:
      return {
        ...state,
        labelFilter: [...state.labelFilter, action.payload],
      };
    case REMOVE_FILTER:
      const newFilters = labelFilter.filter((label) => label.id !== action.payload.id);
      return {
        ...state,
        labelFilter: newFilters,
      };
    case RESET_FILTER:
      return {
        ...state,
        labelFilter: [],
      };
    default:
      return state;
  }
}
