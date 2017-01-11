import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import logo from '../assets/icon-red.svg';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CircularProgress from 'material-ui/CircularProgress';
import authenticateUser from '../actions/user';

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
    boxSizing: 'border-box'
  },
  image: {
    width: '80%'
  },
  button: {
    marginTop: '2em'
  }
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => bindActionCreators({ authenticateUser }, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
class LogIn extends Component {
  login() {
    const { authenticateUser } = this.props;
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
          alt="Logo Misofome" />
        <TextField
          floatingLabelText="Username" 
          fullWidth={true} 
          ref={el => { this.username = el; }} />
        <TextField
          floatingLabelText="Password" 
          fullWidth={true}
          type="password" 
          ref={el => { this.password = el; }} />
        <RaisedButton
          style={styles.button}
          label={buttonLabel} 
          fullWidth={true} 
          primary={true} 
          onClick={this.login.bind(this)}
          disabled={loggingIn}/>
      </div>
    );
  }
}

export default LogIn;
