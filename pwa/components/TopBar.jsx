import React from 'react';

import AppBar from 'material-ui/AppBar';

const TopBar = props => (
  <AppBar
    {...props}
    showMenuIconButton={false}
    style={{
      position: 'fixed',
      top: 0,
      ...props.style || {},
    }}
  />
 );

export default TopBar;
