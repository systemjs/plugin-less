Usage
---

```
npm install github:systemjs/plugin-css#master github:systemjs/plugin-less#master less
```

```javascript
System.config({
  packages: {
    'path/to/less': {
      main: 'less.js',
      map: {
        css: 'node_modules/systemjs-plugin-css',
        lesscss: {
          browser: 'node_modules/less/dist/less.min.js',
          node: '@node/less'
        }
      }
    }
  }
});
```