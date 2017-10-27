import React from 'react';
import { Timeline, Button, Icon } from 'antd';
const { Item } = Timeline;

const AddPost = () => (
  <Item>
    <Button>
      <Icon type="plus" />
    </Button>
  </Item>
);

export default AddPost;
