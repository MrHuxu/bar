import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import ContentSend from 'material-ui/svg-icons/content/send';

import { replyPostAjax } from '../actions/post-actions';

const ReplyForm = ({ post, replyTo, quitReply, reply }) => {
  var replyInput;

  return (
    <div key = {`post-${post.id}-reply-${replyTo}`}>
      {replyTo ? <FlatButton disabled> {`to #${replyTo}`}</FlatButton> : null }

      <TextField
        autoFocus
        ref = {node => replyInput = node}
        hintText = 'Reply Content'
      />

      <FlatButton
        icon = {<ContentRemove />}
        onClick = {quitReply}
      />

      <FlatButton
        icon = {<ContentSend />}
        onClick = {() => reply(replyInput)}
      />
    </div>
  );
};

ReplyForm.propTypes = {
  post : PropTypes.shape({
    id        : PropTypes.string.isRquired,
    title     : PropTypes.string.isRequired,
    content   : PropTypes.string.isRequired,
    createdAt : PropTypes.object.isRequired,
    appends   : PropTypes.arrayOf(PropTypes.shape({
      text      : PropTypes.string.isRequired,
      createdAt : PropTypes.object.isRequired
    })).isRequired,
    replies : PropTypes.arrayOf(PropTypes.shape({
      text      : PropTypes.string.isRequired,
      replyTo   : PropTypes.number,
      createdAt : PropTypes.object.isRequired
    })).isRequired
  }),
  replyTo   : PropTypes.number,
  quitReply : PropTypes.func.isRequired,
  reply     : PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    reply : (replyInput) => {
      const { post, replyTo, quitReply } = ownProps;
      const replyingContent = replyInput.getValue().trim();
      dispatch(replyPostAjax(post.id, {
        replyTo : replyTo,
        text    : replyingContent
      }));
      quitReply();
      $('html, body').animate({ scrollTop: 0 });   // eslint-disable-line
    }
  };
};

export default connect(null, mapDispatchToProps)(ReplyForm);
