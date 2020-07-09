const GET_LABELS = 'GET_LABELS';
const CREATE_LABEL = 'CREATE_LABEL';
const APPLY_FILTER = 'APPLY_FILTER';
const REMOVE_FILTER = 'REMOVE_FILTER';
const RESET_FILTER = 'RESET_FILTER';

export const getLabels = () => {
  // const labels = JSON.parse(localStorage.getItem('labels'));
  return {
    type: GET_LABELS,
  };
};

export const createLabel = (label) => {
  return {
    type: CREATE_LABEL,
    payload: label,
  };
};

const initialState = {
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

export default function labels(state = initialState, action) {
  switch (action.type) {
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
