import thunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import post from './reducers/post-reducer';
import tag from './reducers/tag-reducer';
import condition from './reducers/condition-reducer';

const rootReducer = combineReducers({
  post,
  tag,
  condition
});

const rootMiddleware = applyMiddleware(thunk);

export default createStore(
  rootReducer,
  'development' === process.env.NODE_ENV ? composeWithDevTools(rootMiddleware) : rootMiddleware
);
