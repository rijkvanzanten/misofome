import React, { Component } from 'react';

import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import IconSort from 'material-ui/svg-icons/content/sort';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchCards } from '../actions/cards';

const mapStateToProps = state => ({ user: state.user });
const mapDispatchToProps = dispatch => bindActionCreators({ fetchCards }, dispatch);

class CardToolbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 1,
    };
  }

  sortCards(order_by) {
    const { fetchCards, user: { token } } = this.props;

    this.props.changeOrder(order_by);

    fetchCards(token, 1, order_by);
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
            <MenuItem
              primaryText="Nieuwste"
              onTouchTap={() => this.sortCards('updatedAt')}
            />
            <MenuItem
              primaryText="Alfabetisch"
              onTouchTap={() => this.sortCards('normalizedTitle')}
            />
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardToolbar);
