import React from 'react';

import styles from '../styles/message';

export default function renderHead (params) {
  return (
    <h4 className = 'ui header'>
      <div className = 'content'>
        {params.title}
        <span
          className = 'sub header'
          style = {styles.subHeader}
        >
          {`Updated at ${params.texts[params.texts.length - 1].createdAt.toLocaleString()}`}
          <a
            key = {`message-${params.id}-append`}
            style = {styles.actionLink}
            onClick = {this._enterAppend.bind(this)}
          >
            Append
          </a>
          <a
            key = {`message-${params.id}-reply`}
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
