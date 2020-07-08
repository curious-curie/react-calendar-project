const GET_SCHEDULES = 'GET_SCHEDULES';
const CREATE_SCHEDULE = 'CREATE_SCHEDULE';
const DELETE_SCHEDULE = 'DELETE_SCHEDULE';
const EDIT_SCHEDULE = 'EDIT_SCHEDULE';
const GET_LABELS = 'GET_LABELS';
const CREATE_LABEL = 'CREATE_LABEL';

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
  schedules: [],
  labels: [
    {
      id: 1,
      title: '기본',
    },
  ],
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
      const newSchedules = state.schedules.filter(
        schedule.id !== action.payload
      );
      // localStorage.setItem('schedules', JSON.stringify(newSchedules));
      return {
        ...state,
        schedules: newSchedules,
      };
    }
    case EDIT_SCHEDULE: {
      const newSchedules = state.schedules.map((schedule) => {
        if (schedule.id === action.payload.id) {
          schedule = { ...action.payload };
        }
        return newSchedules;
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
    default:
      return state;
  }
}
