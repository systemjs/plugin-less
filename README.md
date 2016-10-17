Installation
---

With jspm:

```
jspm install less
```

With native SystemJS:

```
npm install systemjs-plugin-css systemjs-plugin-less less
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
        browser: './dist/less.min.js',
        node: '@node/less'
      }
    },
    css: { main: 'css.js' },
    less: { main: 'less.js' }
  }
});
```

Usage
---

```javascript
SystemJS.config({
  meta: {
    '*.less': { loader: 'less' }
  }
});
```

Or via package configuration:

```javascript
SystemJS.config({
  packages: {
    'src/': {
      meta: {
        '*.less': { loader: 'less' }
      }
    }
  }
});
```

In-browser LESS transpilation and builds should then be provided for any LESS files.

Source maps support is included.

This plugin is built on the [CSS plugin base](http://github.com/systemjs/plugin-css) and supports the same [build options](https://github.com/systemjs/plugin-css#builder-support).

Source maps in unbundled browser mode
-------------------------------------

Activating source maps generation in unbundled mode requires a few extra steps:
- The [source-map](https://github.com/mozilla/source-map/tree/master/dist) module must be globally available, you can just add a script tag to it in your index.html.
- The `inlineCssSourceMaps` loader option must be set to true.

NB: don't use client-side source maps generation in production, live transpilation is already strongly discouraged, 
producing source maps would add even more work to the client.

License
---

MIT
