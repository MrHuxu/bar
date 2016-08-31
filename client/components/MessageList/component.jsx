import React from 'react';

import Message from '../Message';

import styles from './styles';

export default (props) => {
  const { ids, messages } = props;

  const messageCards = ids.map(id => <Message key = {`message-${id}`} data = {messages[id]} />);

  return (
    <div style = {styles.container}>
      {messageCards}
    </div>
  );
};
