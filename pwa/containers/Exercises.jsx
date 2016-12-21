import React, { Component } from 'react';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import IconMenu from 'material-ui/IconMenu';
import TopBar from '../components/TopBar';
import IconButton from 'material-ui/IconButton';
import IconSort from 'material-ui/svg-icons/content/sort';
import IconAdd from 'material-ui/svg-icons/content/add';

import ExerciseCard from '../components/ExerciseCard';

class Exercises extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    };
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <div>
        <TopBar
          title="Oefeningen"
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
              <MenuItem primaryText="A-Z" />
              <MenuItem primaryText="Populariteit" />
            </IconMenu>
          </ToolbarGroup>
        </Toolbar>
        <main>
          {[0, 1, 2, 3, 4].map((d, i) =>
            <ExerciseCard
              key={i}
              title="Ontspanningsoefening"
              user="Rijk van Zanten"
              description="Oefening inhoud"
              imgUrl="http://placehold.it/400x200"
              comments={[
                {
                  user: 'Rijk',
                  comment: 'hoi'
                }
              ]} />
          )}
        </main>
      </div>
    );
  }
}

export default Exercises;
