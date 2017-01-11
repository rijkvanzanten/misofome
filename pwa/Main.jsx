import React, { Component } from 'react';
import BottomNav from './components/BottomNav';
import fetchCards from './actions/cards';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = state => ({ user: state.user });
const mapDispatchToProps = dispatch => bindActionCreators({ fetchCards }, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
class Main extends Component {
  render() {
    return (
      <div style={{backgroundColor: '#f5f5f5'}}>
        {this.props.children}
        <BottomNav />
      </div>
    );
  }

  componentDidMount() {
    const { fetchCards, user } = this.props;
    fetchCards(user.token);
  }
}

export default Main;
