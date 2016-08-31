import React from 'react';
import { Card, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import styles from './styles';

export default (props) => {
  const { fakeId, data, reply } = props;

  return (
    <div className = 'ui comments'>
      <div className = 'comment'>
        <div className = 'content'>
          <span className = 'ui circular label'>
            {`#${fakeId}`}
          </span>
          {data.replyTo ?
            <span className = 'ui circular label'>
              to #{data.replyTo}
            </span> : null}
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
};
