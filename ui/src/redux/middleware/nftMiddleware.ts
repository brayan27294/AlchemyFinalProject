import { setNFTState } from "../reducers/nftReducer";
import { ReduxAction } from "../utils/constants";
import { FETCH_ALL_NFT_SUCCESS, FETCH_NFT_SUCCESS, NFT_FAILURE } from "../utils/types";

export const nftMiddleware = ({ dispatch }: any) => (next: any) => (action: ReduxAction) => {
    next(action);
    switch (action.type) {
        case NFT_FAILURE:
            console.log(action.payload);
            break;
        case FETCH_NFT_SUCCESS:
            dispatch(setNFTState({ currentNFT: 'nft using rsaa request' }));
            break;
        case FETCH_ALL_NFT_SUCCESS:
            console.log('fetch all nfts');
            break;
        default:
            break;
    }
};