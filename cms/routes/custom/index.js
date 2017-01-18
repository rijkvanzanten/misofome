const Chance = require('chance');
const router = require('express').Router();

const chance = new Chance();

chance.mixin({
  svg(options) {
    options.size = options.max_size || 30;
    options.lines = options.lines || 20;
    options.circles = options.circles || 10;
    options.triangles = options.triangles || 10;
    options.opacity = options.opacity || 0.3;
    options.background = options.background || chance.color();

    function point(min, max) {
      return chance.integer({ min: min || -50, max: max || 150 });
    }

    let svg = `
      <svg 
        version="1.1" 
        viewBox="0 0 100 100" 
        xmlns="http://www.w3.org/2000/svg"
        style="background-color: ${options.background}"
      >
    `;

    for (let i = 0; i < options.lines; i++) {
      svg += `
        <line 
          stroke="${chance.color()}"
          stroke-width="${point(1, 5)}"
          opacity="${options.opacity}"
          x1="${point()}" y1="${point()}"
          x2="${point()}" y2="${point()}"
        />
      `;
    }

    for (let i = 0; i < options.circles; i++) {
      svg += `
        <circle 
          cx="${point()}"
          cy="${point()}"
          r="${point(1, options.max_size / 2)}"
          opacity="${options.opacity}"
          fill="${chance.color()}"
        />
      `;
    }

    for (let i = 0; i < options.triangles; i++) {
      const s = size = options.max_size;
      const x = point();
      const y = point();
      svg += `
        <polygon
          fill="${chance.color()}"
          points="${x},${y} ${x + point(-s, s)},${y + point(-s, s)} ${x + point(-s, s)},${y + point(-s, s)}"
          opacity="${options.opacity}"
        />
      `;
    }

    svg += '</svg>';
    return svg;
  },
});

router.get('/random-svg', (req, res) => {
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(chance.svg({
    lines: 20,
    triangles: 10,
    circles: 10,
    max_size: 30,
    opacity: 0.3,
  }));
});

module.exports = router;
