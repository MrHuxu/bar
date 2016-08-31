import { Component, PropTypes } from 'react';

import component from './component';

class Message extends Component {
  render () {
    return component(this.props);
  }
}

export default Message;
