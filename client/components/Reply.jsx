import React, { PropTypes } from 'react';
import dateFormat from 'dateformat';

import Chip from 'material-ui/Chip';
import { ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import ContentReply from 'material-ui/svg-icons/content/reply';
import { lightBlue700 } from 'material-ui/styles/colors';

import { processText } from '../lib/surround-words-with-spaces';
import styles from '../styles/reply';

const Reply = ({ id, fakeId, data, enterReply }) => (
  <ListItem
    key = {`post-${id}-comment-${fakeId}`}
    innerDivStyle = {styles.container}
    primaryText = {
      <div style = {styles.replyHeader}>
        <Chip
          style = {styles.timeChip}
          labelColor = '#888'
        >
          {`#${fakeId}`}
        </Chip>

        { data.replyTo ? (
          <Chip
            style = {styles.timeChip}
            labelColor = '#888'
          >
            to #{data.replyTo}
          </Chip>
          ) : null }

        {dateFormat(data.createdAt, 'd/m/yyyy, H:MM:ss')}

        <IconButton
          style = {styles.replyBtnStyle}
          iconStyle = {styles.replyIconStyle}
          onClick = {enterReply}
        >
          <ContentReply color = {lightBlue700} />
        </IconButton>

      </div>
    }
    secondaryText = {processText(data.text)}
  />
);

Reply.propTypes = {
  id     : PropTypes.string.isRequired,
  fakeId : PropTypes.number.isRequired,
  data   : PropTypes.shape({
    text      : PropTypes.string.isRequired,
    replyTo   : PropTypes.number,
    createdAt : PropTypes.object.isRequired
  }),
  enterReply : PropTypes.func.isRequired
};

export default Reply;
