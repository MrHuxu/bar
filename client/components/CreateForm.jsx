import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import ContentSend from 'material-ui/svg-icons/content/send';
import { pink700, green500 } from 'material-ui/styles/colors';

import styles from '../styles/create-form';

export function renderCreateForm () {
  return (
    <Dialog
      title = 'Create Post'
      modal = {false}
      open = {this.state.creating}
      onRequestClose = {this._changeCreateStatus.bind(this, false)}
    >
      <TextField
        fullWidth
        ref = 'postTitle'
        floatingLabelText = 'postTitle'
      />
      <TextField
        fullWidth
        ref = 'postContent'
        floatingLabelText = 'Post Content'
        multiLine
        rows = {9}
      />
      <FlatButton
        icon = {<ContentRemove color = {pink700} />}
        onClick = {this._changeCreateStatus.bind(this, false)}
      />

      <FlatButton
        icon = {<ContentSend color = {green500} />}
        onClick = {this._create.bind(this)}
      />
    </Dialog>
  );
}
