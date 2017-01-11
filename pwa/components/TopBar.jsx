import React, { PropTypes } from 'react';

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

TopBar.propTypes = {
  style: PropTypes.object, // eslint-disable-line 
};

export default TopBar;
