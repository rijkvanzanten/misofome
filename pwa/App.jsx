import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { connect } from 'react-redux';

import LogIn from './containers/LogIn';

import BottomNav from './components/BottomNav';

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

  renderApp() { 
    return ( 
      <div style={{backgroundColor: '#f5f5f5'}}>
        {this.props.children}
        <BottomNav />
      </div>
    );
  }

  render() {
    const { key } = this.props.user;

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        {key.length ? this.renderApp() : <LogIn />}
      </MuiThemeProvider>
    );
  }
}

export default App;
