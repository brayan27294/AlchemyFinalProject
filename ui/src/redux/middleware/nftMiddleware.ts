import { fetchNFTs } from "../actions/nftActions";
import { setModalState } from "../reducers/modalReducer";
import { setNFTState } from "../reducers/nftReducer";
import { ReduxAction } from "../utils/constants";
import {
  FETCH_ALL_NFTS_SUCCESS,
  FETCH_NFT_SUCCESS,
  NFT_FAILURE,
  CREATE_NFT_SUCCESS,
} from "../utils/types";

export const nftMiddleware =
  ({ dispatch }: any) =>
  (next: any) =>
  (action: ReduxAction) => {
    next(action);
    switch (action.type) {
      case NFT_FAILURE:
        console.log(action.payload);
        break;
      case FETCH_NFT_SUCCESS:
        dispatch(setNFTState({ currentNft: action.payload }));
        break;
      case FETCH_ALL_NFTS_SUCCESS:
        dispatch(setNFTState({ nfts: action.payload }));
        break;
      case CREATE_NFT_SUCCESS:
        dispatch(setModalState({ isCreateNftOpen: false }));
        dispatch(fetchNFTs(action.meta.address));
        break;
      default:
        break;
    }
  };
