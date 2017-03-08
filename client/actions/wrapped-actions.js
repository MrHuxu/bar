import { format } from 'url';
import $ from 'jquery';

export const wrappedGet = ({ url, data, callback }) => {
  if (window.fetch) {
    var request = new Request(url + (data ? format({ query: data }) : ''), {
      method : 'GET'
    });
    fetch(request).then(res => {
      return res.json();
    }).then(callback);
  } else {
    $.get(url, data, callback);
  }
};

export const wrappedPost = ({ url, data, callback }) => {
  if (window.fetch) {
    var request = new Request(url, {
      method : 'POST',
      body   : JSON.stringify(data)
    });
    fetch(request).then(res => {
      return res.json();
    }).then(callback);
  } else {
    $.post(url, JSON.stringify(data), callback);
  }
};
