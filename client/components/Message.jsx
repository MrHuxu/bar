import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Radium, { Style } from 'radium';

import renderText from './MessageText';
import renderReply from './Reply';
import renderReplyForm from './ReplyForm';
import { appendMessage, replyMessage } from '../actions/MessageActions';
import styles from '../styles/message';

@Radium
class Message extends Component {
  static propTypes = {
    dispatch : PropTypes.func.isRequired,
    data     : PropTypes.shape({
      id    : PropTypes.string.isRquired,
      title : PropTypes.string.isRequired,
      texts : PropTypes.arrayOf(PropTypes.shape({
        text      : PropTypes.string.isRequired,
        createdAt : PropTypes.object.isRequired
      })).isRequired,
      replies : PropTypes.arrayOf(PropTypes.shape({
        text      : PropTypes.string.isRequired,
        replyTo   : PropTypes.number,
        createdAt : PropTypes.object.isRequired
      })).isRequired
    })
  };

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

  componentDidUpdate (prevProps, prevState) {
    const { appendForm, replyForm } = this.refs;
    if (appendForm) appendForm.focus();
    if (replyForm) replyForm.focus();
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

  renderReplyArea (data) {
    var replyArea = data.replies.reduce((prev, cur, index) => {
      prev.push(
        renderReply({
          fakeId : index + 1,
          data   : cur,
          reply  : this._enterReply.bind(this, index + 1)
        })
      );
      return prev;
    }, []);
    replyArea.push(this.state.reply.replying ? renderReplyForm.call(this, data, this.state.reply.replyTo) : null);

    return replyArea;
  }

  render () {
    const { data } = this.props;

    return (
      <div
        className = 'timeline-item'
        style = {styles.container}
      >
        <Style rules = {styles.global} />
        <div className = 'ui piled segments'>
          {renderText.call(this, data)}
        </div>
        {this.renderReplyArea(data)}
      </div>
    );
  }
}

export default connect()(Message);
