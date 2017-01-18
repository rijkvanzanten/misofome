import React from 'react';
import moment from 'moment';

import { Card as CardContainer, CardHeader, CardMedia, CardText, CardTitle } from 'material-ui/Card';

moment.locale('nl');

const styles = {
  CardContainer: {
    margin: '10px',
  },
};

const Card = props => (
  <CardContainer style={styles.CardContainer}>
    <CardHeader
      title={props.data.user.fullName}
      avatar={props.data.user.image.filename}
      subtitle={moment(props.data.createdAt).fromNow()}
    />
    <CardMedia>
      <img alt={props.data.title} src={props.data.image.filename} />
    </CardMedia>
    <CardTitle title={props.data.title} />
    <CardText>
      {props.data.content}
    </CardText>
  </CardContainer>
);

export default Card;
