System.config({
  baseURL: '../',
  map: {
    lesscss: 'http://cdnjs.cloudflare.com/ajax/libs/less.js/2.6.1/less.min.js',
    css: 'node_modules/systemjs-plugin-css'
  },
  meta: {
    '*.less': { loader: 'less.js' }
  }
});
