import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FlipMove from 'react-flip-move';
import InfiniteScroll from 'react-infinite-scroll-component';

import IconButton from 'material-ui/IconButton';
import IconAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import CardToolbar from '../components/CardToolbar';
import Card from '../components/Card';

import { createCard, fetchCards } from '../actions/cards';

const styles = {
  imageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
    zIndex: 10,
  },
  fileButton: {
    marginTop: '35px',
  },
};

const mapStateToProps = state => ({ user: state.user, cards: state.cards });
const mapDispatchToProps = dispatch => bindActionCreators({ createCard, fetchCards }, dispatch);
class Cards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newCard: false,
      page: 1,
    };

    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.postCard = this.postCard.bind(this);
    this.fetchCards = this.fetchCards.bind(this);
  }

  componentDidMount() {
    const { items } = this.props.cards;
    if(!items.length) this.fetchCards(1);
  }

  openDialog() {
    this.setState({ newCard: true });
  }

  closeDialog() {
    this.setState({ newCard: false });
  }

  postCard() {
    const formData = new FormData();

    formData.append('title', this.cardTitle.input.value);

    if (this.cardContent.input.refs.input.value) formData.append('content', this.cardContent.input.refs.input.value);
    if (this.cardImage.files[0]) formData.append('image', this.cardImage.files[0]);

    this.props.createCard(this.props.user.token, formData);

    this.closeDialog();
  }

  fetchCards(page) {
    this.props.fetchCards(this.props.user.token, this.state.page, 'createdAt');
    this.setState(state => ({page: state.page++}));
  }

  render() {
    const actions = [
      <FlatButton
        label="Annuleer"
        primary
        onTouchTap={this.closeDialog}
      />,
      <FlatButton
        label="Sla op"
        primary
        keyboardFocused
        onTouchTap={this.postCard}
      />,
    ];

    const { cards: { items } } = this.props;

    return (
      <div>
        <TopBar
          title="Kaarten"
          iconElementRight={(
            <IconButton
              onTouchTap={this.openDialog}
            >
              <IconAdd />
            </IconButton>
          )}
        />
        <CardToolbar />
        <main>
          <FlipMove>
            <InfiniteScroll
              next={this.fetchCards}
              hasMore={this.props.cards.moreCardsAvailable}
              loader={<CircularProgress size={60} thickness={7} />}
            >
              {items.map(card =>
                <Card
                  card={card}
                  key={card._id}
                />
              )}
            </InfiniteScroll>
          </FlipMove>
        </main>
        <BottomNav />
        <Dialog
          title="Nieuwe Kaart"
          actions={actions}
          modal={false}
          open={this.state.newCard}
          onRequestClose={this.closeDialog}
          autoScrollBodyContent
        >
          <TextField
            floatingLabelText="Titel"
            ref={(el) => { this.cardTitle = el; }}
          />
          <TextField
            floatingLabelText="Inhoud"
            ref={(el) => { this.cardContent = el; }}
            multiLine
            rows={3}
          />
          <RaisedButton
            label="Upload afbeelding"
            fullWidth
            secondary
            style={styles.fileButton}
          >
            <input
              type="file"
              style={styles.imageInput}
              ref={(el) => { this.cardImage = el; }}
            />
          </RaisedButton>
        </Dialog>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);