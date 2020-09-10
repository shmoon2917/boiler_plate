import { combineReducers } from 'redux';
import { user, authentication } from './user';
import alert from './alert';
const rootReducer = combineReducers({
  authentication,
  user,
  alert,
});

export default rootReducer;
