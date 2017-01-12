import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import IconButton from 'material-ui/IconButton';
import IconAdd from 'material-ui/svg-icons/content/add';

import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import CardToolbar from '../components/CardToolbar';

class Cards extends Component {
  render() {
    return (
      <div>
        <TopBar
          title="Kaarten"
          iconElementRight={<IconButton><IconAdd /></IconButton>}
        />
        <CardToolbar />
        <main></main>
        <BottomNav />
      </div>
    );
  }
}

export default Cards;
