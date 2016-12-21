import React, { Component } from 'react';
import Radium, { Style } from 'radium';

import Menu from './Menu';
import PostList from './PostList';
import styles from '../styles/app';

@Radium
class App extends Component {
  render () {
    return (
      <div>
        <Style rules = {styles.global} />
        <div style = {styles.rightPanel}>
          <Menu />
          <PostList />
        </div>
      </div>
    );
  }
}

export default App;
