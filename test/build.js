var Builder = require('systemjs-builder');

var builder = new Builder('../', 'system.config.js');

builder.config({
  inlineCssSourceMaps: true,
  map: {
    lesscss: '@node/less'
  },
  rootURL: '.'
});

builder.bundle('test/test.less', 'less-build.js', { sourceMaps: true });
