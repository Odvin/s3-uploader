import { userInfo } from './actionTypes';

export const setUserInfo = info => {
  return { type: userInfo.set, info };
};

export const showCaseEditor = isVisible => {
  return { type: userInfo.consumeEditor, isVisible };
};
