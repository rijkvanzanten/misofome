import React, { Component, PropTypes } from 'react';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import { withRouter } from 'react-router';

import IconAccount from 'material-ui/svg-icons/action/account-circle';
import IconAssignment from 'material-ui/svg-icons/action/assignment';
import IconFavorite from 'material-ui/svg-icons/action/favorite';
import IconChart from 'material-ui/svg-icons/editor/show-chart';

class BottomNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
    };
  }

  // Set tabbar to correct tab when opening app
  componentWillMount() {
    const { pathname } = this.props.router.location;
    switch (pathname) {
      case '/':
        this.setState({ selectedIndex: 0 });
        break;
      case '/kaarten':
        this.setState({ selectedIndex: 1 });
        break;
      case '/voortgang':
        this.setState({ selectedIndex: 2 });
        break;
      case '/profiel':
        this.setState({ selectedIndex: 3 });
        break;
      default:
        break;
    }
  }

  select(num) {
    const { push } = this.props.router;

    switch (num) {
      case 0:
        push('/');
        break;
      case 1:
        push('/kaarten');
        break;
      case 2:
        push('/voortgang');
        break;
      case 3:
        push('/profiel');
        break;
      default:
        break;
    }

    this.setState({ selectedIndex: num });
  }

  render() {
    return (
      <BottomNavigation
        selectedIndex={this.state.selectedIndex}
        style={{ position: 'fixed', bottom: 0, borderTop: '1.5px solid #f4f4f4' }}
      >
        <BottomNavigationItem
          label="Favorieten"
          icon={<IconFavorite />}
          onTouchTap={() => this.select(0)}
        />
        <BottomNavigationItem
          label="Kaarten"
          icon={<IconAssignment />}
          onTouchTap={() => this.select(1)}
        />
        <BottomNavigationItem
          label="Voortgang"
          icon={<IconChart />}
          onTouchTap={() => this.select(2)}
        />
        <BottomNavigationItem
          label="Profiel"
          icon={<IconAccount />}
          onTouchTap={() => this.select(3)}
        />
      </BottomNavigation>
    );
  }
}

BottomNav.propTypes = {
  router: PropTypes.shape({
    location: PropTypes.String,
    push: PropTypes.Function,
  }).isRequired,
};

export default withRouter(BottomNav);
