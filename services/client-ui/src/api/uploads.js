import { authFetch } from './utils';

const AUTH_API_SERVICE = 'http://localhost:4000';
const API_VERSION = 'api/v1';

export const reqUserUploads = userId =>
  authFetch(`${AUTH_API_SERVICE}/${API_VERSION}/uploads/list/${userId}`, {
    auth: false
  });
