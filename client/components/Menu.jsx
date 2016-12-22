import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import { blueGrey500 } from 'material-ui/styles/colors';

import CreateForm from './CreateForm';
import AuthForm from './AuthForm';

class Menu extends Component {
  static propTypes = {
    dispatch : PropTypes.func.isRequired,
    editable : PropTypes.bool.isRequired
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

  render () {
    const { editable } = this.props;
    const { creating, asking } = this.state;

    return (
      <div>
        <Toolbar style = {{margin: 20, borderRadius: 2}}>
          <ToolbarGroup firstChild style = {{marginLeft: 1}}>
            <IconButton
              disabled = {!editable}
              onClick = {this._changeCreateStatus.bind(this, true)}
            >
              <ContentAdd color = {blueGrey500} />
            </IconButton>
          </ToolbarGroup>
          {editable ? null : (
            <ToolbarGroup>
              <RaisedButton
                primary
                label = 'Want to edit?'
                style = {{marginRight: 100}}
                onClick = {this._changeAskStatus.bind(this, true)}
              />
            </ToolbarGroup>
          )}
        </Toolbar>

        <CreateForm
          creating = {creating}
          changeCreateStatus = {this._changeCreateStatus.bind(this)}
        />

        <AuthForm
          asking = {asking}
          changeAskStatus = {this._changeAskStatus.bind(this)}
        />

      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    editable : auth.editable
  };
};

export default connect(mapStateToProps)(Menu);
