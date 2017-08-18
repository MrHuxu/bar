import React from 'react';
import { StyleRoot } from 'radium';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { rootStore } from './store';

import App from './components/App';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

render(
  <StyleRoot>
    <Provider store = {rootStore}>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </Provider>
  </StyleRoot>,
  document.getElementById('bar-of-xhu')
);
