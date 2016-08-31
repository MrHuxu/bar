import React from 'react';
import { Card, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default (props) => (
  <Card>
    <CardText>
      {props.data.text}
    </CardText>
  </Card>
);