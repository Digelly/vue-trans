# vue-trans

[![Build Status](https://travis-ci.org/Trekels/vue-trans.svg?branch=master)]()
[![npm](https://img.shields.io/npm/v/vue-trans.svg?maxAge=2592000?style=flat-square)]()
[![npm](https://img.shields.io/npm/dt/vue-trans.svg?maxAge=2592000?style=flat-square)]()

This is a simple vue filter to provide a similar way of using translations in vue as one would in
twig templates with the Symfony `trans` filter. The filter is not bound to the Symfony framework so can be used as a stand alone package as well.

Also implemented is the multiple choice syntax using a `count` parameter from Symfony, detailed more downbelow.

## Installation and configuration

Install the filter using `npm` or `yarn`:
``` javascript
// Npm...
npm install vue-trans --save
// Yarn...
yarn add vue-trans
``` 

next you will have to `import` or `require` the filter and add it to Vue.

``` javascript
// import
import transFilter from 'vue-trans';
// require
var transFilter = require('vue-trans');

// Add to vue
Vue.use(transFilter);
```

Or download [this file](https://raw.githubusercontent.com/trekels/vue-trans/master/dist/vue-trans.js) and include it with a script tag. When including the file like this the filter will be automatically installed. Make sure to include it after the Vue script !

``` javascript
<script src="vue.js"></script>
<script src="vue-trans.js"></script>
```

## Filter usage

The filter usage is fairly straight forward. The only catch are the translations, we will have to expose them to the frontend by setting a global object holding the translations by `key/value`.
So the filter can use it as source.

``` javascript
// Exposing the translations (base.html.twig or index.html)

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

``` javascript
// Some vue component

{{ 'app.tile' | trans }}
```

## Translate with context

The real power is in the translations with context. Sometimes you need to put in values
into the translated sentence. Since this value is not available in the twig env on render
or when you are writing the translations you can set a placeholder.

A placeholder must be pre ans suffixed with `%`'s like: `%placeholder_here%`

You can then pass a context to the trans filter as second param to be applied on the translation. The context is a POJO (plain old javascript object). The properties have
to match the placeholders name.

Example:

``` javascript
window.translations = {
  'app.version': 'version %versionNumber%'
};


// Somewhere in the app...

const context = { versionNumber: 1 }

{{ 'app.version' | trans(context) }} // Result: "version 1"
```

## Pluralize easily by adding `count`
By adding the context parameter `count`  you can add inflection or pluralize effortlessly.

```javascript
window.translations = {
  'app.changes': '{0}No changes|{1} 1 change|]1,Inf[%count% changes'
};


// Somewhere in the app...
const context = { count: 1 }
{{ 'app.changes' | trans(context) }} // Result: "1 change"

// or if we increase the count
const context = { count: 5 }
{{ 'app.changes' | trans(context) }} // Result: "5 changes"
```

Combine `count` with other parameters:

```javascript
window.translations = {
  'app.generic': '{0}No %item%|{1} 1 %item%|]1,Inf[%count% %items%'
};


// Somewhere in the app...
const context = { count: 1, item: "line" }
{{ 'app.generic' | trans(context) }} // Result: "1 line"

const context = { count: 5, item: "line" }
{{ 'app.generic' | trans(context) }} // Result: "5 lines"
```

## Upcoming

  - Provide config to edit context pre and suffix.
  - Pass context as obj or array (if array just parse in order)
