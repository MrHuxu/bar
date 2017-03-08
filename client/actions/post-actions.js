import $ from 'jquery';

import { wrappedGet, wrappedPost } from './wrapped-actions';

export const REFRESH_POSTS = 'REFRESH_POSTS';
export const refreshPosts = posts => ({
  type    : REFRESH_POSTS,
  content : posts
});

export const CREATE_POST = 'CREATE_POST';
export const createPost = newPost => ({
  type    : CREATE_POST,
  content : newPost
});

export const APPEND_POST = 'APPEND_POST';
export const appendPost = newAppend => ({
  type    : APPEND_POST,
  content : newAppend
});

export const REPLY_POST = 'REPLY_POST';
export const replyPost = newReply => ({
  type    : REPLY_POST,
  content : newReply
});

export const fetchPosts = () => {
  return dispatch => {
    wrappedGet({
      url: '/post/',
      callback: data => {
        if ('success' === data.result) {
          dispatch(refreshPosts(data.posts));
        }
      }
    });
  };
};

export const createPostAjax = (newTitle, newContent) => {
  return dispatch => {
    wrappedPost({
      url: '/post/create',
      data: {
        title   : newTitle,
        content : newContent
      },
      callback: data => {
        if ('success' === data.result) {
          dispatch(createPost(data.newPost));
        }
      }
    });
  };
};

export const appendPostAjax = (postID, appendContent) => {
  return dispatch => {
    wrappedPost({
      url: '/post/append',
      data: {
        postID : postID,
        text   : appendContent
      },
      callback: data => {
        if ('success' === data.result) {
          dispatch(appendPost(data.newAppend));
        }
      }
    });
  };
};

export const replyPostAjax = (postID, replyContent) => {
  return dispatch => {
    wrappedPost({
      url: '/post/reply',
      data: {
        postID  : postID,
        text    : replyContent.text,
        replyTo : replyContent.replyTo
      },
      callback: data => {
        if ('success' === data.result) {
          dispatch(replyPost(data.newReply));
        }
      }
    });
  };
};
