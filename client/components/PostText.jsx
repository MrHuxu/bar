import React from 'react';
import dateFormat from 'dateformat';

import renderHead from './PostHeader';
import renderAppendForm from './AppendForm';
import styles from '../styles/post-text';

export default function renderText (params) {
  var textArea = params.texts.reduce((prev, cur, index, arr) => {
    prev.push(
      <div
        key = {`post-${index}-segment`}
        className = {`ui ${index ? 'secondary' : ''} segment`}
      >
        { index ? null : renderHead.call(this, params) }
        { index
          ? <span className = 'ui label'>
            {dateFormat(cur.createdAt, "d/m/yyyy, H:MM:ss")}
          </span> : null }
        <span style = {styles.text}> {cur.text} </span>
      </div>
    );
    return prev;
  }, []);
  textArea.push(this.state.appending ? renderAppendForm.call(this, params) : null);

  return textArea;
};
