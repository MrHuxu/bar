import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import component from './component';
import { appendMessage, replyMessage } from '../../actions/MessageActions';

@Radium
class Message extends Component {
  constructor (props) {
    super(props);

    this.state = {
      appending : false,
      reply     : {
        replying : false,
        replyTo  : null
      }
    };
  }

  _enterAppend () {
    this.setState({
      appending : true
    });
  }

  _append () {
    const { dispatch, data } = this.props;

    dispatch(appendMessage(data.id, {
      text      : this.refs.appendForm.value,
      createdAt : new Date()
    }));
    this._quitAppend();
  }

  _quitAppend () {
    this.setState({
      appending : false
    });
  }

  _enterReply (id) {
    this.setState({
      reply : {
        replying : true,
        replyTo  : id
      }
    });
  }

  _reply (replyTo) {
    const { dispatch, data } = this.props;

    dispatch(replyMessage(data.id, {
      replyTo,
      text      : this.refs.replyForm.value,
      createdAt : new Date()
    }));
    this._quitReply();
  }

  _quitReply () {
    this.setState({
      reply : {
        replying : false

      }
    });
  }

  componentDidUpdate (prevProps, prevState) {
    const { appendForm, replyForm } = this.refs;
    if (appendForm) appendForm.focus();
    if (replyForm) replyForm.focus();
  }

  render () {
    return component.call(this, this.props);
  }
}

export default connect()(Message);
