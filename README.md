# vue-trans

[![Build Status](https://travis-ci.org/Trekels/vue-trans.svg?branch=master)]()
[![npm](https://img.shields.io/npm/v/vue-trans.svg?maxAge=2592000?style=flat-square)]()
[![npm](https://img.shields.io/npm/dt/vue-trans.svg?maxAge=2592000?style=flat-square)]()

This is a simple vue filter to provide a similar way of using translations in vue as one would in
twig templates with the Symfony `trans` filter. The filter not bound to the Symfony framework so can be used with others as well.

## Installation and configuration

Install the filter using `npm` or `yarn`:
```
// Npm...
npm install vue-trans --save
// Yarn...
yarn add vue-trans
``` 

next you will have to `import` or `require` the filter and add it to Vue.

```
// import
import transFilter from 'vue-trans';
// require
var transFilter = require('vue-trans');

// Add to vue
Vue.use(transFilter);
```

Or download [this file](https://raw.githubusercontent.com/trekels/vue-trans/master/dist/vue-trans.js) and include it with a script tag. When including the file like this the filter will be automatically installed. Make sure to include it after the Vue script !
```
<script src="vue-trans.js"></script>
```

## Filter usage

The filter usage is fairly straight forward, only on thing that needs to be considered are the translations them self. We will have
to expose them to the frontend by setting a global object holding the translations by `key/value`.
So the filter can use it as source.

```
// Exposing the translations (base.html.twig)

<script>
window.translations = {
   // set the translation with twig trans filter
  'app.title': '{{ 'app.title' | trans }}'

  // Or a fixed value
  'app.version': 'version 1'
};
</script>
```

Now the translation filter can be used to lookup the translations by the exposed keys.

```
// Some vue component

{{ 'app.tile' | trans }}
```

## Translate with context

