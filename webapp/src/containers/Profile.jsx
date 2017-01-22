/* global FormData */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FlipMove from 'react-flip-move';
import InfiniteScroll from 'react-infinite-scroll-component';

import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import Card from '../components/Card';

import IconButton from 'material-ui/IconButton';
import IconSettings from 'material-ui/svg-icons/action/settings';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { fetchCards } from '../actions/cards';
import { updateUserInfo } from '../actions/user';

const styles = {
  header: {
    position: 'relative',
    height: '70vw',
  },
  avatar: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  name: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: '2em',
    color: 'white',
    position: 'absolute',
    left: '20px',
    bottom: '20px',
    margin: 0,
    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
  },
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

const mapStateToProps = state => ({ cards: state.cards, user: state.user });
const mapDispatchToProps = dispatch => bindActionCreators({ fetchCards, updateUserInfo }, dispatch);

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      settingsOpen: false,
    };

    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
  }

  openDialog() {
    this.setState({ settingsOpen: true });
  }

  closeDialog() {
    this.setState({ settingsOpen: false });
  }

  saveSettings() {
    const formData = new FormData();

    formData.append('fullName', this.settingsName.input.value);
    if(this.settingsImage.files && this.settingsImage.files[0])
      formData.append('image', this.settingsImage.files[0]);

    this.props.updateUserInfo(this.props.user.token, formData);

    this.closeDialog();
  }

  componentDidMount() {
    this.props.fetchCards(this.props.user.token, this.state.page, 'createdAt', { 'where[createdBy]': this.props.user.info._id});
    this.setState(state => ({page: state.page + 1}));
  }

  render() {
    const items = Object.keys(this.props.cards.items)
      .map(key => this.props.cards.items[key]);

    return (
      <div>
        <TopBar
          title="Profiel"
          iconElementRight={(
            <IconButton
              onTouchTap={this.openDialog}
            >
              <IconSettings />
            </IconButton>
          )}
        />
        <header style={styles.header}>
          <img style={styles.avatar} src={`/${this.props.user.info.image.filename}`} />
          <h2 style={styles.name}>{this.props.user.info.fullName}</h2>
        </header>
        <main>
          <InfiniteScroll
            next={this.fetchCards}
            hasMore={this.props.cards.moreCardsAvailable}
            loader={<CircularProgress size={60} thickness={7} style={{textAlign: 'center'}}/>}
            style={{ overflow: 'hidden' }}
            endMessage={<span></span>}
          >
            <FlipMove>
              {items.map(card =>
                <Card
                  card={card}
                  key={card._id}
                />
              )}
              </FlipMove>
          </InfiniteScroll>
        </main>
        <BottomNav />
        <Dialog
          title="Profiel instellingen"
          actions={<FlatButton
            label="Annuleer"
            primary
            onTouchTap={this.closeDialog}
          />,
          <FlatButton
            label="Sla op"
            primary
            keyboardFocused
            onTouchTap={this.saveSettings}
          />}
          modal={false}
          open={this.state.settingsOpen}
          onRequestClose={this.closeDialog}
        >
          <TextField
            defaultValue={this.props.user.fullName}
            floatingLabelText="Naam"
            ref={(el) => { this.settingsName = el; }}
          />
          <RaisedButton
            label="Upload profielfoto"
            fullWidth
            secondary
            style={styles.fileButton}
          >
            <input
              type="file"
              style={styles.imageInput}
              ref={(el) => { this.settingsImage = el; }}
            />
          </RaisedButton>
        </Dialog>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
