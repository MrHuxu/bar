import {
  REFRESH_TAGS
} from '../actions/tag-actions';

export default (state = {
  ids      : [],
  entities : {}
}, action) => {
  const newState = Object.assign({}, state);
  const { type, content } = action;
  const { tags } = content || {};

  switch (type) {
  case REFRESH_TAGS:
    newState.ids = tags.map(tag => tag.id);
    newState.entities = tags.reduce((pre, tag) => {
      pre[tag.id] = tag;
      return pre;
    }, {});
    break;

  default:
    return newState;
  }

  return newState;
};
