import immutable from 'immutable';
import {
  CREATE_POST,
  APPEND_POST,
  REPLY_POST,
  REFRESH_POSTS
} from '../actions/PostActions';

export function post (state = {
  ids      : immutable.List([]),
  entities : immutable.Map({})
}, action) {
  const { type, content } = action;

  switch (type) {
    case CREATE_POST:
      state.ids = state.ids.push(content.ID);
      state.entities = state.entities.set(content.ID, {
        id        : content.ID,
        title     : content.Title,
        content   : content.Content,
        createdAt : new Date(content.CreatedAt),
        appends   : immutable.List([]),
        replies   : immutable.List([])
      });
      break;

    case APPEND_POST:
      state.entities = state.entities.setIn(
        [content.PostID, 'appends'],
        state.entities[content.PostID].appends.push({
          text      : content.Text,
          createdAt : new Date(content.CreatedAt)
        })
      );
      break;

    case REPLY_POST:
      state.entities = state.entities.setIn(
        [content.PostID, 'replies'],
        state.entities[content.PostID].replies.push({
          text      : content.Text,
          replyTo   : content.ReplyTo,
          createdAt : new Date(content.CreatedAt)
        })
      );
      break;

    case REFRESH_POSTS:
      state.ids = immutable.List(content.map(record => record.ID));
      state.entities = immutable.Map(content.reduce((prev, cur, index, arr) => {
        prev[cur.ID] = immutable.Map({
          id        : cur.ID,
          title     : cur.Title,
          content   : cur.Content,
          createdAt : new Date(cur.CreatedAt),
          appends   : immutable.List(cur.Appends ? cur.Appends.map(append => {
            return {
              text      : append.Text,
              createdAt : new Date(append.CreatedAt)
            };
          }) : []),
          replies : immutable.List(cur.Replies ? cur.Replies.map(reply => {
            return {
              text      : reply.Text,
              replyTo   : reply.ReplyTo,
              createdAt : new Date(reply.CreatedAt)
            };
          }) : [])
        });

        return prev;
      }, {}));
      break;

    default:
      break;
  }
  return state;
}
