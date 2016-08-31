import React from 'react';
import { Style } from 'radium';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';

import Reply from '../Reply';

import styles from './styles';

export default (props) => {
  const { data, replyIds, replies } = props;
  const updatedAt = `@ ${data.texts[data.texts.length - 1].createdAt}`;

  const textArea = data.texts.reduce((prev, cur, index, arr) => {
    prev.push(
      <div className= {`ui ${index ? 'secondary' : ''} segment`}>
        {index ? null : 
          <h4 className="ui header">
            <div className="content">
              {data.title}
              <div className="sub header">{updatedAt}</div>
            </div>
          </h4>
        }
        <p> {cur.text} </p>
      </div>
    );
    return prev;
  }, []);

  const replyArea = data.replies.map(reply => <Reply data={reply}/>);

  return (
    <div
      className = 'timeline-item'
      style = {styles.container}
    >
      <Style rules = {styles.global} />
      <div className="ui piled segments">
        {textArea}
      </div>
    </div>
  );
};
