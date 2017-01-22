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
      value: false,
    };
  }

  sortCards(order_by) {
    const { fetchCards, user: { token } } = this.props;

    this.props.changeOrder(order_by);

    fetchCards(token, 1, order_by);
  }

  setCategory(event, target, value) {
    this.setState({ value });
    this.props.changeCategory(value);
  }

  render() {
    return (
      <Toolbar>
        <ToolbarGroup firstChild>
          <DropDownMenu value={this.state.value} onChange={this.setCategory.bind(this)}>
            <MenuItem value={false} primaryText="Alle Categorieën" />
            <MenuItem value="Relaxatie" primaryText="Relaxatie" />
            <MenuItem value="Concentratie" primaryText="Concentratie" />
            <MenuItem value="Associatie" primaryText="Associatie" />
            <MenuItem value="Overig" primaryText="Overig" />
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
