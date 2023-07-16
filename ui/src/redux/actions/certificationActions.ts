import { RSAA, RSAAAction } from "redux-api-middleware";
import {
  FETCH_ALL_CERTIFICATIONS_REQUEST,
  FETCH_ALL_CERTIFICATIONS_SUCCESS,
  FETCH_CERTIFICATION_REQUEST,
  FETCH_CERTIFICATION_SUCCESS,
  CERTIFICATION_FAILURE,
  CREATE_CERTIFICATION_REQUEST,
  CREATE_CERTIFICATION_SUCCESS,
} from "../utils/types";
import { handleError, handleResponse } from "../utils/helper";
import { Certification } from "../../utils/types";

const API_URL = "http://localhost:3001";

export const fetchCertification = (
  certificationID: string,
  address: string
): RSAAAction => ({
  [RSAA]: {
    endpoint: `${API_URL}/certification/${certificationID}`,
    method: "POST",
    body: JSON.stringify({ address }),
    types: [
      FETCH_CERTIFICATION_REQUEST,
      {
        type: FETCH_CERTIFICATION_SUCCESS,
        payload: handleResponse,
      },
      { type: CERTIFICATION_FAILURE, payload: handleError },
    ],
  },
});

export const fetchCertifications = (address: string): RSAAAction => ({
  [RSAA]: {
    endpoint: `${API_URL}/certification/fetchCertifications/${address}`,
    method: "GET",
    types: [
      FETCH_ALL_CERTIFICATIONS_REQUEST,
      {
        type: FETCH_ALL_CERTIFICATIONS_SUCCESS,
        payload: handleResponse,
      },
      { type: CERTIFICATION_FAILURE, payload: handleError },
    ],
  },
});

export const createCertification = (
  certification: Certification
): RSAAAction => ({
  [RSAA]: {
    endpoint: `${API_URL}/certification/create`,
    method: "POST",
    body: JSON.stringify({ certification }),
    types: [
      CREATE_CERTIFICATION_REQUEST,
      {
        type: CREATE_CERTIFICATION_SUCCESS,
        payload: handleResponse,
      },
      { type: CERTIFICATION_FAILURE, payload: handleError },
    ],
  },
});
