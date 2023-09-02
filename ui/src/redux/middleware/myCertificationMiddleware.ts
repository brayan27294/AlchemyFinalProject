import { fetchIssuerCertifications } from "../actions/myCertificationActions";
import { setModalState } from "../reducers/modalReducer";
import { setMyCertificationState } from "../reducers/myCertificationReducer";
import { ReduxAction } from "../utils/constants";
import {
  FETCH_ALL_MY_CERTIFICATIONS_SUCCESS,
  FETCH_ISSUER_MY_CERTIFICATIONS_SUCCESS,
  ISSUE_MY_CERTIFICATIONS_SUCCESS,
  MY_CERTIFICATION_FAILURE,
  REGISTER_MY_CERTIFICATIONS_SUCCESS,
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
        dispatch(setMyCertificationState({ myCertifications: action.payload }));
        break;
      case FETCH_ISSUER_MY_CERTIFICATIONS_SUCCESS:
        dispatch(
          setMyCertificationState({ issuerCertifications: action.payload })
        );
        break;
      case REGISTER_MY_CERTIFICATIONS_SUCCESS:
        dispatch(setModalState({ isRegisterCertOpen: false }));
        break;
      case ISSUE_MY_CERTIFICATIONS_SUCCESS:
        dispatch(setModalState({ isSubmitCertOpen: false }));
        dispatch(fetchIssuerCertifications(action.meta.address));
        break;
      default:
        break;
    }
  };
