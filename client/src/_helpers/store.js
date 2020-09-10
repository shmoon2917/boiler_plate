import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Logger from 'redux-logger';
import rootReducer from '../modules';
import { history } from './history';
export const store = createStore(
  rootReducer,
  applyMiddleware(ReduxThunk.withExtraArgument({ history }), Logger)
);
