import React from 'react';
import MessageList from '../MessageList';
import styles from './styles';

export default (props) => (
  <div>
    <div style = {styles.leftPanel}>
      <p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Create, append and reply a message </p>
      <p> But edit or delete is not allowed </p>
      <p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Take care of every word you input </p>
      <p> In a bar, what is done is done </p>
    </div>
    <div style = {styles.rightPanel}>
      <MessageList />
    </div>
  </div>
);
