import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import { blueGrey500 } from 'material-ui/styles/colors';

import CreateForm from './CreateForm';

class Menu extends Component {
  static propTypes = {
    dispatch : PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      creating : false,
      asking   : false
    };
  }

  handleChange = (event, index, value) => this.setState({value});

  _changeCreateStatus (status) {
    this.setState({ creating: status });
  }

  _changeAskStatus (status) {
    this.setState({ asking: status });
  }

  _ask () {
  }

  render () {
    return (
      <div>
        <Toolbar style = {{margin: 20, borderRadius: 2}}>
          <ToolbarGroup firstChild style = {{marginLeft: 1}}>
            <IconButton onClick = {this._changeCreateStatus.bind(this, true)}>
              <ContentAdd color = {blueGrey500} />
            </IconButton>
          </ToolbarGroup>
          <ToolbarGroup>
            <RaisedButton
              primary
              label = 'Want to edit?'
              style = {{marginRight: 100}}
              onClick = {this._changeAskStatus.bind(this, true)}
            />
          </ToolbarGroup>
        </Toolbar>

        <CreateForm
          creating = {this.state.creating}
          changeCreateStatus = {this._changeCreateStatus.bind(this)}
        />

        <Dialog
          title = 'Dialog With Actions'
          modal = {false}
          open = {this.state.asking}
          onRequestClose = {this._changeAskStatus.bind(this, false)}
        >
          The actions in this window were passed in as an array of React objects.
        </Dialog>
      </div>
    );
  }
}

export default connect()(Menu);
