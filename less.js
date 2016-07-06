var CSSPluginBase = require('css/css-plugin-base.js');

var isWin = typeof process != 'undefined' && process.platform.match(/^win/);
function fromFileURL(url) {
  return url.substr(7 + !!isWin).replace(/\//g, isWin ? '\\' : '/');
}

module.exports = new CSSPluginBase(function compile(style, address, outAddress, opts) {

  var loader = this;

  // use a file path in Node and a URL in the browser
  var filename = this.builder ? fromFileURL(address) : address;
  var outname = this.builder ? fromFileURL(outAddress) : outAddress;

  return System['import']('lesscss', module.id)
  .then(function(less) {
    return less.render(style, {
      filename: filename,
      rootpath: (!opts.fileAsRoot || !loader.builder) && filename.replace(/[^/]+$/, ''),
      paths: opts.fileAsRoot && [filename.replace(/[^/]+$/, '')],
      relativeUrls: opts.relativeUrls || false,
      sourceMap: loader.builder && {
        sourceMapBasepath: outname.replace(/[^/]+$/, '')
      }
    });
  })
  .then(function(output) {
    return {
      css: output.css,
      map: output.map,

      // style plugins can optionally return a modular module 
      // source as well as the stylesheet above
      moduleSource: null,
      moduleFormat: null
    };
  });
});