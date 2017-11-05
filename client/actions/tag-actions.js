import $ from 'jquery';
import nprogress from 'nprogress';

export const REFRESH_TAGS = 'REFRESH_TAGS';
const refreshTags = tags => ({
  type    : REFRESH_TAGS,
  content : {
    ids      : tags.map(post => post.id),
    entities : tags.reduce((pre, tag) => {
      pre[tag.id] = tag;
      return pre;
    }, {})
  }
});

export const fetchTags = conditions => {
  nprogress.start();
  return dispatch => {
    const request = new Request(`/tag?${$.param(conditions)}`);

    fetch(request).then(res => res.json()).then(data => {
      nprogress.done();
      dispatch(refreshTags(data));
    });
  };
};

export const createTag = data => {
  nprogress.start();
  return dispatch => {
    const request = new Request('/tag/', {
      method : 'POST',
      body   : JSON.stringify(data)
    });

    fetch(request).then(res => res.json()).then(data => {
      nprogress.done();
      dispatch(refreshTags(data));
    });
  };
};
