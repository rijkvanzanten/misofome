import React, { Component } from 'react';

import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import IconSort from 'material-ui/svg-icons/content/sort';

class CardToolbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 1,
    };

    this.filterCards = this.filterCards.bind(this);
  }

  filterCards(event, index, value) {
    this.setState({ value });
  }

  render() {
    return (
      <Toolbar>
        <ToolbarGroup firstChild>
          <DropDownMenu value={this.state.value} onChange={this.filterCards}>
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
              horizontal: 'right',
            }}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            iconButtonElement={
              <IconButton touch>
                <IconSort />
              </IconButton>
            }
          >
            <MenuItem primaryText="Alfabetisch" />
            <MenuItem primaryText="Populairst" />
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

export default CardToolbar;

