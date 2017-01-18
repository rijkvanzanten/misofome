import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import update from 'immutability-helper';

import { Card as CardContainer, CardHeader, CardMedia, CardText, CardTitle, CardActions } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Favorite from 'material-ui/svg-icons/action/favorite';

import { updateUser } from '../actions/user';

moment.locale('nl');

const styles = {
  CardContainer: {
    margin: '10px',
  },
};

const mapStateToProps = state => ({ user: state.user });
const mapDispatchToProps = dispatch => bindActionCreators({ updateUser }, dispatch);

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favorite: this.props.favorite
    };

    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  toggleFavorite() {
    if(!this.state.favorite) {
      this.props.updateUser(this.props.user.token, {
        favorites: update(this.props.user.favorites, { $push: [this.props.data._id] })
      });
    } else {
      this.props.updateUser(this.props.user.token, {
        favorites: update(this.props.user.favorites, { $splice: [[this.props.data._id, 1]] })
      });
    }

    this.setState({ favorite: !this.state.favorite });
  }

  render() {
    return (
      <CardContainer style={styles.CardContainer}>
        <CardHeader
          title={this.props.data.user.fullName}
          avatar={this.props.data.user.image.filename}
          subtitle={moment(this.props.data.createdAt).fromNow()}
        />
        <CardMedia>
          <img alt={this.props.data.title} src={this.props.data.image.filename} />
        </CardMedia>
        <CardTitle title={this.props.data.title} />
        <CardText>
          {this.props.data.content}
        </CardText>
        <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton
            onTouchTap={this.toggleFavorite}
          >
            {this.state.favorite ?
              <Favorite color="#757575" /> :
              <FavoriteBorder color="#757575" />
            }
          </IconButton>
        </CardActions>
      </CardContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
