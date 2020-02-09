import { uploadCases } from './actionTypes';

export const setUploadCases = cases => {
  return { type: uploadCases.set, cases };
};

export const consumeUploadCaseEditor = isVisible => {
  return { type: uploadCases.consumeEditor, isVisible };
};

export const selectUploadCaseId = caseId => {
  return { type: uploadCases.selectId, caseId };
};
