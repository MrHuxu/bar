import { wrappedGet } from './wrapped-actions';

export const GET_QUESTION = 'GET_QUESTION';
export const getQuestion = label => ({
  type    : GET_QUESTION,
  content : label
});

export const CLEAR_QUESTION = 'CLEAR_QUESTION';
export const clearQuestion = () => ({
  type : CLEAR_QUESTION
});

export const VALIDATE_ANSWER = 'VALIDATE_ANSWER';
export const validateAnswer = valid => ({
  type    : VALIDATE_ANSWER,
  content : valid
});

export const SHOW_NOTIFY = 'SHOW_NOTIFY';
export const showNotify = () => ({
  type : SHOW_NOTIFY
});

export const getQuestionAjax = () => {
  return dispatch => {
    wrappedGet({
      url      : '/auth/question/',
      data     : {},
      callback : data => {
        if ('success' === data.result) {
          dispatch(getQuestion(data.label));
        }
      }
    });
  };
};

export const validateAnswerAjax = params => {
  return dispatch => {
    wrappedGet({
      url      : '/auth/answer/',
      data     : params,
      callback : data => {
        if ('success' === data.result) {
          dispatch(validateAnswer(data.valid));
          dispatch(showNotify());
        }
      }
    });
  };
};
