import filter from './filter';
import transchoice from './transchoice';

/* eslint no-console: ["error", { allow: ["warn", "error", "no-undef"] }] */
const install = (Vue) => {
  if (Vue.filter('trans')) {
    console.warn('[filter duplication]: There is already a filter named `trans` registered');
    return;
  }
  if (Vue.filter('transchoice')) {
    console.warn('[filter duplication]: There is already a filter named `transchoice` registered');
    return;
  }

  Vue.filter('trans', filter);
  Vue.filter('transchoice', transchoice);
};

/* global Vue */
if (typeof window !== 'undefined' && window.Vue) {
  Vue.install(install);
}

module.exports = install;
