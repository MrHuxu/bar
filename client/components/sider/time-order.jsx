import React, { Component } from 'react';
import { Switch } from 'antd';

class TimeOrder extends Component {
  state = {
    on : true
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
          checkedChildren="Far to near"
          unCheckedChildren="Near to far"
        />
      </div>
    );
  }
}

export default TimeOrder;
