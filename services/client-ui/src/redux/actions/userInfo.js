import { userInfo } from './actionTypes';

export const setUserInfo = info => {
  return { type: userInfo.set, info };
};