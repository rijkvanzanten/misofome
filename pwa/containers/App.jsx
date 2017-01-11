import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Login from './Login';
import BottomNav from '../components/BottomNav';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#a9283c',
  },
});

const mapStateToProps = state => ({ user: state.user });

class App extends Component {
  renderApp() {
    return (
      <div>
        {this.props.children}
        <BottomNav />
      </div>
    );
  }

  render() {
    const { token } = this.props.user;

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        {token.length ? this.renderApp() : <Login />}
      </MuiThemeProvider>
    );
  }
}

App.DisplayName = 'Misofome';
App.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  user: PropTypes.shape({
    token: PropTypes.String.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(App);
