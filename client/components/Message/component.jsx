import React from 'react';
import { Style } from 'radium';
import Reply from '../Reply';
import styles from './styles';

var renderHead = function (data) {
  return (
    <h4 className = 'ui header'>
      <div className = 'content'>
        {data.title}
        <span
          className = 'sub header'
          style = {styles.subHeader}
        >
          {`Updated at ${data.texts[data.texts.length - 1].createdAt.toLocaleString()}`}
          <a
            key = {`message-${data.id}-append`}
            style = {styles.actionLink}
            onClick = {this._enterAppend.bind(this)}
          >
            Append
          </a>
          <a
            key = {`message-${data.id}-reply`}
            style = {styles.actionLink}
            onClick = {this._enterReply.bind(this, null)}
          >
            Reply
          </a>
        </span>
      </div>
    </h4>
  );
};

var renderAppendForm = function (data) {
  return (
    <div
      className = 'ui secondary segment'
      key = {`message-${data.id}-append`}
    >
      <div className = 'ui fluid left labeled action input'>
        <input
          ref = 'appendForm'
          type = 'text'
          placeholder = 'Append Content'
        />
        <button
          className = 'ui button'
          onClick = {this._quitAppend.bind(this)}
        >
          <i className = 'trash outline icon' />
        </button>
        <button
          className = 'ui button'
          onClick = {this._append.bind(this)}
        >
          <i className = 'save icon' />
        </button>
      </div>
    </div>
  );
};

var renderTextArea = function (data) {
  var textArea = data.texts.reduce((prev, cur, index, arr) => {
    prev.push(
      <div
        key = {`message-${index}-segment`}
        className = {`ui ${index ? 'secondary' : ''} segment`}
      >
        {index ? null : renderHead.call(this, data)}
        {index ?
          <span className = 'ui label'>
            {cur.createdAt.toLocaleString()}
          </span> : null}
        <span> {cur.text} </span>
      </div>
    );
    return prev;
  }, []);
  textArea.push(this.state.appending ? renderAppendForm.call(this, data) : null);

  return textArea;
};

var renderReplyForm = function (data, replyTo) {
  return (
    <div
      key = {`message-${data.id}-reply-${replyTo}`}
      className = 'ui fluid left labeled action input'
    >
      {replyTo ? <div className = 'ui label'>{`to #${replyTo}`}</div> : null}
      <input
        ref = 'replyForm'
        type = 'text'
        placeholder = 'Reply Content'
      />
      <button
        className = 'ui button'
        onClick = {this._quitReply.bind(this)}
      >
        <i className = 'trash outline icon' />
      </button>
      <button
        className = 'ui button'
        onClick = {this._reply.bind(this, replyTo)}
      >
        <i className = 'save icon' />
      </button>
    </div>
  );
};

var renderReplyArea = function (data) {
  var replyArea = data.replies.reduce((prev, cur, index) => {
    prev.push(
      <Reply
        key = {`message-${data.id}-comment-${index}`}
        fakeId = {index + 1}
        data = {cur}
        reply = {this._enterReply.bind(this, index + 1)}
      />
    );
    return prev;
  }, []);
  replyArea.push(this.state.reply.replying ? renderReplyForm.call(this, data, this.state.reply.replyTo) : null);

  return replyArea;
};

export default function (props) {
  const { data } = props;

  return (
    <div
      className = 'timeline-item'
      style = {styles.container}
    >
      <Style rules = {styles.global} />
      <div className = 'ui piled segments'>
        {renderTextArea.call(this, data)}
      </div>
      {renderReplyArea.call(this, data)}
    </div>
  );
};
