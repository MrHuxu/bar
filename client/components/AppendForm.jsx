import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import ContentSend from 'material-ui/svg-icons/content/send';
import { pink400 } from 'material-ui/styles/colors';

export default function renderAppendForm (params) {
  return (
    <div key = {`post-${params.id}-append`}>
      <TextField
        ref = 'appendForm'
        hintText = 'Append Content'
        multiLine
        rows = {2}
        underlineFocusStyle = {{borderColor: pink400}}
      />

      <FlatButton
        icon = {<ContentRemove />}
        onClick = {this._quitAppend.bind(this)}
      />

      <FlatButton
        icon = {<ContentSend />}
        onClick = {this._append.bind(this)}
      />
    </div>
  );
};
