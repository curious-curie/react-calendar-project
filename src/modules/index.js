import { combineReducers } from 'redux';
import { persistReducer, createTransform } from 'redux-persist';
import schedules from './schedules';
import labels from './labels';
import storage from 'redux-persist/lib/storage';

const replacer = (key, value) => (value instanceof Date ? value.toISOString() : value);

const reviver = (key, value) =>
  typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/) ? new Date(value) : value;

export const encode = (toDeshydrate) => JSON.stringify(toDeshydrate, replacer);

export const decode = (toRehydrate) => JSON.parse(toRehydrate, reviver);

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['schedules', 'labels'],
  transforms: [createTransform(encode, decode)],
};
const rootReducer = combineReducers({ labels, schedules });

export default persistReducer(persistConfig, rootReducer);
