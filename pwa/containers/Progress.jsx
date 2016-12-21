import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import TopBar from '../components/TopBar';

const LineChart = require('react-chartjs').Line;

const amisosData = {
  labels: ['15/3', '3/3', '12/6', '29/7', '31/9'],
    datasets: [
      {
        fillColor: 'rgba(245, 70, 77, 0.5)',
        strokeColor: 'rgba(245, 70, 77, 0.8)',
        pointColor: 'rgba(220,220,220,0.5)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(151,187,205,0.8)',
        data: [Math.floor(Math.random() * 50), Math.floor(Math.random() * 50),Math.floor(Math.random() * 50),Math.floor(Math.random() * 50),Math.floor(Math.random() * 50),Math.floor(Math.random() * 50)],
      }
    ]
};

const stressData = {
  labels: ['15/3', '3/3', '12/6', '29/7', '31/9'],
    datasets: [
      {
        fillColor: 'rgba(245, 70, 77, 0.5)',
        strokeColor: 'rgba(245, 70, 77, 0.8)',
        pointColor: 'rgba(220,220,220,0.5)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(151,187,205,0.8)',
        data: [Math.floor(Math.random() * 50), Math.floor(Math.random() * 50),Math.floor(Math.random() * 50),Math.floor(Math.random() * 50),Math.floor(Math.random() * 50),Math.floor(Math.random() * 50)],
      }
    ]
};

const chartOptions = {
  responsive: true
};

class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  render() {
    return (
      <div style={{
        paddingTop: '48px'
      }}>
        <TopBar
          title="Voortgang"
          style={{boxShadow: 'none'}} />
        <Tabs
          onChange={this.handleChange}
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
          onChangeIndex={this.handleChange} >
          <div>
            <Paper zDepth={1} style={styles.paper}>
              <Subheader>Voortgang Spanningmeter</Subheader>
              <LineChart data={stressData} options={chartOptions} style={{ width: '100%', height: '100%'}} />
            </Paper>
            <RaisedButton style={styles.button} primary={true} label="Start spanningmeter" />
            <Paper
            style={styles.paper}
            zDepth={1}>
              <List>
                <Subheader>Aanbevolen oefeningen op basis van resultaten</Subheader>
                <ListItem
                  leftAvatar={<Avatar style={{objectFit: 'cover'}} src="http://www.misofo.me/media/thumb/thumb9.jpg" />}
                  primaryText="Rekenspel"
                  secondaryText={<p>Een rekenspel om te focussen op hetgene wat telt.</p>}
                  secondaryTextLines={1}
                />
                <Divider inset={true} />
                <ListItem
                  leftAvatar={<Avatar style={{objectFit: 'cover'}} src="http://www.misofo.me/media/thumb/thumb9.jpg" />}
                  primaryText="Rekenspel"
                  secondaryText={<p>Een rekenspel om te focussen op hetgene wat telt.</p>}
                  secondaryTextLines={1}
                />
                <Divider inset={true} />
                <ListItem
                  leftAvatar={<Avatar style={{objectFit: 'cover'}} src="http://www.misofo.me/media/thumb/thumb9.jpg" />}
                  primaryText="Rekenspel"
                  secondaryText={<p>Een rekenspel om te focussen op hetgene wat telt.</p>}
                  secondaryTextLines={1}
                />
                <Divider inset={true} />
                <ListItem
                  leftAvatar={<Avatar style={{objectFit: 'cover'}} src="http://www.misofo.me/media/thumb/thumb9.jpg" />}
                  primaryText="Rekenspel"
                  secondaryText={<p>Een rekenspel om te focussen op hetgene wat telt.</p>}
                  secondaryTextLines={1}
                />
                <Divider inset={true} />
                <ListItem
                  leftAvatar={<Avatar style={{objectFit: 'cover'}} src="http://www.misofo.me/media/thumb/thumb9.jpg" />}
                  primaryText="Rekenspel"
                  secondaryText={<p>Een rekenspel om te focussen op hetgene wat telt.</p>}
                  secondaryTextLines={1}
                />
              </List>
            </Paper>
          </div>
          <div>
            <Paper zDepth={1} style={styles.paper}>
              <Subheader>Voortgang Amisos test</Subheader>
              <LineChart data={amisosData} options={chartOptions} style={{ width: '100%', height: '100%'}} />
            </Paper>
            <RaisedButton style={styles.button} disabled={true} label="Nog 3 dagen tot nieuwe test" />
          </div>
        </SwipeableViews>
      </div>
    );
  }
}

const styles = {
  paper: {
    margin: '10px',
    padding: '10px'
  },
  button: {
    margin: '10px',
    display: 'block'
  }
};


export default Progress;
