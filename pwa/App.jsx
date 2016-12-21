import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import BottomNav from './components/BottomNav';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#a9283c'
  }
});

class App extends Component {
  DisplayName = 'Misofome';

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={{backgroundColor: '#f5f5f5'}}>
          {this.props.children}
          <BottomNav />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
