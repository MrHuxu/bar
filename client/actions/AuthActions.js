import url from 'url';
import $ from 'jquery';

export const GET_QUESTION = 'GET_QUESTION';
export const getQuestion = (label) => {
  return {
    type    : GET_QUESTION,
    content : label
  };
};

export const CLEAR_QUESTION = 'CLEAR_QUESTION';
export const clearQuestion = () => {
  return {
    type : CLEAR_QUESTION
  };
};

export const VALIDATE_ANSWER = 'VALIDATE_ANSWER';
export const validateAnswer = (valid) => {
  return {
    type    : VALIDATE_ANSWER,
    content : valid
  };
};

export const SHOW_NOTIFY = 'SHOW_NOTIFY';
export const showNotify = () => {
  return {
    type : SHOW_NOTIFY
  };
};

export const getQuestionAjax = () => {
  return (dispatch) => {
    if (window.fetch) {
      var request = new Request('/auth/question', {
        method : 'GET'
      });
      fetch(request).then(res => {
        return res.json();
      }).then(json => {
        if ('success' === json.result) {
          dispatch(getQuestion(json.label));
        }
      });
    } else {
      $.get('/auth/question', {}, (data, status, jqXHR) => {
        if ('success' === data.result) {
          dispatch(getQuestion(data.label));
        }
      });
    }
  };

};

export const validateAnswerAjax = (params) => {
  return (dispatch) => {
    if (window.fetch) {
      var request = new Request('/auth/answer' + url.format({ query: params }), {
        method : 'GET'
      });
      fetch(request).then(res => {
        return res.json();
      }).then(json => {
        if ('success' === json.result) {
          dispatch(validateAnswer(json.valid));
          dispatch(showNotify());
        }
      });
    } else {
      $.get('/auth/answer', params, (data, status, jqXHR) => {
        if ('success' === data.result) {
          dispatch(validateAnswer(data.valid));
          dispatch(showNotify());
        }
      });
    }
  };
};
