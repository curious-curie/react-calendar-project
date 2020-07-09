import { combineReducers } from 'redux';
import schedules from './schedules';
import labels from './labels';

const rootReducer = combineReducers({ labels, schedules });

export default rootReducer;
