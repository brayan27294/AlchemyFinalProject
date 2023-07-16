import { combineReducers } from "@reduxjs/toolkit";
import config from "./reducers/configReducer";
import certification from "./reducers/certificationReducer";
import nft from "./reducers/nftReducer";

const rootReducer = combineReducers({
  config,
  certification,
  nft,
});

export default rootReducer;
