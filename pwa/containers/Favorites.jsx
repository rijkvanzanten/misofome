import React, { Component } from 'react';

import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';

class Favorites extends Component {
  render() {
    return (
      <div>
        <TopBar title="Favorieten" />
        <BottomNav />
      </div>
    );
  }
}

export default Favorites;
