import { combineReducers } from 'redux';
import userInfo from './userInfo';
import userQuota from './userQuota';

export default combineReducers({
  userInfo,
  userQuota
});
