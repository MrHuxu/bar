import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import Post from './Post';
import { fetchPosts } from '../actions/PostActions';
import styles from '../styles/post-list';

class PostList extends Component {
  static propTypes = {
    dispatch : PropTypes.func.isRequired,
    ids      : ImmutablePropTypes.listOf(PropTypes.string).isRequired,
    entities : ImmutablePropTypes.mapOf(ImmutablePropTypes.contains({
      id      : PropTypes.string.isRquired,
      title   : PropTypes.string.isRequired,
      appends : ImmutablePropTypes.listOf(PropTypes.shape({
        text      : PropTypes.string.isRequired,
        createdAt : PropTypes.object.isRequired
      })).isRequired,
      replies : ImmutablePropTypes.listOf(PropTypes.shape({
        text      : PropTypes.string.isRequired,
        replyTo   : PropTypes.number,
        createdAt : PropTypes.object.isRequired
      }))
    })).isRequired
  };

  componentDidMount () {
    this.props.dispatch(fetchPosts());
  }

  renderPosts () {
    const { ids, entities } = this.props;

    var posts = entities.toJS();
    for (let key in posts) {
      let post = posts[key];
      post.updatedAt = new Date(Math.max.apply(null, post.appends.map(text => text.createdAt).concat(post.createdAt).concat(post.replies.map(reply => reply.createdAt))));
    }

    return ids.sort((id1, id2) => {
      return posts[id1].updatedAt > posts[id2].updatedAt ? -1 : 1;
    }).map(id => <Post key = {`post-${id}`} data = {posts[id]} />).reduce((prev, curr, index) => {
      prev[index % 3] ? prev[index % 3].push(curr) : prev[index % 3] = [curr];
      return prev;
    }, []).map((postCol, index) => <div key = {`post-col-${index}`} style = {styles.postCol}> {postCol} </div>);
  }

  render () {
    return (
      <div style = {styles.container}>
        {this.renderPosts()}
      </div>
    );
  }
}

var mapStateToProps = ({ post }) => {
  return {
    ids      : post.ids,
    entities : post.entities
  };
};

export default connect(mapStateToProps)(PostList);
