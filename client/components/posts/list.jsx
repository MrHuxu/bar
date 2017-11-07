import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchPosts } from '../../actions/post-actions';
import { func, arrayOf, objectOf, id, post } from '../../utils/prop-types';

import AddPost from './add-post';
import Post from './post';

import { Timeline } from 'antd';
const { Item } = Timeline;

class List extends Component {
  static propTypes = {
    fetchPosts : func.isRequired,
    ids        : arrayOf(id),
    entities   : objectOf(post)
  }
  componentDidMount () {
    const { fetchPosts } = this.props;

    fetchPosts();
  }

  render () {
    const { ids, entities } = this.props;

    return (
      <Timeline>
        <Item>
          <AddPost />
        </Item>
        { ids.map(id => (
          <Item key={ id }>
            <Post data={ entities[id] } />
          </Item>
        )) }
      </Timeline>
    );
  }
}

const mapStateToProps = ({ post }) => ({
  ids      : post.ids,
  entities : post.entities
});

const mapDispatchToProps = { fetchPosts };

export default connect(mapStateToProps, mapDispatchToProps)(List);
