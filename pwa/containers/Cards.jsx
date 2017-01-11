import React, { Component } from 'react';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import IconMenu from 'material-ui/IconMenu';
import TopBar from '../components/TopBar';
import IconButton from 'material-ui/IconButton';
import IconSort from 'material-ui/svg-icons/content/sort';
import IconAdd from 'material-ui/svg-icons/content/add';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchCards from '../actions/cards';

import ExerciseCard from '../components/ExerciseCard';

const mapStateToProps = state => ({ user: state.user, cards: state.cards });

@connect(mapStateToProps)
class Cards extends Component {
  constructor(props) {
    super(props);

    const { cards } = this.props;

    this.state = {
      value: 1,
      cards
    };
  }

  handleChange = (event, index, value) => this.setState({value}); 

  render() {
    const cards = this.state.cards.map((d, i) =>
      <ExerciseCard
        key={i}
        title={d.title}
        user={'rijk'}
        description={d.content}/>
    );
      
    return (
      <div>
        <TopBar
          title="Kaarten"
          iconElementRight={<IconButton><IconAdd /></IconButton>} />
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <DropDownMenu value={this.state.value} onChange={this.handleChange}>
              <MenuItem value={1} primaryText="Alle Categorieën" />
              <MenuItem value={2} primaryText="Relaxatie" />
              <MenuItem value={3} primaryText="Concentratie" />
              <MenuItem value={4} primaryText="Associatie" />
              <MenuItem value={5} primaryText="Confrontatie" />
              <MenuItem value={6} primaryText="Overig" />
            </DropDownMenu>
          </ToolbarGroup>
          <ToolbarGroup>
            <IconMenu
              targetOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              iconButtonElement={
                <IconButton touch={true}>
                  <IconSort />
                </IconButton>
              } >
              <MenuItem primaryText="Alfabetisch" />
              <MenuItem primaryText="Populairst" />
            </IconMenu>
          </ToolbarGroup>
        </Toolbar>
        <main>
          {cards}
        </main>
      </div>
    );
  }
}

export default Cards;
