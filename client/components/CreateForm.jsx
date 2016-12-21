import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import ContentSend from 'material-ui/svg-icons/content/send';
import { pink700, green500 } from 'material-ui/styles/colors';

import { createPostAjax } from '../actions/PostActions';

const create = (dispatch, changeCreateStatus) => {
  var creatingTitle = $(`#post-creating-title`).val();   // eslint-disable-line
  var creatingContent = $(`#post-creating-content`).val();   // eslint-disable-line

  dispatch(createPostAjax(
    creatingTitle,
    creatingContent
  ));
  changeCreateStatus(false);
};

const CreateForm = ({ dispatch, creating, changeCreateStatus }) => (
  <Dialog
    title = 'Create Post'
    modal = {false}
    open = {creating}
    onRequestClose = {changeCreateStatus.bind(null, false)}
  >
    <TextField
      fullWidth
      id = 'post-creating-title'
      floatingLabelText = 'postTitle'
    />

    <TextField
      fullWidth
      id = 'post-creating-content'
      floatingLabelText = 'Post Content'
      multiLine
      rows = {9}
    />

    <FlatButton
      icon = {<ContentRemove color = {pink700} />}
      onClick = {changeCreateStatus.bind(null, false)}
    />

    <FlatButton
      icon = {<ContentSend color = {green500} />}
      onClick = {create.bind(null, dispatch, changeCreateStatus)}
    />
  </Dialog>
);

CreateForm.propTypes = {
  dispatch           : PropTypes.func.isRequired,
  creating           : PropTypes.bool.isRequired,
  changeCreateStatus : PropTypes.func.isRequired
};

export default connect()(CreateForm);
