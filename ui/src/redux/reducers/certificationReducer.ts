import { ReduxAction } from "../utils/constants";
import {
  SET_CERTIFICATION_STATE,
  RESET_CERTIFICATION_STATE,
} from "../utils/types";

interface CertificationState {
  currentCertification: any;
  certifications: any[];
}

const initialState: CertificationState = {
  currentCertification: {},
  certifications: [],
};

export const setCertificationState = (payload: any) => {
  return { type: SET_CERTIFICATION_STATE, payload };
};

export const resetCertificationState = () => {
  return { type: RESET_CERTIFICATION_STATE, payload: initialState };
};

export default function certification(
  state = initialState,
  action: ReduxAction
) {
  switch (action.type) {
    case SET_CERTIFICATION_STATE:
    case RESET_CERTIFICATION_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
