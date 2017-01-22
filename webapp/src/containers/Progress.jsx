import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { VictoryLine, VictoryChart, VictoryAxis } from 'victory';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Tabs, Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';

import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';

import theme from '../assets/chartTheme';

const styles = {
  paper: {
    margin: '10px'
  }
};

const dummyData = [
  {score: 53, date: new Date('2017')},
  {score: 22, date: new Date('2016')},
  {score: 61, date: new Date('2012')},
  {score: 31, date: new Date('2005')},
];

const mapStateToProps = state => ({ stressResults: state.user.info.stressTestResults, amisosResults: state.user.info.amisosResults });

class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  handleSwipe(value) {
    this.setState({ slideIndex: value });
  }

  render() {
    return(
      <div>
        <TopBar
          title="Voortgang"
          style={{
            boxShadow: 'none'
          }}
        />
        <Tabs
          onChange={this.handleSwipe.bind(this)}
          value={this.state.slideIndex}
          style={{
            boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px',
            position: 'fixed',
            top: '64px',
            width: '100%',
            zIndex: 1000
          }}>
          <Tab label="Spanningmeter" value={0} />
          <Tab label="Amisos" value={1} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleSwipe.bind(this)}
        >

          <div style={{paddingTop: '48px'}}>
            <Paper style={styles.paper}>
              <VictoryChart
                theme={theme}
                domainPadding={20}
              >
                <VictoryAxis
                  tickValues={dummyData.map(data => data.date)}
                  tickFormat={x => `${x.getDay()}/${x.getMonth()}`}
                />
                <VictoryAxis
                  dependentAxis
                  tickFormat={x => x}
                />
                <VictoryLine
                  data={dummyData}
                  x="date"
                  y="score"
                  interpolation="basis"
                  animate={
                    {
                      duration: 2000,
                      onLoad: {
                        duration: 1000
                      },
                      onEnter: {
                        duration: 500,
                        before: () => ({y: 0})
                      }
                    }
                  }
                />
              </VictoryChart>
            </Paper>
          </div>

          <div style={{paddingTop: '48px'}}>
          </div>

        </SwipeableViews>
        <BottomNav />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Progress);
