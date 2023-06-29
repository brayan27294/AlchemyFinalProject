import { combineReducers } from '@reduxjs/toolkit';
import config from './reducers/configReducer';
import nft from './reducers/nftReducer';

const rootReducer = combineReducers({
    config,
    nft
});

export default rootReducer;