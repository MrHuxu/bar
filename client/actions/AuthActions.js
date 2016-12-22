import url from 'url';

export const GET_QUESTION = 'GET_QUESTION';
export const getQuestion = (label) => {
  return {
    type    : GET_QUESTION,
    content : label
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
  };
};

export const validateAnswerAjax = (params) => {
  return (dispatch) => {
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
  };
};
