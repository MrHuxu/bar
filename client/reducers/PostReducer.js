import {
  CREATE_POST,
  APPEND_POST,
  REPLY_POST
} from '../actions/PostActions';

export function post (state = {
  ids      : ['1', '2'],
  entities : {
    '1' : {
      id        : '1',
      title     : 'title 1',
      content   : 'test content 1',
      createdAt : new Date(),
      appends   : [{
        text      : 'text 1',
        createdAt : new Date()
      }, {
        text      : 'text 2',
        createdAt : new Date()
      }],
      replies : []
    },
    '2' : {
      id        : '2',
      title     : 'title 2',
      content   : 'test content 2',
      createdAt : new Date(),
      appends   : [{
        text      : 'text 3',
        createdAt : new Date()
      }],
      replies : [{
        text      : 'text 4',
        replyTo   : null,
        createdAt : new Date()
      }, {
        text      : 'text 5',
        replyTo   : 1,
        createdAt : new Date()
      }]
    }
  }
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

    default:
      break;
  }
  return copy;
}
