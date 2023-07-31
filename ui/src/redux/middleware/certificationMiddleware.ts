import { fetchCertifications } from "../actions/certificationActions";
import { setCertificationState } from "../reducers/certificationReducer";
import { setModalState } from "../reducers/modalReducer";
import { ReduxAction } from "../utils/constants";
import {
  FETCH_ALL_CERTIFICATIONS_SUCCESS,
  FETCH_CERTIFICATION_SUCCESS,
  CERTIFICATION_FAILURE,
  CREATE_CERTIFICATION_SUCCESS,
  FETCH_CERTIFICATIONS_BY_ADDRESS_SUCCESS,
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
      case FETCH_CERTIFICATIONS_BY_ADDRESS_SUCCESS:
        dispatch(setCertificationState({ certifications: action.payload }));
        break;
      case CREATE_CERTIFICATION_SUCCESS:
        dispatch(setModalState({ isCreateCertOpen: false }));
        dispatch(fetchCertifications(action.meta.address));
        break;
      default:
        break;
    }
  };
