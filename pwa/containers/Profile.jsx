import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import IconButton from 'material-ui/IconButton';
import IconSettings from 'material-ui/svg-icons/action/settings';

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
};

const mapStateToProps = state => ({ user: state.user });

class Profile extends Component {
  render() {
    return (
      <div>
        <TopBar
          title="Profiel"
          iconElementRight={<IconButton><IconSettings /></IconButton>}
        />
        <header style={styles.header}>
          <img style={styles.avatar} src={'/' + this.props.user.image.filename} />
          <h2 style={styles.name}>{this.props.user.fullName}</h2>
        </header>
        <main />
        <BottomNav />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Profile);
