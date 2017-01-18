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
import { updateUser } from '../actions/user';

const mapStateToProps = state => ({ user: state.user, cards: state.cards });
const mapDispatchToProps = dispatch => bindActionCreators({ createCard, fetchCards, updateUser }, dispatch);
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
    this.props.updateUser(this.props.user.token, {
      favorites: update(this.props.user.favorites, { $push: [this.state.snackbarCard._id] })
    });

    this.closeSnackbar();
  }

  componentDidMount() {
    this.props.fetchCards(this.props.user.token);
  }

  render() {
    return (
      <div>
        <TopBar title="Favorieten" />
        <main>
          <FlipMove>
            {this.props.user.favorites.map(id =>
              <Card
                data={this.props.cards[id]}
                key={id}
                favorite={true}
                openSnackbar={this.openSnackbar}
              />
            )}
          </FlipMove>
        </main>
        <BottomNav />
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.snackbarCard.title + ' uit favorieten verwijderd'}
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
