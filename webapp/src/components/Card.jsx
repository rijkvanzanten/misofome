import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Card as CardContainer, CardHeader, CardMedia, CardText, CardTitle, CardActions } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Favorite from 'material-ui/svg-icons/action/favorite';

import { addToFavorite, removeFromFavorite } from '../actions/user';

moment.locale('nl');

const styles = {
  CardContainer: {
    margin: '10px',
  },
};

const mapStateToProps = state => ({ user: state.user });
const mapDispatchToProps = dispatch => bindActionCreators({ addToFavorite, removeFromFavorite }, dispatch);

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favorite: this.props.favorite
    };

    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  componentDidMount() {
    const { favorites } = this.props.user.info;
    const { card } = this.props;

    const favoritesIDs = favorites.map(card => card._id);

    if(favoritesIDs.indexOf(card._id) !== -1) this.setState({ favorite: true });
  }

  toggleFavorite() {
    const { card, user, addToFavorite, removeFromFavorite } = this.props;

    if(!this.state.favorite) {
      addToFavorite(user, card);
    } else {
      removeFromFavorite(user, card);

      if(this.props.openSnackbar) {
        this.props.openSnackbar(card);
      }
    }

    this.setState({ favorite: !this.state.favorite });
  }

  render() {
    const { card } = this.props;

    return (
      <CardContainer style={styles.CardContainer}>
        <CardHeader
          title={card.createdBy.fullName}
          avatar={card.createdBy.image.filename}
          subtitle={moment(card.createdAt).fromNow()}
        />

        {
          card.image ?
          <CardMedia>
            <img alt={card.title} src={card.image.filename} />
          </CardMedia> :
          null
        }

        <CardTitle title={card.title} subtitle={card.category} />
        <CardText>
          {card.content}
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
