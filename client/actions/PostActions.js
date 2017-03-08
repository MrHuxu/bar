import $ from 'jquery';

export const REFRESH_POSTS = 'REFRESH_POSTS';
export function refreshPosts (posts) {
  return {
    type    : REFRESH_POSTS,
    content : posts
  };
}

export const CREATE_POST = 'CREATE_POST';
export function createPost (newPost) {
  return {
    type    : CREATE_POST,
    content : newPost
  };
}

export const APPEND_POST = 'APPEND_POST';
export function appendPost (newAppend) {
  return {
    type    : APPEND_POST,
    content : newAppend
  };
}

export const REPLY_POST = 'REPLY_POST';
export function replyPost (newReply) {
  return {
    type    : REPLY_POST,
    content : newReply
  };
}

export function fetchPosts () {
  return function (dispatch) {
    if (window.fetch) {
      var request = new Request('/post/', {
        method : 'GET'
      });
      fetch(request).then(res => {
        return res.json();
      }).then(json => {
        if ('success' === json.result) {
          dispatch(refreshPosts(json.posts));
        }
      });
    } else {
      $.get('/post/', {}, (data, status, jqXHR) => {
        if ('success' === data.result) {
          dispatch(refreshPosts(data.posts));
        }
      });
    }
  };
}

export function createPostAjax (newTitle, newContent) {
  return function (dispatch) {
    if (window.fetch) {
      var request = new Request('/post/create', {
        method : 'POST',
        body   : JSON.stringify({
          title   : newTitle,
          content : newContent
        })
      });
      fetch(request).then(res => {
        return res.json();
      }).then(json => {
        if ('success' === json.result) {
          dispatch(createPost(json.newPost));
        }
      });
    } else {
      $.post('/post/create', JSON.stringify({
        title: newTitle,
        content: newContent
      }), (data, status, jqXHR) => {
        if ('success' === data.result) {
          dispatch(createPost(data.newPost));
        }
      });
    }
  };
}

export function appendPostAjax (postID, appendContent) {
  return function (dispatch) {
    if (window.fetch) {
      var request = new Request('/post/append', {
        method : 'POST',
        body   : JSON.stringify({
          postID : postID,
          text   : appendContent
        })
      });
      fetch(request).then(res => {
        return res.json();
      }).then(json => {
        if ('success' === json.result) {
          dispatch(appendPost(json.newAppend));
        }
      });
    } else {
      $.post('/post/append', JSON.stringify({
        postID:postID,
        text: appendContent
      }), (data, status, jqXHR) => {
        if ('success' === data.result) {
          dispatch(appendPost(data.newAppend));
        }
      });
    }
  };
}

export function replyPostAjax (postID, replyContent) {
  return function (dispatch) {
    if (window.fetch) {
      var request = new Request('/post/reply', {
        method : 'POST',
        body   : JSON.stringify({
          postID  : postID,
          text    : replyContent.text,
          replyTo : replyContent.replyTo
        })
      });
      fetch(request).then(res => {
        return res.json();
      }).then(json => {
        if ('success' === json.result) {
          dispatch(replyPost(json.newReply));
        }
      });
    } else {
      $.post('/post/reply', JSON.stringify({
        postID: postID,
        text: replyContent.text,
        replyTo: replyContent.replyTo
      }), (data, status, jqXHR) => {
        if ('success' === data.result) {
          dispatch(replyPost(data.newReply));
        }
      });
    }
  };
}
