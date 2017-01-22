import React from 'react';
import { VictoryLine, VictoryChart, VictoryAxis } from 'victory';
import theme from '../assets/chartTheme';
import { connect } from 'react-redux';

const mapStateToProps = state => ({ data: state.user.info.stressTestResults });

const StressChart = ({ data }) => {
  const records = data.filter((d, i) => i >= data.length - 7).map(d => ({
    ...d,
    date: new Date(+d.date)
  }));

  return (
    <VictoryChart
      theme={theme}
      domainPadding={20}
    >
      <VictoryAxis
        tickValues={records.map(data => data.date)}
        tickFormat={x => `${x.getDate()}/${x.getMonth() + 1}`}
      />
      <VictoryAxis
        dependentAxis
        tickValues={[0, 20, 40, 60, 80, 100]}
      />
      <VictoryLine
        data={records}
        x="date"
        y="score"
        interpolation="monotoneX"
        animate={
          {
            duration: 2000,
            onLoad: {
              duration: 1000,
              before: () => ({y: 0})
            },
            onEnter: {
              duration: 500,
              before: () => ({y: 0})
            }
          }
        }
      />
    </VictoryChart>
  );
};

export default connect(mapStateToProps)(StressChart);
