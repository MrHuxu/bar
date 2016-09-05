export const CREATE_POST = 'CREATE_POST';
export function createPost (content) {
  return {
    type    : CREATE_POST,
    content : {
      content : content
    }
  };
}

export const APPEND_POST = 'APPEND_POST';
export function appendPost (id, content) {
  return {
    type    : APPEND_POST,
    content : {
      id      : id,
      content : content
    }
  };
}

export const REPLY_POST = 'REPLY_POST';
export function replyPost (id, content) {
  return {
    type    : REPLY_POST,
    content : {
      id      : id,
      content : content
    }
  };
}
