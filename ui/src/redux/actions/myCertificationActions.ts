import { RSAA, RSAAAction } from "redux-api-middleware";
import {
  FETCH_ALL_MY_CERTIFICATIONS_REQUEST,
  FETCH_ALL_MY_CERTIFICATIONS_SUCCESS,
  MY_CERTIFICATION_FAILURE,
} from "../utils/types";
import { handleError, handleResponse } from "../utils/helper";

const API_URL = "http://localhost:3001";

export const fetchMyCertifications = (address: string): RSAAAction => ({
  [RSAA]: {
    endpoint: `${API_URL}/myCertification/fetchCertifications/${address}`,
    method: "GET",
    types: [
      FETCH_ALL_MY_CERTIFICATIONS_REQUEST,
      {
        type: FETCH_ALL_MY_CERTIFICATIONS_SUCCESS,
        payload: handleResponse,
      },
      { type: MY_CERTIFICATION_FAILURE, payload: handleError },
    ],
  },
});
