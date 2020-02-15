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
    case uploadCases.remove:
      return {
        ...state,
        cases: state.cases.filter(c => c._id !== action.caseId)
      };
    default:
      return state;
  }
};
