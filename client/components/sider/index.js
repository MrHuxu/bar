import React from 'react';

import TimeOrder from './time-order';
import ScoreOrder from './score-order';
import TagGroup from './tag-group';

const Sider = () => (
  <div>
    Sort by:
    <TimeOrder />
    <ScoreOrder />

    Group by:
    <TagGroup />
  </div>
);

export default Sider;
