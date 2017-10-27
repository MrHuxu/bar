import React from 'react';
import { Switch } from 'antd';

const TimeSeqSwitcher = () => (
  <Switch checkedChildren="Group by category" unCheckedChildren="Order by time" />
);

export default TimeSeqSwitcher;
