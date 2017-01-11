import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { connect } from 'react-redux';

import Main from './Main';
import LogIn from './containers/LogIn';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#a9283c'
  }
});

const mapStateToProps = state => ({
  user: state.user
});

@connect(mapStateToProps)
class App extends Component {
  DisplayName = 'Misofome';

  render() {
    const { token } = this.props.user;

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        {token.length ? <Main>{this.props.children}</Main> : <LogIn />}
      </MuiThemeProvider>
    );
  }
}

export default App;
