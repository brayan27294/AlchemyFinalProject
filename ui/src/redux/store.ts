import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { loggingMiddleware } from "./middleware/loggingMiddleware";
import { apiMiddleware } from "redux-api-middleware";
import { certificationMiddleware } from "./middleware/certificationMiddleware";
import { nftMiddleware } from "./middleware/nftMiddleware";
import { myCertificationMiddleware } from "./middleware/myCertificationMiddleware";

const middleware = [
  thunk,
  apiMiddleware,
  loggingMiddleware,
  certificationMiddleware,
  nftMiddleware,
  myCertificationMiddleware,
];

const store = configureStore({
  reducer: rootReducer,
  middleware,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
