import React from 'react';

import renderHead from './PostHeader';
import renderAppendForm from './AppendForm';

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
            {cur.createdAt.toLocaleString()}
          </span> : null }
        <span> {cur.text} </span>
      </div>
    );
    return prev;
  }, []);
  textArea.push(this.state.appending ? renderAppendForm.call(this, params) : null);

  return textArea;
};
