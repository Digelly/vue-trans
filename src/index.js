import filter from './filter';

/* eslint no-console: ["error", { allow: ["warn", "error", "no-undef"] }] */
const install = (Vue) => {
  if (Vue.filter('trans')) {
    console.warn('[filter duplication]: There is already a filter named `trans` registered');
    return;
  }

  Vue.filter('trans', filter);
};

/* global Vue */
if (typeof window !== 'undefined' && window.Vue) {
  Vue.install(install);
}

module.exports = install;
