import React, { Component } from 'react';
import { connect } from 'react-redux';

import IconButton from 'material-ui/IconButton';
import IconSettings from 'material-ui/svg-icons/action/settings';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';

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

const mapStateToProps = state => ({ user: state.user });

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    console.log(this.settingsName.input.value, this.settingsImage.files[0]);
    this.closeDialog();
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
        onTouchTap={this.saveSettings}
      />,
    ];

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
          <img style={styles.avatar} src={`/${this.props.user.image.filename}`} />
          <h2 style={styles.name}>{this.props.user.fullName}</h2>
        </header>
        <main />
        <BottomNav />
        <Dialog
          title="Profiel instellingen"
          actions={actions}
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

export default connect(mapStateToProps)(Profile);
