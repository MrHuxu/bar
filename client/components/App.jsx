import React, { Component } from 'react';

import PostList from './PostList';
import styles from '../styles/app';

class App extends Component {
  render () {
    return (
      <div>
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
