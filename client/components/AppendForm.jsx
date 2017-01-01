import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import ContentSend from 'material-ui/svg-icons/content/send';
import { pink400 } from 'material-ui/styles/colors';

import { appendPostAjax } from '../actions/PostActions';

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
  quitAppend : PropTypes.func.isRequired,
  append     : PropTypes.func.isRequired
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
