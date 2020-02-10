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
    case uploadCases.add:
      return { ...state, cases: [...state.cases, action.uploadCase] };
    case uploadCases.update:
      return {
        ...state,
        cases: state.cases.map(caseInStore => {
          return caseInStore._id === action.uploadCase._id
            ? action.uploadCase
            : caseInStore;
        })
      };
    default:
      return state;
  }
};
