import {
  GET_QUESTION,
  CLEAR_QUESTION,
  VALIDATE_ANSWER,
  SHOW_NOTIFY
} from '../actions/AuthActions';

export function auth (state = {
  editable      : false,
  questionLabel : '',
  notify        : { show: false }
}, action) {
  var copy = Object.assign({}, state);
  const { type, content } = action;

  switch (type) {
    case GET_QUESTION:
      copy.questionLabel = content;
      break;

    case CLEAR_QUESTION:
      copy.questionLabel = '';
      break;

    case VALIDATE_ANSWER:
      copy.editable = content;
      break;

    case SHOW_NOTIFY:
      copy.notify = { show: true };
      break;

    default:
      break;
  }

  return copy;
}
