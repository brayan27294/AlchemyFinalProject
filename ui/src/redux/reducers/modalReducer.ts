import { ReduxAction } from "../utils/constants";
import { SET_MODAL_STATE, RESET_MODAL_STATE } from "../utils/types";

interface ModalState {
  isCreateCertOpen: boolean;
  isCreateNftOpen: boolean;
  isRegisterCertOpen: boolean;
  isSubmitCertOpen: boolean;
}

const initialState: ModalState = {
  isCreateCertOpen: false,
  isCreateNftOpen: false,
  isRegisterCertOpen: false,
  isSubmitCertOpen: false,
};

export const setModalState = (payload: any) => {
  return { type: SET_MODAL_STATE, payload };
};

export const resetModalState = () => {
  return { type: RESET_MODAL_STATE, payload: initialState };
};

export default function config(state = initialState, action: ReduxAction) {
  switch (action.type) {
    case SET_MODAL_STATE:
    case RESET_MODAL_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
