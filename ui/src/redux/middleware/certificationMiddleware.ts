import { setCertificationState } from "../reducers/certificationReducer";
import { ReduxAction } from "../utils/constants";
import {
  FETCH_ALL_CERTIFICATIONS_SUCCESS,
  FETCH_CERTIFICATION_SUCCESS,
  CERTIFICATION_FAILURE,
} from "../utils/types";

export const certificationMiddleware =
  ({ dispatch }: any) =>
  (next: any) =>
  (action: ReduxAction) => {
    next(action);
    switch (action.type) {
      case CERTIFICATION_FAILURE:
        console.log(action.payload);
        break;
      case FETCH_CERTIFICATION_SUCCESS:
        dispatch(setCertificationState({ currentCertification: {} }));
        break;
      case FETCH_ALL_CERTIFICATIONS_SUCCESS:
        dispatch(setCertificationState({ certifications: action.payload }));
        break;
      default:
        break;
    }
  };
