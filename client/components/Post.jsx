import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PostText from './PostText';
import AppendForm from './AppendForm';
import Reply from './Reply';
import ReplyForm from './ReplyForm';

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

  _enterAppend () {
    this.setState({
      appending : true,
      reply     : {
        replying : false,
        replyTo  : null
      }
    });
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

  _quitReply () {
    this.setState({
      reply : {
        replying : false,
        replyTo  : null
      }
    });
  }

  render () {
    const { data } = this.props;

    return (
      <div style = {{margin: '0 0 30px 0'}}>
        <PostText
          post = {this}
          params = {data}
        />

        {this.state.appending ? (
          <AppendForm
            post = {data}
            quitAppend = {this._quitAppend.bind(this)}
          />
        ) : null}

        {data.replies.reduce((prev, cur, index) => {
          prev.push(
            <Reply
              fakeId = {index + 1}
              data = {cur}
              enterReply = {this._enterReply.bind(this, index + 1)}
            />
          );
          return prev;
        }, [])}

        {this.state.reply.replying ? (
          <ReplyForm
            post = {data}
            replyTo = {this.state.reply.replyTo}
            quitReply = {this._quitReply.bind(this)}
          />
        ) : null}
      </div>
    );
  }
}

export default connect()(Post);
