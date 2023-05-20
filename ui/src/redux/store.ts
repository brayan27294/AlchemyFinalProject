import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { loggingMiddleware } from './middleware/loggingMiddleware';

const middleware = [
    thunk,
    loggingMiddleware,
];

const store = configureStore({
  reducer: rootReducer,
  middleware
});

export type RootState = ReturnType<typeof store.getState>;

export default store;