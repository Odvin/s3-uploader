import { uploadCases } from './actionTypes';

export const setUploadCases = cases => {
  return { type: uploadCases.set, cases };
};

export const consumeUploadCaseEditor = isVisible => {
  return { type: uploadCases.consumeEditor, isVisible };
};

export const addUploadCase = uploadCase => {
  return { type: uploadCases.add, uploadCase };
};

export const updateUploadCase = uploadCase => {
  return { type: uploadCases.update, uploadCase };
};

export const removeUploadCase = caseId => {
  return { type: uploadCases.remove, caseId };
};
