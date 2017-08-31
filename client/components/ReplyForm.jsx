import React from 'react';
import { shape, string, object, arrayOf, number, func } from 'prop-types';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import ContentSend from 'material-ui/svg-icons/content/send';

import { replyPostAjax } from '../actions/post-actions';

const ReplyForm = ({ post, replyTo, quitReply, reply }) => {
  var replyInput;

  return (
    <div key={ `post-${post.id}-reply-${replyTo}` }>
      {replyTo ? <FlatButton disabled> {`to #${replyTo}`}</FlatButton> : null }

      <TextField
        autoFocus
        ref={ node => replyInput = node }
        hintText='Reply Content'
      />

      <FlatButton
        icon={ <ContentRemove /> }
        onClick={ quitReply }
      />

      <FlatButton
        icon={ <ContentSend /> }
        onClick={ () => reply(replyInput) }
      />
    </div>
  );
};

ReplyForm.propTypes = {
  post : shape({
    id        : string.isRquired,
    title     : string.isRequired,
    content   : string.isRequired,
    createdAt : object.isRequired,
    appends   : arrayOf(shape({
      text      : string.isRequired,
      createdAt : object.isRequired
    })).isRequired,
    replies : arrayOf(shape({
      text      : string.isRequired,
      replyTo   : number,
      createdAt : object.isRequired
    })).isRequired
  }),
  replyTo   : number,
  quitReply : func.isRequired,
  reply     : func.isRequired
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
