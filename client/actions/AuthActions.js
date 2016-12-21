
export function fetchPosts () {
  return function (dispatch) {
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
  };
}