import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import CreateForm from './CreateForm';
import Post from './Post';
import styles from '../styles/post-list';

class PostList extends Component {
  static propTypes = {
    dispatch : PropTypes.func.isRequired,
    ids      : PropTypes.arrayOf(PropTypes.string).isRequired,
    posts    : PropTypes.objectOf(PropTypes.shape({
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
    const { ids, posts } = this.props;

    const postCards = ids.reverse().map(id => <Post key = {`post-${id}`} data = {posts[id]} />);

    return (
      <div style = {styles.container}>
        <CreateForm />
        {postCards}
      </div>
    );
  }
}

var mapStateToProps = (state) => {
  return {
    ids   : state.post.ids,
    posts : state.post.entities
  };
};

export default connect(mapStateToProps)(PostList);
