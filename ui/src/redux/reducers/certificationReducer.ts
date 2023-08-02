import { Certification } from "../../utils/types";
import { ReduxAction } from "../utils/constants";
import {
  SET_CERTIFICATION_STATE,
  RESET_CERTIFICATION_STATE,
} from "../utils/types";

interface CertificationState {
  currentCertification: {};
  certifications: Certification[];
}

const initialState: CertificationState = {
  currentCertification: {},
  certifications: [
    {
      certificateId: 0,
      certifier: "574365736578dsjfhjdshgjs",
      name: "Certificate 1",
      description: "test certificate 1",
      associateNFT: "0x000000000000000000",
      requirements: ["Req 1", "Req 2", "Req 3"],
    },
  ],
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
