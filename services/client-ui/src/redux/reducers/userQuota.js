import { userQuota } from '../actions/actionTypes';

const initialState = {
  exists: false,
  isEditorVisible: false,
  activeCaseId: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case userQuota.set:
      return { ...state, ...action.quota, exists: true };
    case userQuota.showEditor:
      return { ...state, isEditorVisible: action.isVisible };
    case userQuota.selectCaseId:
      return { ...state, activeCaseId: action.caseId };
    default:
      return state;
  }
};
