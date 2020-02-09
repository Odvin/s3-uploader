import { authFetch } from './utils';

const AUTH_API_SERVICE = 'http://localhost:4000';
const API_VERSION = 'api/v1';

export const reqUploadCases = () =>
  authFetch(`${AUTH_API_SERVICE}/${API_VERSION}/upload-cases`, {
    auth: false
  });
