import $ from 'jquery';
import nprogress from 'nprogress';

export const REFRESH_POSTS = 'REFRESH_POSTS';
const refreshPosts = posts => ({
  type    : REFRESH_POSTS,
  content : { posts }
});

export const fetchPosts = (conditions = {}) => {
  nprogress.start();
  return dispatch => {
    const request = new Request(`/post?${$.param(conditions)}`);

    fetch(request).then(res => res.json()).then(({ posts }) => {
      nprogress.done();
      dispatch(refreshPosts(posts));
    });
  };
};

export const createPost = (data = {}) => {
  nprogress.start();
  return dispatch => {
    const request = new Request('/test/', {
      method : 'POST',
      body   : JSON.stringify(data)
    });

    fetch(request).then(res => res.json()).then(({ posts }) => {
      nprogress.done();
      dispatch(refreshPosts(posts));
    });
  };
};
