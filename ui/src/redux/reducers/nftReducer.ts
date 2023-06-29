import { ReduxAction } from '../utils/constants';
import { SET_NFT_STATE, RESET_NFT_STATE } from '../utils/types';

interface ConfigState {
  currentNFT: string;
};

const initialState: ConfigState = {
	currentNFT: '',
};

export const setNFTState = (payload: any) => {
	return { type: SET_NFT_STATE, payload };
};

export const resetNFTState = () => {
	return { type: RESET_NFT_STATE, payload: initialState };
};

export default function nft(state = initialState, action: ReduxAction) {
	switch (action.type) {
		case SET_NFT_STATE:
		case RESET_NFT_STATE:
			return { ...state, ...action.payload };
		default:
			return state;
	}
}
