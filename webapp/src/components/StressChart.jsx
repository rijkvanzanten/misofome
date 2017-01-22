import React from 'react';
import { VictoryLine, VictoryChart, VictoryAxis } from 'victory';
import theme from '../assets/chartTheme';

const StressChart = ({ data }) => (
  <VictoryChart
    theme={theme}
    domainPadding={20}
  >
    <VictoryAxis
      tickValues={data.map(data => data.date)}
      tickFormat={x => `${x.getDay()}/${x.getMonth()}`}
    />
    <VictoryAxis
      dependentAxis
      tickFormat={x => x}
    />
    <VictoryLine
      data={data}
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
);

export default StressChart;
