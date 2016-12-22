import thunkMiddleware from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

import { auth } from './reducers/AuthReducer';
import { post } from './reducers/PostReducer';

const rootReducer = combineReducers({
  auth,
  post
});

export const rootStore = compose(
  applyMiddleware(thunkMiddleware)
)(createStore)(rootReducer);
