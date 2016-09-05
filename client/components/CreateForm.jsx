import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { createPost } from '../actions/PostActions';
import styles from '../styles/create-form';

class CreateForm extends Component {
  static propTypes = {
    dispatch : PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);

    this.state = {
      editing : false
    };
  }

  _changeEditStatus (event, status) {
    this.setState({
      editing : status === undefined ? !this.state.editing : status
    });
  }

  _submit () {
    this.props.dispatch(createPost(
      this.refs.postTitle.value,
      this.refs.postContent.value
    ));
    this._changeEditStatus(false);
  }

  render () {
    return (
      <div
        className = 'timeline-item'
        style = {styles.container}
      >
        <button
          className = 'ui basic button'
          onClick = {this._changeEditStatus.bind(this)}
        >
          <i className = 'add square icon' />
          <span>Add Post</span>
        </button>

        { this.state.editing
          ? <div style = {styles.form}>
            <div className = 'ui form'>
              <div className = 'field'>
                <input
                  ref = 'postTitle'
                  type = 'text'
                  placeholder = 'Title'
                />
              </div>
              <div className = 'field'>
                <textarea
                  ref = 'postContent'
                  placeholder = 'Content'
                />
              </div>
              <button
                className = 'ui button'
                onClick = {this._changeEditStatus.bind(this, null, false)}
              >
                <i className = 'trash outline icon' />
              </button>
              <button
                className = 'ui button'
                onClick = {this._submit.bind(this)}
              >
                <i className = 'save icon' />
              </button>
            </div>
          </div> : null }

      </div>
    );
  }
}

export default connect()(CreateForm);
