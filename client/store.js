import thunkMiddleware from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

import { post } from './reducers/PostReducer';

const rootReducer = combineReducers({
  post
});

export const rootStore = compose(
  applyMiddleware(thunkMiddleware)
)(createStore)(rootReducer);
