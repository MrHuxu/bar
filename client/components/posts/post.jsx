import React from 'react';

import { post } from '../../utils/prop-types';

const Post = ({ data }) => (
  <div>
    { data.id }
  </div>
);

Post.propTypes = {
  data : post
};

export default Post;
