import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import ContentSend from 'material-ui/svg-icons/content/send';
import { pink700, green500 } from 'material-ui/styles/colors';

import { createPostAjax } from '../actions/PostActions';

class CreateForm extends Component {
  static propTypes = {
    dispatch           : PropTypes.func.isRequired,
    creating           : PropTypes.bool.isRequired,
    changeCreateStatus : PropTypes.func.isRequired
  };

  _create () {
    const { dispatch, changeCreateStatus } = this.props;

    dispatch(createPostAjax(
      this.refs.creatingTitle.getValue(),
      this.refs.creatingContent.getValue()
    ));
    changeCreateStatus(false);
  }

  render () {
    const { creating, changeCreateStatus } = this.props;

    return (
      <Dialog
        title = 'Create Post'
        modal = {false}
        open = {creating}
        onRequestClose = {changeCreateStatus.bind(null, false)}
      >
        <TextField
          fullWidth
          ref = 'creatingTitle'
          floatingLabelText = 'postTitle'
        />

        <TextField
          fullWidth
          ref = 'creatingContent'
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
          onClick = {this._create.bind(this)}
        />
      </Dialog>
    );
  }
}

export default connect()(CreateForm);
