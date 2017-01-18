import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FlipMove from 'react-flip-move';

import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import Card from '../components/Card';

import { createCard, fetchCards } from '../actions/cards';

const mapStateToProps = state => ({ user: state.user, cards: state.cards });
const mapDispatchToProps = dispatch => bindActionCreators({ createCard, fetchCards }, dispatch);
class Favorites extends Component {
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
              />
            )}
          </FlipMove>
        </main>
        <BottomNav />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
