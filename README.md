Usage
---

```
npm install github:systemjs/plugin-css#master github:systemjs/plugin-less#master less
```

```javascript
SystemJS.config({
  map: {
    css: 'node_modules/systemjs-plugin-css',
    less: 'node_modules/systemjs-plugin-less',
    lesscss: 'node_modules/less'
  },
  packages: {
    lesscss: {
      main: {
        browser: '/dist/less.min.js',
        node: '@node/less'
      }
    },
    css: { main: 'css.js' },
    less: { main: 'less.js' }
  }
});
```