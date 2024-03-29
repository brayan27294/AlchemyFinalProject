import { combineReducers } from "@reduxjs/toolkit";
import config from "./reducers/configReducer";
import modal from "./reducers/modalReducer";
import certification from "./reducers/certificationReducer";
import nft from "./reducers/nftReducer";
import myCertification from "./reducers/myCertificationReducer";

const rootReducer = combineReducers({
  config,
  modal,
  certification,
  nft,
  myCertification,
});

export default rootReducer;
