import React from 'react';
import dateFormat from 'dateformat';

import styles from '../styles/post';

export default function renderHead (params) {
  return (
    <h4 className = 'ui header'>
      <div className = 'content'>
        {params.title}
        <span
          className = 'sub header'
          style = {styles.subHeader}
        >
          {dateFormat(params.updatedAt, "d/m/yyyy, H:MM:ss")}
          <a
            key = {`post-${params.id}-append`}
            style = {styles.actionLink}
            onClick = {this._enterAppend.bind(this)}
          >
            Append
          </a>
          <a
            key = {`post-${params.id}-reply`}
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
