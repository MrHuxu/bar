import {
  REFRESH_POSTS
} from '../actions/post-actions';

export default (state = {
  ids      : [],
  entities : {}
}, action) => {
  const newState = Object.assign({}, state);
  const { type, content } = action;
  const { posts } = content || {};

  switch (type) {
  case REFRESH_POSTS:
    newState.ids = posts.map(post => post.id);
    newState.entities = posts.reduce((pre, post) => {
      pre[post.id] = {
        ...post,
        createdAt : new Date(post.createdAt)
      };
      return pre;
    }, {});
    break;

  default:
    return newState;
  }

  return newState;
};
