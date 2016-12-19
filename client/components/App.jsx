import React, { Component } from 'react';
import Radium, { Style } from 'radium';

import PostList from './PostList';
import styles from '../styles/app';

@Radium
class App extends Component {
  render () {
    return (
      <div>
        <Style rules = {styles.global} />
        <div style = {styles.rightPanel}>
          <PostList />
        </div>
      </div>
    );
  }
}

export default App;
