import {
  CREATE_POST,
  APPEND_POST,
  REPLY_POST,
  REFRESH_POSTS
} from '../actions/PostActions';

export function post (state = {
  ids      : [],
  entities : {}
}, action) {
  var copy = Object.assign({}, state);
  copy.entities = Object.assign({}, state.entities);
  const { type, content } = action;

  switch (type) {
    case CREATE_POST:
      copy.ids.push(content.ID);
      copy.entities[content.ID] = {
        id        : content.ID,
        title     : content.Title,
        content   : content.Content,
        createdAt : new Date(content.CreatedAt),
        appends   : [],
        replies   : []
      };
      break;

    case APPEND_POST:
      copy.entities[content.PostID].appends.push({
        text      : content.Text,
        createdAt : new Date(content.CreatedAt)
      });
      break;

    case REPLY_POST:
      copy.entities[content.PostID].replies.push({
        text      : content.Text,
        replyTo   : content.ReplyTo,
        createdAt : new Date(content.CreatedAt)
      });
      break;

    case REFRESH_POSTS:
      copy.ids = content.map(record => record.ID);
      copy.entities = content.reduce((prev, cur, index, arr) => {
        prev[cur.ID] = {
          id        : cur.ID,
          title     : cur.Title,
          content   : cur.Content,
          createdAt : new Date(cur.CreatedAt),
          appends   : cur.Appends ? cur.Appends.map(append => {
            return {
              text      : append.Text,
              createdAt : new Date(append.CreatedAt)
            };
          }) : [],
          replies : cur.Replies ? cur.Replies.map(reply => {
            return {
              text      : reply.Text,
              replyTo   : reply.ReplyTo,
              createdAt : new Date(reply.CreatedAt)
            };
          }) : []
        };

        return prev;
      }, {});
      break;

    default:
      break;
  }
  return copy;
}
