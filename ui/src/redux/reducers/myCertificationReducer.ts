import { MyCertification } from "../../utils/types";
import { ReduxAction } from "../utils/constants";
import {
  RESET_MY_CERTIFICATION_STATE,
  SET_MY_CERTIFICATION_STATE,
} from "../utils/types";

interface MyCertificationState {
  currentCertification: any;
  myCertifications: MyCertification[];
}

const initialState: MyCertificationState = {
  currentCertification: {},
  myCertifications: [],
};

export const setMyCertificationState = (payload: any) => {
  return { type: SET_MY_CERTIFICATION_STATE, payload };
};

export const resetCertificationState = () => {
  return { type: RESET_MY_CERTIFICATION_STATE, payload: initialState };
};

export default function myCertification(
  state = initialState,
  action: ReduxAction
) {
  switch (action.type) {
    case SET_MY_CERTIFICATION_STATE:
    case RESET_MY_CERTIFICATION_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
