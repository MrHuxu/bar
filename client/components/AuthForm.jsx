import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import ContentSend from 'material-ui/svg-icons/content/send';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import { orange500, tealA700 } from 'material-ui/styles/colors';

import { getQuestionAjax, clearQuestion, validateAnswerAjax } from '../actions/auth-actions';

class AuthForm extends Component {
  static propTypes = {
    dispatch        : PropTypes.func.isRequired,
    asking          : PropTypes.bool.isRequired,
    label           : PropTypes.string.isRequired,
    changeAskStatus : PropTypes.func.isRequired
  };

  componentDidUpdate (prevProps, prevState) {
    const { asking, dispatch } = this.props;

    if (!prevProps.asking && asking) {
      dispatch(getQuestionAjax());
    }

    if (prevProps.asking && !asking) {
      dispatch(clearQuestion());
    }
  }

  _check () {
    const { label, changeAskStatus, dispatch } = this.props;
    dispatch(validateAnswerAjax({
      label  : label,
      answer : this.refs.answerContent.getValue()
    }));
    changeAskStatus(false);
  }

  render () {
    const { asking, changeAskStatus, label } = this.props;

    return (
      <Dialog
        title = 'Apply Permission'
        open = {asking}
        onRequestClose = {changeAskStatus.bind(null, false)}
      >
        <div style = {{ position: 'relative' }}>
          {label.length ? label : (
            <RefreshIndicator
              size = {25}
              left = {10}
              top = {10}
              loadingColor = '#FF9800'
              status = 'loading'
            />
          )}
        </div>
        <TextField
          autoFocus
          id = 'asking-answer'
          ref = 'answerContent'
          disabled = {!label.length}
          underlineFocusStyle = {{ borderColor: orange500 }}
        />
        <FlatButton
          icon = {<ContentSend color = {tealA700} />}
          onClick = {this._check.bind(this)}
          disabled = {!label.length}
        />
      </Dialog>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    label : auth.questionLabel
  };
};

export default connect(mapStateToProps)(AuthForm);
