import { RSAA, RSAAAction } from "redux-api-middleware";
import {
  FETCH_ALL_NFTS_REQUEST,
  FETCH_ALL_NFTS_SUCCESS,
  FETCH_NFT_REQUEST,
  FETCH_NFT_SUCCESS,
  NFT_FAILURE,
  CREATE_NFT_REQUEST,
  CREATE_NFT_SUCCESS,
} from "../utils/types";
import { handleError, handleResponse } from "../utils/helper";
import { NFT } from "../../utils/types";

const API_URL = "http://localhost:3001";

export const fetchNFT = (nftID: string): RSAAAction => ({
  [RSAA]: {
    endpoint: `${API_URL}/nft/fetchNft/${nftID}`,
    method: "GET",
    types: [
      FETCH_NFT_REQUEST,
      {
        type: FETCH_NFT_SUCCESS,
        payload: handleResponse,
      },
      { type: NFT_FAILURE, payload: handleError },
    ],
  },
});

export const fetchNFTs = (address: string): RSAAAction => ({
  [RSAA]: {
    endpoint: `${API_URL}/nft/fetchNfts/${address}`,
    method: "GET",
    types: [
      FETCH_ALL_NFTS_REQUEST,
      {
        type: FETCH_ALL_NFTS_SUCCESS,
        payload: handleResponse,
      },
      { type: NFT_FAILURE, payload: handleError },
    ],
  },
});

export const createNFT = (nft: NFT, address: String): RSAAAction => ({
  [RSAA]: {
    endpoint: `${API_URL}/nft/create`,
    method: "POST",
    body: JSON.stringify(nft),
    headers: { "Content-Type": "application/json" },
    types: [
      CREATE_NFT_REQUEST,
      {
        type: CREATE_NFT_SUCCESS,
        payload: handleResponse,
        meta: { address },
      },
      { type: NFT_FAILURE, payload: handleError },
    ],
  },
});
