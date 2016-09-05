import React from 'react';

export default function renderReplyForm (params, replyTo) {
  return (
    <div
      key = {`post-${params.id}-reply-${replyTo}`}
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
