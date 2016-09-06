import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Radium, { Style } from 'radium';

import renderText from './PostText';
import renderReply from './Reply';
import renderReplyForm from './ReplyForm';
import { appendPostAjax, replyPostAjax } from '../actions/PostActions';
import styles from '../styles/post';

@Radium
class Post extends Component {
  static propTypes = {
    dispatch : PropTypes.func.isRequired,
    data     : PropTypes.shape({
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
    if (appendForm) this._bindEventsToAppendForm();
    if (replyForm) this._bindEventsToReplyForm();
  }

  _bindEventsToAppendForm () {
    this.refs.appendForm.onfocus = (e) => {
      this.refs.appendForm.onkeypress = (e) => {
        switch (e.keyCode) {
          case 13:
            this._append();
            break;

          case 27:
            this._quitAppend();
            break;

          default:
            break;
        }
      };
    };
    this.refs.appendForm.focus();
  }

  _bindEventsToReplyForm () {
    this.refs.replyForm.onfocus = (e) => {
      this.refs.replyForm.onkeypress = (e) => {
        switch (e.keyCode) {
          case 13:
            this._reply();
            break;

          case 27:
            this._quitReply();
            break;

          default:
            break;
        }
      };
    };
    this.refs.replyForm.focus();
  }

  _enterAppend () {
    this.setState({
      appending : true,
      reply     : {
        replying : false,
        replyTo  : null
      }
    });
  }

  _append () {
    const { dispatch, data } = this.props;

    dispatch(appendPostAjax(data.id, this.refs.appendForm.value));
    this._quitAppend();
  }

  _quitAppend () {
    this.setState({
      appending : false
    });
  }

  _enterReply (id) {
    this.setState({
      appending : false,
      reply     : {
        replying : true,
        replyTo  : id
      }
    });
  }

  _reply () {
    const { dispatch, data } = this.props;

    dispatch(replyPostAjax(data.id, {
      replyTo : this.state.reply.replyTo,
      text    : this.refs.replyForm.value
    }));
    this._quitReply();
  }

  _quitReply () {
    this.setState({
      reply : {
        replying : false,
        replyTo  : null
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
      <div style = {styles.container}>
        <Style rules = {styles.global} />
        <div className = 'timeline-item'>
          <div className = 'ui piled segments'>
            {renderText.call(this, data)}
          </div>
        </div>
        <div style = {styles.replyArea}>
          {this.renderReplyArea(data)}
        </div>
      </div>
    );
  }
}

export default connect()(Post);
