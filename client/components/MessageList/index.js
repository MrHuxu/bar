import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import component from './component';

class MessageList extends Component {
  static propTypes = {
    dispatch : PropTypes.func.isRequired,
    ids      : PropTypes.arrayOf(PropTypes.string).isRequired,
    messages : PropTypes.objectOf(PropTypes.shape({
      id    : PropTypes.string.isRequired,
      title : PropTypes.string,
      texts : PropTypes.arrayOf(PropTypes.shape({
        text : PropTypes.string
      }))
    })).isRequired
  };

  render () {
    return component(this.props);
  }
}

var mapStateToProps = (state) => {
  return {
    ids      : state.message.ids,
    messages : state.message.entities
  };
};

export default connect(mapStateToProps)(MessageList);
