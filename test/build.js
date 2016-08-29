var Builder = require('systemjs-builder');

var builder = new Builder('../', 'system.config.js');

builder.config({
  map: {
    lesscss: '@node/less',
    'less-autoprefix': '@node/less-plugin-autoprefix'
  }
});

builder.compile('test/test.less')
.then(function(compiled) {
  console.log(compiled);
});