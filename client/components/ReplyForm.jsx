import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import ContentSend from 'material-ui/svg-icons/content/send';

export default function renderReplyForm (params, replyTo) {
  return (
    <div key = {`post-${params.id}-reply-${replyTo}`}>
      {replyTo ? <FlatButton disabled> {`to #${replyTo}`}</FlatButton> : null }

      <TextField
        ref = 'replyForm'
        hintText = 'Reply Content'
      />

      <FlatButton
        icon = {<ContentRemove />}
        onClick = {this._quitReply.bind(this)}
      />

      <FlatButton
        icon = {<ContentSend />}
        onClick = {this._reply.bind(this)}
      />
    </div>
  );
};
