import { RSAA, RSAAAction } from "redux-api-middleware";
import {
  FETCH_ALL_MY_CERTIFICATIONS_REQUEST,
  FETCH_ALL_MY_CERTIFICATIONS_SUCCESS,
  MY_CERTIFICATION_FAILURE,
  REGISTER_MY_CERTIFICATIONS_REQUEST,
  REGISTER_MY_CERTIFICATIONS_SUCCESS,
  FETCH_ALL_ISSUER_CERTIFICATIONS_REQUEST,
  FETCH_ISSUER_MY_CERTIFICATIONS_SUCCESS,
  ISSUE_MY_CERTIFICATIONS_REQUEST,
  ISSUE_MY_CERTIFICATIONS_SUCCESS,
} from "../utils/types";
import { handleError, handleResponse } from "../utils/helper";
import { MyCertification } from "../../utils/types";

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

export const fetchIssuerCertifications = (address: string): RSAAAction => ({
  [RSAA]: {
    endpoint: `${API_URL}/myCertification/fetchIssuerCertifications/${address}`,
    method: "GET",
    types: [
      FETCH_ALL_ISSUER_CERTIFICATIONS_REQUEST,
      {
        type: FETCH_ISSUER_MY_CERTIFICATIONS_SUCCESS,
        payload: handleResponse,
      },
      { type: MY_CERTIFICATION_FAILURE, payload: handleError },
    ],
  },
});

export const registerClient = (
  issuerCertificateId: Number,
  recipient: String,
  issuer: String
): RSAAAction => ({
  [RSAA]: {
    endpoint: `${API_URL}/myCertification/registerClient`,
    method: "POST",
    body: JSON.stringify({ issuerCertificateId, recipient, issuer }),
    headers: { "Content-Type": "application/json" },
    types: [
      REGISTER_MY_CERTIFICATIONS_REQUEST,
      {
        type: REGISTER_MY_CERTIFICATIONS_SUCCESS,
        payload: handleResponse,
      },
      { type: MY_CERTIFICATION_FAILURE, payload: handleError },
    ],
  },
});

export const issueClientCertificate = (
  myCertification: MyCertification,
  address: String
): RSAAAction => ({
  [RSAA]: {
    endpoint: `${API_URL}/myCertification/issueCertification`,
    method: "POST",
    body: JSON.stringify(myCertification),
    headers: { "Content-Type": "application/json" },
    types: [
      ISSUE_MY_CERTIFICATIONS_REQUEST,
      {
        type: ISSUE_MY_CERTIFICATIONS_SUCCESS,
        payload: handleResponse,
        meta: { address },
      },
      { type: MY_CERTIFICATION_FAILURE, payload: handleError },
    ],
  },
});
