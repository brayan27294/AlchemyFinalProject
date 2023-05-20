import { combineReducers } from '@reduxjs/toolkit';
import config from './reducers/configReducer';

const rootReducer = combineReducers({
    config,
});

export default rootReducer;