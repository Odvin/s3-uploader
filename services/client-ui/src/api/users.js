import { authFetch } from './utils';

const AUTH_API_SERVICE = 'http://localhost:4000';
const API_VERSION = 'api/v1';

export const reqQuota = userId =>
  authFetch(`${AUTH_API_SERVICE}/${API_VERSION}/users/quota`, {
    auth: false,
    params: { id: userId }
  });

export const reqPreSignedUrl = fileInfo =>
  authFetch(`${AUTH_API_SERVICE}/${API_VERSION}/users/pre-signed-url`, {
    auth: false,
    method: 'post',
    data: fileInfo
  });
