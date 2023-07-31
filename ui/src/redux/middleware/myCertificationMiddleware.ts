import { setCertificationState } from "../reducers/certificationReducer";
import { ReduxAction } from "../utils/constants";
import {
  FETCH_ALL_MY_CERTIFICATIONS_SUCCESS,
  MY_CERTIFICATION_FAILURE,
} from "../utils/types";

export const myCertificationMiddleware =
  ({ dispatch }: any) =>
  (next: any) =>
  (action: ReduxAction) => {
    next(action);
    switch (action.type) {
      case MY_CERTIFICATION_FAILURE:
        console.log(action.payload);
        break;
      case FETCH_ALL_MY_CERTIFICATIONS_SUCCESS:
        dispatch(setCertificationState({ myCertifications: action.payload }));
        break;
      default:
        break;
    }
  };
