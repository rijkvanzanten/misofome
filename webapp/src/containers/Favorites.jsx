import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FlipMove from 'react-flip-move';
import update from 'immutability-helper';

import Snackbar from 'material-ui/Snackbar';

import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import Card from '../components/Card';

import { createCard, fetchCards } from '../actions/cards';
import { addToFavorite } from '../actions/user';

const mapStateToProps = state => ({ user: state.user, cards: state.cards });
const mapDispatchToProps = dispatch => bindActionCreators({ createCard, fetchCards, addToFavorite }, dispatch);
class Favorites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      snackbarOpen: false,
      snackbarCard: {}
    };

    this.closeSnackbar = this.closeSnackbar.bind(this);
    this.undoRemoveFromFavorites = this.undoRemoveFromFavorites.bind(this);
    this.openSnackbar = this.openSnackbar.bind(this);
  }

  openSnackbar(card) {
    this.setState({
      snackbarOpen: true,
      snackbarCard: card
    });
  }

  closeSnackbar() {
    this.setState({ snackbarOpen: false });
  }

  undoRemoveFromFavorites() {
    const { user, addToFavorite } = this.props;
    const card = this.state.snackbarCard;

    addToFavorite(user, card);

    this.closeSnackbar();
  }

  render() {
    const { user } = this.props;
    const { snackbarCard, snackbarOpen } = this.state;

    return (
      <div>
        <TopBar title="Favorieten" />
        <main>
          <FlipMove>
            {user.info.favorites.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).map(card =>
              <Card
                card={card}
                key={card._id}
                favorite={true}
                openSnackbar={this.openSnackbar}
              />
            )}
          </FlipMove>
        </main>
        <BottomNav />
        <Snackbar
          open={snackbarOpen}
          message={snackbarCard.title + ' uit favorieten verwijderd'}
          action="zet terug"
          autoHideDuration={4000}
          onActionTouchTap={this.undoRemoveFromFavorites}
          onRequestClose={this.closeSnackbar}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
