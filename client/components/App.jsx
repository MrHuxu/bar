import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Sider from './sider';
import Posts from './posts';

import { sider, posts } from '../styles/app';

/**
 * Use stateful component for enabling the hot module reload
 * HMR is not working for stateless component and it will reload the whole page
 */

class App extends Component {
  render () {
    return (
      <div>
        <div style={ sider } >
          <Sider />
        </div>

        <div style={ posts }>
          <Posts />
        </div>
      </div>
    );
  }
}

App.propTypes = {
};

const mapDispatchToProps = { push };

export default connect(null, mapDispatchToProps)(App);
