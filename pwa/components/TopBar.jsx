import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

class TopBar extends Component {
  render() {
    return (
      <AppBar
        {...this.props}
        showMenuIconButton={false}
        style={Object.assign({}, {
          position: 'fixed',
          top: 0
        }, this.props.style || {})}/>
    );
  }
}

export default TopBar;
