import React from 'react';

import styles from '../styles/reply';

export default function renderReply (params) {
  const { fakeId, data, reply } = params;

  return (
    <div
      key = {`message-${params.id}-comment-${fakeId}`}
      className = 'ui comments'
    >
      <div className = 'comment'>
        <div className = 'content'>
          <span className = 'ui circular label'>
            {`#${fakeId}`}
          </span>
          { data.replyTo
            ? <span className = 'ui circular label'>
              to #{data.replyTo}
            </span> : null }
          <span className = 'metadata'>
            <div className = 'date'>{data.createdAt.toLocaleString()}</div>
          </span>
          <span
            className = 'actions'
            style = {styles.actionContainer}
          >
            <a
              className = 'reply'
              onClick = {reply}
            >
              Reply
            </a>
          </span>
          <div className = 'text'>
            {data.text}
          </div>
        </div>
      </div>
    </div>
  );
}
