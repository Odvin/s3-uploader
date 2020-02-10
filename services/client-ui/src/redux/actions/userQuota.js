import { userQuota } from './actionTypes';

export const setUserQuota = quota => {
  return { type: userQuota.set, quota };
};

export const showCaseEditor = isVisible => {
  return { type: userQuota.showEditor, isVisible };
};

export const selectUseCaseId = caseId => {
  return { type: userQuota.selectCaseId, caseId}
}