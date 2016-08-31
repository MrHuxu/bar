import { Component } from 'react';

import component from './component';

class App extends Component {
  render () {
    return component(this.props);
  }
}

export default App;
