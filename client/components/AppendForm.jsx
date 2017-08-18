import React from 'react';
import { shape, string, object, arrayOf, number, func } from 'prop-types';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import ContentSend from 'material-ui/svg-icons/content/send';
import { pink400 } from 'material-ui/styles/colors';

import { appendPostAjax } from '../actions/post-actions';

const AppendForm = ({ post, quitAppend, append }) => {
  var appendInput;

  return (
    <div key = {`post-${post.id}-appending`}>
      <TextField
        autoFocus
        hintText = 'Append Content'
        ref = {node => appendInput = node}
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
        onClick = {() => append(appendInput)}
      />
    </div>
  );
};

AppendForm.propTypes = {
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
  quitAppend : func.isRequired,
  append     : func.isRequired
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    append : (appendInput) => {
      const { post, quitAppend } = ownProps;
      const appendingContent = appendInput.getValue().trim();
      dispatch(appendPostAjax(post.id, appendingContent));
      quitAppend();
      $('html, body').animate({ scrollTop: 0 });   // eslint-disable-line
    }
  };
};

export default connect(null, mapDispatchToProps)(AppendForm);
