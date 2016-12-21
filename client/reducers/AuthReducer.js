import immutable from 'immutable';
import {
  CREATE_POST,
  APPEND_POST,
  REPLY_POST,
  REFRESH_POSTS
} from '../actions/PostActions';

export function auth (state = {
  editable: false
}, action) {
  return state;
}
