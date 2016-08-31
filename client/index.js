import $ from 'jquery';
window.jQuery = $; // Assure it's available globally.

import React from 'react';
import { StyleRoot } from 'radium';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { rootStore } from './store';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import App from './components/App';

injectTapEventPlugin();

render(
  <StyleRoot>
    <MuiThemeProvider muiTheme = {getMuiTheme()}>
      <Provider store = {rootStore}>
        <App />
      </Provider>
    </MuiThemeProvider>
  </StyleRoot>,
  document.getElementById('bar-of-xhu')
);
