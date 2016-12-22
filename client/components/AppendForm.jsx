import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import ContentSend from 'material-ui/svg-icons/content/send';
import { pink400 } from 'material-ui/styles/colors';

import { appendPostAjax } from '../actions/PostActions';

class AppendForm extends Component {
  static propTypes = {
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
    quitAppend : PropTypes.func.isRequired
  };

  _append () {
    const { dispatch, post, quitAppend } = this.props;
    var appendingContent = this.refs.appendContent.getValue();
    dispatch(appendPostAjax(post.id, appendingContent));
    quitAppend();
    $('html, body').animate({ scrollTop: 0 });   // eslint-disable-line
  }

  render () {
    const { post, quitAppend } = this.props;

    return (
      <div key = {`post-${post.id}-appending`}>
        <TextField
          hintText = 'Append Content'
          ref = 'appendContent'
          multiLine
          rows = {2}
          underlineFocusStyle = {{borderColor: pink400}}
        />

        <FlatButton
          icon = {<ContentRemove />}
          onClick = {quitAppend}
        />

        <FlatButton
          icon = {<ContentSend />}
          onClick = {this._append.bind(this)}
        />
      </div>
    );
  }
}

export default connect()(AppendForm);
