var CSSPluginBase = require('css/css-plugin-base.js');

var isWin = typeof process != 'undefined' && process.platform.match(/^win/);
function fromFileURL(url) {
  return url.substr(7 + !!isWin).replace(/\//g, isWin ? '\\' : '/');
}

module.exports = new CSSPluginBase(function compile(style, address, opts) {

  var loader = this;

  // use a file path in Node and a URL in the browser
  var filename = this.builder ? fromFileURL(address) : address;

  return System['import']('lesscss', module.id)
  .then(function(less) {
    var outputSourceMap = !!loader.builder;
    var sourceMapBasepath = filename.replace(/[^/]+$/, '');

    // NB: sourceMap must be imported in a script tag before this module is imported
    // download here: https://github.com/mozilla/source-map/tree/master/dist
    // see https://github.com/less/less.js/issues/1541 for details
    if (!this.builder && loader.inlineCssSourceMaps && (typeof sourceMap !== 'undefined')) {
      outputSourceMap = true;
      less.environment.getSourceMapGenerator = function() {
        return sourceMap.SourceMapGenerator;
      };
      sourceMapBasepath = new URL(filename).pathname;
    }

    return less.render(style, {
      filename: filename,
      rootpath: !loader.builder && filename.replace(/[^/]+$/, ''),
      paths: opts.fileAsRoot && [filename.replace(/[^/]+$/, '')],
      relativeUrls: opts.relativeUrls || false,
      sourceMap: outputSourceMap && {
        sourceMapBasepath: sourceMapBasepath
      }
    });
  })
  .then(function(output) {
    return {
      css: output.css + (output.map ? '' : ('/*# sourceURL=' + filename + '*/')),
      map: output.map,

      // style plugins can optionally return a modular module
      // source as well as the stylesheet above
      moduleSource: null,
      moduleFormat: null
    };
  });
});
