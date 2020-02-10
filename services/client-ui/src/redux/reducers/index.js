import { combineReducers } from 'redux';
import userInfo from './userInfo';
import userQuota from './userQuota';
import uploadCases from './uploadCases';

export default combineReducers({
  userInfo,
  uploadCases,
  userQuota
});
