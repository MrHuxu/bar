import React, { Component } from 'react';
import Radium, { Style } from 'radium';

import Menu from './Menu';
import PostList from './PostList';
import Notify from './Notify';
import styles from '../styles/app';

@Radium
class App extends Component {
  render () {
    return (
      <div>
        <Style rules={ styles.global } />
        <div style={ styles.rightPanel }>
          <Menu />
          <PostList />
          <Notify />
        </div>
      </div>
    );
  }
}

export default App;
