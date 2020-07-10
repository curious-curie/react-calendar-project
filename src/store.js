import rootReducer from './modules';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger)));

const persistor = persistStore(store);
export { store, persistor };
