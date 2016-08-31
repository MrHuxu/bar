export const APPEND_MESSAGE = 'APPEND_MESSAGE';
export function appendMessage (id, content) {
  return {
    type    : APPEND_MESSAGE,
    content : {
      id      : id,
      content : content
    }
  };
}

export const REPLY_MESSAGE = 'REPLY_MESSAGE';
export function replyMessage (id, content) {
  return {
    type    : REPLY_MESSAGE,
    content : {
      id      : id,
      content : content
    }
  };
}
