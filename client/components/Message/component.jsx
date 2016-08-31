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
    if (index) {
      prev.push(<Divider />);
    }
    prev.push(<p> {cur.text} </p>);

    return prev;
  }, []);

  const replyArea = data.replies.map(reply => <Reply data={reply}/>);

  return (
    <div
      className = 'timeline-item'
      style = {styles.container}
    >
      <Style rules = {styles.global} />
      <Card>
        <CardText>
          <div style={styles.header}>
            <span style={styles.title}> {data.title} </span>
            <span style = {styles.time}> {updatedAt} </span>
          </div>
          <div>
            {textArea}
          </div>
        </CardText>
      </Card>
      {replyArea}
    </div>
  );
};
