import React, { Component } from 'react';
import { Switch } from 'antd';

class ScoreOrder extends Component {
  state = {
    on : false
  }

  switch = on => this.setState({ on })

  render () {
    const { on } = this.state;

    return (
      <div>
        Score
        <Switch
          checked={ on }
          checkedChildren="On"
          unCheckedChildren="Off"
          onChange={ this.switch }
        />
        <Switch
          disabled={ !on }
          checkedChildren="Low to high"
          unCheckedChildren="High to low"
        />
      </div>
    );
  }
}

export default ScoreOrder;
