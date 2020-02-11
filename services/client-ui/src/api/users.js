import { authFetch } from './utils';

const AUTH_API_SERVICE = 'http://localhost:4000';
const API_VERSION = 'api/v1';

export const reqUserInfo = (userId, idType) =>
  authFetch(`${AUTH_API_SERVICE}/${API_VERSION}/users/quota`, {
    auth: false,
    params: { id: userId, type: idType }
  });

export const reqCreateUser = userInfo =>
  authFetch(`${AUTH_API_SERVICE}/${API_VERSION}/users`, {
    auth: false,
    method: 'post',
    data: userInfo
  });

export const reqUpdateUser = userInfo =>
  authFetch(`${AUTH_API_SERVICE}/${API_VERSION}/users`, {
    auth: false,
    method: 'put',
    data: userInfo
  });

export const reqPreSignedUrl = fileInfo =>
  authFetch(`${AUTH_API_SERVICE}/${API_VERSION}/users/pre-signed-url`, {
    auth: false,
    method: 'post',
    data: fileInfo
  });

export const reqPersistUpload = uploadInfo =>
  authFetch(`${AUTH_API_SERVICE}/${API_VERSION}/users/persist-upload`, {
    auth: false,
    method: 'post',
    data: uploadInfo
  });
