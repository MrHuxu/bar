import React from 'react';
import { parse } from 'marked';

import { post } from '../../utils/prop-types';

const Post = ({ data }) => (
  <div>
    <div>{ data.createdAt.toLocaleString() }</div>
    <div dangerouslySetInnerHTML={ { __html: parse(data.content) } } />
  </div>
);

Post.propTypes = {
  data : post
};

export default Post;
