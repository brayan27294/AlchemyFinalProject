import { RSAA, RSAAAction } from 'redux-api-middleware';
import { FETCH_ALL_NFT_REQUEST, FETCH_ALL_NFT_SUCCESS, FETCH_NFT_REQUEST, FETCH_NFT_SUCCESS, NFT_FAILURE } from '../utils/types';
import { handleError, handleResponse } from '../utils/helper';

const API_URL = 'localhost:3001';

export const fetchNFT = (NFTaddress: string, address: string): RSAAAction => ({
	[RSAA]: {
		endpoint: `${API_URL}/nft/${NFTaddress}`,
		method: 'POST',
		body: JSON.stringify({ address: address }),
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

export const fetchAllNFTs = (address: string): RSAAAction => ({
	[RSAA]: {
		endpoint: `${API_URL}/nft/fetchAllNFTs`,
		method: 'POST',
		body: JSON.stringify({ address: address }),
		types: [
			FETCH_ALL_NFT_REQUEST,
			{
				type: FETCH_ALL_NFT_SUCCESS,
				payload: handleResponse,
			},
			{ type: NFT_FAILURE, payload: handleError },
		],
	},
});