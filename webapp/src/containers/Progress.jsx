import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Tabs, Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import Slider from 'material-ui/Slider';
import RaisedButton from 'material-ui/RaisedButton';

import TopBar from '../components/TopBar';
import BottomNav from '../components/BottomNav';
import StressChart from '../components/StressChart';

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
      stressSliderValue: 0
    };
  }

  handleSwipe(value) {
    this.setState({ slideIndex: value });
  }

  sliderInput(event, value) {
    this.setState({ stressSliderValue: value });
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
              <div style={{padding: '50px'}}>
                <p>Hoe gestrest voel je je nu?</p>
                <div
                  style={{
                    position: 'relative',
                    marginBottom: '40px',
                    width: '100%',
                    height: '160px'
                  }}
                >
                  <Slider
                    sliderStyle={{
                      color: 'blue'
                    }}
                    min={0}
                    max={100}
                    step={1}
                    onChange={this.sliderInput.bind(this)}
                    value={this.state.stressSliderValue}
                    axis="y"
                    style={{
                      height: 150,
                      position: 'absolute',
                      left: '25%'
                    }}
                  />
                  <span
                    style={{
                      fontSize: '70px',
                      position: 'absolute',
                      right: '25%',
                      top: '40%'
                    }}
                  >{this.state.stressSliderValue}</span>
                </div>
                <RaisedButton
                  fullWidth={true}
                  primary={true}
                  label="Sla op"
                  style={{marginTop: '20px'}}
                />
              </div>
            </Paper>
            <Paper style={styles.paper}>
              {this.props.stressResults.length > 2 ? <StressChart data={dummyData} /> : (
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '225px'
                }}>
                  <p style={{width: '50%', textAlign: 'center', color: '#757575'}}>Doe de spanningstest om je resultaten te zien!</p>
                </div>
              )}
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
