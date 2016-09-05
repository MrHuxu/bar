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
        <div style = {styles.leftPanel}>
          <p> Take care of every word you input </p>
          <p> In a bar, what is done is done </p>
        </div>
        <div style = {styles.rightPanel}>
          <PostList
         />
        </div>
      </div>
    );
  }
}

export default App;
