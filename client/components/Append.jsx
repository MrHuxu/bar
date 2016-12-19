import React from 'react';
import dateFormat from 'dateformat';

import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';

import { processText } from '../lib/surround-words-with-spaces';
import styles from '../styles/append';

export function renderAppend ({ append, postId, index }) {
  return (
    <div>
      <Divider />
      <div key = {`post-${postId}-append-${index}`} style = {styles.container}>
        <Chip
          style = {styles.timeChip}
          labelColor = '#777'
        >
          {dateFormat(append.createdAt, 'd/m/yyyy, H:MM:ss')}
        </Chip>
        <span style = {styles.text}> {processText(append.text)} </span>
      </div>
    </div>
  );
}
