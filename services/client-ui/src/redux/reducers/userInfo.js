import { userInfo } from '../actions/actionTypes';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case userInfo.set:
      return action.info;
    default:
      return state;
  }
};