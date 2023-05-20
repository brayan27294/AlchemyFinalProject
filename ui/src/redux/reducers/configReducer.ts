import { ReduxAction } from '../utils/constants';
import { CERTIFIER_LOGIN, CLIENT_LOGIN, RESET_CONFIG_STATE } from '../utils/types';

interface ConfigState {
  isAuthenticated: boolean;
  role: string;
  userName: string;
  address: string;
};

const initialState: ConfigState = {
	isAuthenticated: false,
	role: '',
	userName: '',
	address: ''
};

export const loginAction = (type: String, payload: any) => {
	return { type, payload };
};

export const resetConfigState = () => {
	return { type: RESET_CONFIG_STATE, payload: initialState };
};

export default function config(state = initialState, action: ReduxAction) {
	switch (action.type) {
		case CERTIFIER_LOGIN:
		case CLIENT_LOGIN:
		case RESET_CONFIG_STATE:
			return action.payload;
		default:
			return state;
	}
}
