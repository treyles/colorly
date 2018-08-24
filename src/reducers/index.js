import { combineReducers } from 'redux';
import user from './user';
import data from './data';
import build from './build';

export default combineReducers({
  data,
  user,
  build
});
