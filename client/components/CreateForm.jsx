import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Style } from 'radium';
import { parse } from 'marked';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import ContentSend from 'material-ui/svg-icons/content/send';
import {Tabs, Tab} from 'material-ui/Tabs';
import { pink700, green500 } from 'material-ui/styles/colors';

import { processElement } from '../lib/surround-words-with-spaces';
import { createPostAjax } from '../actions/PostActions';
import styles from '../styles/create-form';

class CreateForm extends Component {
  static propTypes = {
    dispatch           : PropTypes.func.isRequired,
    creating           : PropTypes.bool.isRequired,
    changeCreateStatus : PropTypes.func.isRequired
  };

  state = {
    title   : '',
    content : ''
  };

  _updateTitle (e, value) {
    this.setState({ title: value });
  }

  _updateContent (e, value) {
    this.setState({ content: value });
  }

  _create () {
    const { dispatch, changeCreateStatus } = this.props;
    const { title, content } = this.state;

    dispatch(createPostAjax(title, content));
    changeCreateStatus(false);
  }

  _highlightCode () {
    /*eslint-disable */
    $('pre code').each(function (i, block) {
      hljs.highlightBlock(block);
    });
    /*eslint-enable */
    processElement(this.refs.previewContent);
  }

  render () {
    const { creating, changeCreateStatus } = this.props;
    const { title, content } = this.state;

    return (
      <Dialog
        title = 'Create Post'
        modal = {false}
        open = {creating}
        onRequestClose = {changeCreateStatus.bind(null, false)}
      >
        <Tabs>
          <Tab label = 'Editor'>
            <TextField
              fullWidth
              autoFocus
              floatingLabelText = 'Post Title'
              onChange = {this._updateTitle.bind(this)}
            />

            <TextField
              fullWidth
              floatingLabelText = 'Post Content'
              multiLine
              rows = {9}
              onChange = {this._updateContent.bind(this)}
            />

          </Tab>
          <Tab
            label = 'Preview'
            onActive = {this._highlightCode.bind(this)}
          >
            <div style = {styles.preview} >
              <h3>{title}</h3>
              <Divider />

              <Style
                scopeSelector = '.preview-content'
                rules = {styles.previewContent}
              />

              <div
                ref = 'previewContent'
                className = 'preview-content'
                dangerouslySetInnerHTML = {{ __html: parse(content) }}
              />
            </div>
          </Tab>
        </Tabs>

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
