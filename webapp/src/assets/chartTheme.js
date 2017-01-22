const yellow200 = '#FFF59D';
const deepOrange600 = '#F4511E';
const lime300 = '#DCE775';
const lightGreen500 = '#8BC34A';
const teal700 = '#00796B';
const cyan900 = '#006064';

const colors = [
  deepOrange600,
  yellow200,
  lime300,
  lightGreen500,
  teal700,
  cyan900
];

const materialDarkGrey = '#757575';
const amcRed = '#a9283c';

// Typography
const sansSerif = '"Roboto", "Helvetica Neue", Helvetica, sans-serif';
const letterSpacing = 'normal';
const fontSize = 12;

// Layout
const padding = 8;
const baseProps = {
  width: 350,
  height: 225,
  padding: 50
};

// Labels
const baseLabelStyles = {
  fontFamily: sansSerif,
  fontSize,
  letterSpacing,
  padding,
  fill: materialDarkGrey
};

const centeredLabelStyles = Object.assign({ textAnchor: 'middle' }, baseLabelStyles);

// Strokes
const strokeLinecap = 'round';
const strokeLinejoin = 'round';

// Put it all together...
const theme = {
  area: Object.assign({
    style: {
      data: {
        fill: materialDarkGrey
      },
      labels: centeredLabelStyles
    }
  }, baseProps),
  axis: Object.assign({
    style: {
      axis: {
        fill: 'transparent',
        stroke: materialDarkGrey,
        strokeWidth: 2,
        strokeLinecap,
        strokeLinejoin
      },
      axisLabel: Object.assign({}, centeredLabelStyles, {
        padding,
        stroke: 'transparent'
      }),
      grid: {
        fill: 'transparent',
        stroke: 'transparent',
      },
      ticks: {
        fill: 'transparent',
        size: 5,
        stroke: materialDarkGrey,
        strokeWidth: 1,
        strokeLinecap,
        strokeLinejoin
      },
      tickLabels: Object.assign({}, baseLabelStyles, {
        fill: materialDarkGrey,
        stroke: 'transparent'
      })
    }
  }, baseProps),
  bar: Object.assign({
    style: {
      data: {
        fill: amcRed,
        padding,
        stroke: 'transparent',
        strokeWidth: 0,
        width: 5
      },
      labels: baseLabelStyles
    }
  }, baseProps),
  candlestick: Object.assign({
    style: {
      data: {
        stroke: materialDarkGrey
      },
      labels: centeredLabelStyles
    },
    candleColors: {
      positive: '#ffffff',
      negative: materialDarkGrey
    }
  }, baseProps),
  chart: baseProps,
  errorbar: Object.assign({
    style: {
      data: {
        fill: 'transparent',
        opacity: 1,
        stroke: materialDarkGrey,
        strokeWidth: 2
      },
      labels: Object.assign({}, centeredLabelStyles, {
        stroke: 'transparent',
        strokeWidth: 0
      })
    }
  }, baseProps),
  group: Object.assign({
    colorScale: colors
  }, baseProps),
  line: Object.assign({
    style: {
      data: {
        fill: 'transparent',
        opacity: 1,
        stroke: amcRed,
        strokeWidth: 2
      },
      labels: Object.assign({}, baseLabelStyles, {
        stroke: 'transparent',
        strokeWidth: 0,
        textAnchor: 'start'
      })
    }
  }, baseProps),
  pie: Object.assign({
    colorScale: colors,
    style: {
      data: {
        padding,
        stroke: materialDarkGrey,
        strokeWidth: 1
      },
      labels: Object.assign({}, baseLabelStyles, {
        padding: 20,
        stroke: 'transparent',
        strokeWidth: 0
      })
    }
  }, baseProps),
  scatter: Object.assign({
    style: {
      data: {
        fill: materialDarkGrey,
        opacity: 1,
        stroke: 'transparent',
        strokeWidth: 0
      },
      labels: Object.assign({}, centeredLabelStyles, {
        stroke: 'transparent'
      })
    }
  }, baseProps),
  stack: Object.assign({
    colorScale: colors
  }, baseProps),
  tooltip: Object.assign({
    style: {
      data: {
        fill: 'transparent',
        stroke: 'transparent',
        strokeWidth: 0
      },
      labels: centeredLabelStyles,
      flyout: {
        stroke: materialDarkGrey,
        strokeWidth: 1,
        fill: '#f0f0f0'
      }
    },
    flyoutProps: {
      cornerRadius: 10,
      pointerLength: 10
    }
  }, baseProps),
  voronoi: Object.assign({
    style: {
      data: {
        fill: 'transparent',
        stroke: 'transparent',
        strokeWidth: 0
      },
      labels: centeredLabelStyles
    }
  }, baseProps)
};

export default theme;
