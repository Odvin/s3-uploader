import { authFetch } from './utils';

const AUTH_API_SERVICE = 'http://localhost:4000';
const API_VERSION = 'api/v1';

export const reqUploadCases = () =>
  authFetch(`${AUTH_API_SERVICE}/${API_VERSION}/upload-cases`, {
    auth: false
  });

export const reqUpdateUploadCase = uploadCase =>
  authFetch(`${AUTH_API_SERVICE}/${API_VERSION}/upload-cases`, {
    auth: false,
    method: 'put',
    data: uploadCase
  });

export const reqCreateUploadCase = uploadCase =>
  authFetch(`${AUTH_API_SERVICE}/${API_VERSION}/upload-cases`, {
    auth: false,
    method: 'post',
    data: uploadCase
  });

export const reqRemoveUploadCase = caseId =>
  authFetch(`${AUTH_API_SERVICE}/${API_VERSION}/upload-cases`, {
    auth: false,
    method: 'delete',
    data: { caseId }
  });
