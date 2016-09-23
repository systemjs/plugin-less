var Builder = require('systemjs-builder');

var builder = new Builder('../', 'system.config.js');

builder.config({
  map: {
    lesscss: '@node/less'
  }
});

builder.bundle('test/test.less', 'less-build.js', { sourceMaps: true });
