const CREATE_LABEL = 'labels/CREATE_LABEL';
const DELETE_LABEL = 'labels/DELETE_LABEL';
const APPLY_FILTER = 'labels/APPLY_FILTER';
const REMOVE_FILTER = 'labels/REMOVE_FILTER';
const RESET_FILTER = 'labels/RESET_FILTER';

export const applyFilter = (id) => {
  return {
    type: APPLY_FILTER,
    payload: id,
  };
};

export const removeFilter = (id) => {
  return {
    type: REMOVE_FILTER,
    payload: id,
  };
};

export const resetFilter = () => {
  return {
    type: RESET_FILTER,
  };
};

export const createLabel = (label) => {
  return {
    type: CREATE_LABEL,
    payload: label,
  };
};

export const deleteLabel = (label) => {
  return {
    type: DELETE_LABEL,
    payload: label,
  };
};

const initialState = {
  labels: [
    {
      id: 1,
      title: '기본',
      visible: true,
    },
  ],
  labelFilter: [],
};

export default function labels(state = initialState, action) {
  switch (action.type) {
    case CREATE_LABEL: {
      const newLabels = [...state.labels, action.payload];
      return {
        ...state,
        labels: newLabels,
      };
    }
    case DELETE_LABEL: {
      const newLabels = state.labels.map((label) => {
        if (label.id === action.payload.id) {
          return { ...label, visible: false };
        }
        return label;
      });
      return {
        ...state,
        labels: newLabels,
      };
    }
    case APPLY_FILTER:
      return {
        ...state,
        labelFilter: [...state.labelFilter, action.payload],
      };
    case REMOVE_FILTER:
      const newFilters = state.labelFilter.filter((label) => label !== action.payload);
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
