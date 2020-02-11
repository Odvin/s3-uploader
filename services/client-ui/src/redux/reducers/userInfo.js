import { userInfo } from '../actions/actionTypes';

const initialState = {
  exists: false,
  isEditorVisible: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case userInfo.set:
      return { ...state, ...action.info, exists: true };
    case userInfo.consumeEditor:
      return { ...state, isEditorVisible: action.isVisible };
    default:
      return state;
  }
};
