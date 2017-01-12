import React, { Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import { registerUser } from '../actions/user';

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
    width: '30%',
  },
  button: {
    marginTop: '2em',
  },
};

const mapStateToProps = state => ({ user: state.user });
const mapDispatchToProps = dispatch => bindActionCreators({ registerUser }, dispatch);

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      registering: false,
    };

    this.register = this.register.bind(this);
  }

  register() {
    const { registerUser } = this.props; // eslint-disable-line no-shadow

    const username = this.username.input.value;
    const password = this.password.input.value;
    const fullName = this.fullName.input.value;

    registerUser({ username, password, fullName }, (success) => {
      if (success) {
        this.props.router.replace('/');
      }
    });

    this.setState({ registering: true });
  }

  render() {
    const { registering } = this.state;
    const buttonLabel = registering ? <CircularProgress size={20} thickness={2} /> : 'Registreer';

    return (
      <div style={styles.container}>
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
        <TextField
          floatingLabelText="Volledige naam"
          fullWidth
          ref={(el) => { this.fullName = el; }}
        />
        <RaisedButton
          style={styles.button}
          label={buttonLabel}
          fullWidth
          primary
          onClick={this.register}
          disabled={registering}
        />
        <Link to="/login">
          <RaisedButton
            style={styles.button}
            label="Ik heb al een account"
            fullWidth
          />
        </Link>
      </div>
    );
  }
}

Register.propTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
