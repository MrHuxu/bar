import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import dateFormat from 'dateformat';

import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {blue500, yellow600} from 'material-ui/styles/colors';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import Chip from 'material-ui/Chip';
import { ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import ContentReply from 'material-ui/svg-icons/content/reply';
import { lightBlue700 } from 'material-ui/styles/colors';

import { processText } from '../lib/surround-words-with-spaces';
import styles from '../styles/reply';

const Reply = ({ id, fakeId, data, enterReply, editable }) => (
  <ListItem
    key = {`post-${id}-comment-${fakeId}`}
    rightIcon = {
      <IconButton
        disabled = {!editable}
        style = {styles.replyBtnStyle}
        iconStyle = {styles.replyIconStyle}
        onClick = {enterReply}
      >
        <ContentReply color = {lightBlue700} />
      </IconButton>
    }
    primaryText = {processText(data.text)}
    secondaryText = {dateFormat(data.createdAt, 'd/m/yyyy, H:MM:ss')}
  />
  // <ListItem
  //   key = {`post-${id}-comment-${fakeId}`}
  //   innerDivStyle = {styles.container}
  //   primaryText = {
  //     <div style = {styles.replyHeader}>
  //       <Chip
  //         style = {styles.timeChip}
  //         labelColor = '#888'
  //       >
  //         {`#${fakeId}`}
  //       </Chip>

  //       { data.replyTo ? (
  //         <Chip
  //           style = {styles.timeChip}
  //           labelColor = '#888'
  //         >
  //           to #{data.replyTo}
  //         </Chip>
  //         ) : null }

  //       {dateFormat(data.createdAt, 'd/m/yyyy, H:MM:ss')}

  //       <IconButton
  //         disabled = {!editable}
  //         style = {styles.replyBtnStyle}
  //         iconStyle = {styles.replyIconStyle}
  //         onClick = {enterReply}
  //       >
  //         <ContentReply color = {lightBlue700} />
  //       </IconButton>

  //     </div>
  //   }
  //   secondaryText = {processText(data.text)}
  // />
);

Reply.propTypes = {
  id     : PropTypes.string,
  fakeId : PropTypes.number.isRequired,
  data   : PropTypes.shape({
    text      : PropTypes.string.isRequired,
    replyTo   : PropTypes.number,
    createdAt : PropTypes.object.isRequired
  }),
  enterReply : PropTypes.func.isRequired,
  editable   : PropTypes.bool.isRequired
};

const mapStateToProps = ({ auth }) => {
  return {
    editable : auth.editable
  };
};

export default connect(mapStateToProps)(Reply);
