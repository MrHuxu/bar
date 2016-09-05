import {
  CREATE_POST,
  APPEND_POST,
  REPLY_POST
} from '../actions/PostActions';

export function post (state = {
  ids      : ['1', '2'],
  entities : {
    '1' : {
      id    : '1',
      title : 'title 1',
      texts : [{
        text      : 'text 1',
        createdAt : new Date()
      }, {
        text      : 'text 2',
        createdAt : new Date()
      }],
      replies : []
    },
    '2' : {
      id    : '2',
      title : 'title 2',
      texts : [{
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
  if (action.content) {
    var { id, content, newTitle, newContent } = action.content;
  }

  switch (action.type) {
    case CREATE_POST:
      let newId = (copy.ids.length + 1).toString();
      let newEntity = {
        id    : newId,
        title : newTitle,
        texts : [{
          text      : newContent,
          createdAt : new Date()
        }],
        replies : []
      };
      copy.ids.push(newId);
      copy.entities[newId] = newEntity;
      break;

    case APPEND_POST:
      copy.entities[id].texts.push(content);
      break;

    case REPLY_POST:
      copy.entities[id].replies.push(content);
      break;

    default:
      break;
  }
  return copy;
}
