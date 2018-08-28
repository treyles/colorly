import { combineReducers } from 'redux';
import user from './userReducers';
import data from './dataReducers';
import build from './buildReducers';

export default combineReducers({
  data,
  user,
  build
});
