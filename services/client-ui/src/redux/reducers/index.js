import { combineReducers } from 'redux';
import userInfo from './userInfo';
import uploadCases from './uploadCases';

export default combineReducers({
  userInfo,
  uploadCases
});
