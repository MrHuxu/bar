import React from 'react';
import dateFormat from 'dateformat';

import renderHead from './PostHeader';
import renderAppendForm from './AppendForm';
import styles from '../styles/post-text';

export default function renderText (params) {
  var textArea = params.appends.reduce((prev, cur, index, arr) => {
    prev.push(
      <div
        key = {`post-${params.id}-append-${index}`}
        className = 'ui secondary segment'
      >
        <span className = 'ui label'>
          {dateFormat(cur.createdAt, 'd/m/yyyy, H:MM:ss')}
        </span>
        <span style = {styles.text}> {cur.text} </span>
      </div>
    );
    return prev;
  }, [
    <div
      key = {`post-${params.id}-main-content`}
      className = 'ui segment'
    >
      {renderHead.call(this, params)}
      <span style = {styles.text}> {params.content} </span>
    </div>
  ]);
  textArea.push(this.state.appending ? renderAppendForm.call(this, params) : null);

  return textArea;
};
