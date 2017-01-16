import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import authenticateUser from '../actions/user';
import logo from '../assets/icon-red.svg';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100vw',
    position: 'absolute',
    left: 0,
    top: 0,
    paddingLeft: '20%',
    paddingRight: '20%',
    boxSizing: 'border-box',
  },
  image: {
    width: '80%',
  },
  button: {
    marginTop: '2em',
  },
};

const mapStateToProps = state => ({ user: state.user });
const mapDispatchToProps = dispatch => bindActionCreators({ authenticateUser }, dispatch);

class Login extends Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
  }

  login() {
    const { authenticateUser } = this.props; // eslint-disable-line no-shadow
    const username = this.username.input.value;
    const password = this.password.input.value;

    authenticateUser(username, password, (success) => {
      if (success) {
        const { location } = this.props;

        if (location.state && location.state.nextPathname) {
          this.props.router.replace(location.state.nextPathname);
        } else {
          this.props.router.replace('/');
        }
      }
    });
  }

  render() {
    const { loggingIn } = this.props.user;
    const buttonLabel = loggingIn ? <CircularProgress size={20} thickness={2} /> : 'Log in';

    return (
      <div style={styles.container}>
        <img
          style={styles.image}
          src={logo}
          alt="Logo Misofome"
        />
        <TextField
          floatingLabelText="Gebruikersnaam"
          fullWidth
          ref={(el) => { this.username = el; }}
        />
        <TextField
          floatingLabelText="Wachtwoord"
          fullWidth
          type="password"
          ref={(el) => { this.password = el; }}
        />
        <RaisedButton
          style={styles.button}
          label={buttonLabel}
          fullWidth
          primary
          onClick={this.login}
          disabled={loggingIn}
        />
        <Link to="/registreer">
          <RaisedButton
            style={styles.button}
            label="Maak account"
            fullWidth
          />
        </Link>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
