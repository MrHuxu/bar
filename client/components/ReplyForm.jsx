import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import ContentSend from 'material-ui/svg-icons/content/send';

import { replyPostAjax } from '../actions/PostActions';

const reply = (dispatch, post, replyTo, quitReply) => {
  var replyingContent = $(`#post-${post.id}-replying-content`).val();   // eslint-disable-line
  dispatch(replyPostAjax(post.id, {
    replyTo : replyTo,
    text    : replyingContent
  }));
  quitReply();
  $('html, body').animate({ scrollTop: 0 });   // eslint-disable-line
};

const ReplyForm = ({ dispatch, post, replyTo, quitReply }) => (
  <div key = {`post-${post.id}-reply-${replyTo}`}>
    {replyTo ? <FlatButton disabled> {`to #${replyTo}`}</FlatButton> : null }

    <TextField
      id = {`post-${post.id}-replying-content`}
      hintText = 'Reply Content'
    />

    <FlatButton
      icon = {<ContentRemove />}
      onClick = {quitReply}
    />

    <FlatButton
      icon = {<ContentSend />}
      onClick = {reply.bind(null, dispatch, post, replyTo, quitReply)}
    />
  </div>
);

ReplyForm.propTypes = {
  dispatch : PropTypes.func.isRequired,
  post     : PropTypes.shape({
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
  quitReply : PropTypes.func.isRequired
};

export default connect()(ReplyForm);
