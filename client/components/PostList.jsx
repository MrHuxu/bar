import React, { Component } from 'react';
import { func, string, shape, object, number } from 'prop-types';
import { listOf, mapOf, contains } from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import Post from './Post';
import { fetchPosts } from '../actions/post-actions';
import styles from '../styles/post-list';

class PostList extends Component {
  static propTypes = {
    dispatch : func.isRequired,
    ids      : listOf(string).isRequired,
    entities : mapOf(contains({
      id      : string.isRquired,
      title   : string.isRequired,
      appends : listOf(shape({
        text      : string.isRequired,
        createdAt : object.isRequired
      })).isRequired,
      replies : listOf(shape({
        text      : string.isRequired,
        replyTo   : number,
        createdAt : object.isRequired
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
