import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Message from './Message';
import styles from '../styles/message-list';

class MessageList extends Component {
  static propTypes = {
    dispatch : PropTypes.func.isRequired,
    ids      : PropTypes.arrayOf(PropTypes.string).isRequired,
    messages : PropTypes.objectOf(PropTypes.shape({
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
      }))
    })).isRequired
  };

  render () {
    const { ids, messages } = this.props;

    const messageCards = ids.map(id => <Message key = {`message-${id}`} data = {messages[id]} />);

    return (
      <div style = {styles.container}>
        {messageCards}
      </div>
    );
  }
}

var mapStateToProps = (state) => {
  return {
    ids      : state.message.ids,
    messages : state.message.entities
  };
};

export default connect(mapStateToProps)(MessageList);
