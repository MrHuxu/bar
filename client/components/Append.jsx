import React from 'react';
import { shape, object, string, number } from 'prop-types';
import dateFormat from 'dateformat';

import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';

import { processText } from '../lib/surround-words-with-spaces';
import styles from '../styles/append';

const Append = ({ append, postId, index }) => (
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

Append.propTypes = {
  append : shape({
    text      : string.isRequired,
    createdAt : object.isRequired
  }).isRequired,
  postId : string.isRequired,
  index  : number.isRequired
};

export default Append;
