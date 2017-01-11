import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
    backgroundColor: '#f5f5f5',
    height: '100vh',
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

    authenticateUser(username, password);
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
          floatingLabelText="Username"
          fullWidth
          ref={(el) => { this.username = el; }}
        />
        <TextField
          floatingLabelText="Password"
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
      </div>
    );
  }
}

Login.propTypes = {
  authenticateUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    loggingIn: PropTypes.bool,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
