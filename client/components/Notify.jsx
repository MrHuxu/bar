import React from 'react';
import { bool, shape } from 'prop-types';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';

const Notify = ({ editable, notify }) => (
  <Snackbar
    open = {notify.show}
    message = {editable ? 'Permission Granted' : 'Wrong answer so fuck off'}
    autoHideDuration = {3000}
  />
);

const mapStateToProps = ({ auth }) => {
  return {
    editable : auth.editable,
    notify   : auth.notify
  };
};

Notify.propTypes = {
  editable : PropTypes.bool.isRequired,
  notify   : PropTypes.shape({
    show : PropTypes.bool.isRequired
  })
};

export default connect(mapStateToProps)(Notify);
