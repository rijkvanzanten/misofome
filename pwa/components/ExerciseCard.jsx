import React, { Component, PropTypes } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Comment from 'material-ui/svg-icons/communication/comment';

import { Link } from 'react-router';

class ExerciseCard extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imgUrl: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      transform: 'translateY(10px)',
      opacity: 0
    };
  }

  render() {
    const { title, user, description, imgUrl } = this.props;
    const cardMedia = imgUrl ?
      (<CardMedia>
        <img src={imgUrl} style={styles.image} height="150"/>
      </CardMedia>)
      : false;

    return (
      <Card expanded={true} style={{margin: '10px', transform: this.state.transform, opacity: this.state.opacity}}>
        <Link to="/rijk" style={{textDecoration: 'none'}}>
          <CardHeader
            title={title}
            subtitle={user}
            avatar="http://placehold.it/50x50" />
          <CardText>
            {description}
          </CardText>
          {cardMedia}
        </Link>
        <CardActions style={{display: 'flex', justifyContent: 'space-between'}}>
          <IconButton>
            <FavoriteBorder color="#757575" />
          </IconButton>
          <IconButton>
            <Comment color="#757575"/>
          </IconButton>
        </CardActions>
      </Card>
    );
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({transform: 'translateY(0px)', opacity: 1});
    }, this.props.delay || 0);
  }
}

const styles = {
  image: {
    height: '150px',
    width: '100%',
    objectFit: 'cover'
  }
};

export default ExerciseCard;
