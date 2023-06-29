import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { loggingMiddleware } from './middleware/loggingMiddleware';
import { nftMiddleware } from './middleware/nftMiddleware';
import { apiMiddleware } from 'redux-api-middleware';

const middleware = [
    thunk,
    apiMiddleware,
    loggingMiddleware,
    nftMiddleware
];

const store = configureStore({
  reducer: rootReducer,
  middleware
});

export type RootState = ReturnType<typeof store.getState>;

export default store;