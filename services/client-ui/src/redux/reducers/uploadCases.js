import { uploadCases } from '../actions/actionTypes';

const initialState = {
  loaded: false,
  isEditorVisible: false,
  activeUploadCaseId: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case uploadCases.set:
      return { ...state, cases: action.cases, loaded: true };
    case uploadCases.consumeEditor:
      return { ...state, isEditorVisible: action.isVisible };
    case uploadCases.selectId:
      return { ...state, activeUploadCaseId: action.caseId };
    default:
      return state;
  }
};
