!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports["vue-trans"]=r():e["vue-trans"]=r()}("undefined"!=typeof self?self:this,function(){return function(e){function __webpack_require__(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,__webpack_require__),n.l=!0,n.exports}var r={};return __webpack_require__.m=e,__webpack_require__.c=r,__webpack_require__.d=function(e,r,t){__webpack_require__.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:t})},__webpack_require__.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return __webpack_require__.d(r,"a",r),r},__webpack_require__.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s=0)}([function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=t(1),o=function(e){if(e.filter("trans"))return void console.warn("[filter duplication]: There is already a filter named `trans` registered");e.filter("trans",n.a)};"undefined"!=typeof window&&window.Vue&&Vue.install(o),r.default=o},function(e,r,t){"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var n=function(e,r){var t=e;if("object"===_typeof(r)){var n=t.match(/(%([^%]|%%)*%)/g);n&&n.forEach(function(e){var n=e.replace(/[%]+/g,"");if(Object.prototype.hasOwnProperty.call(r,n)){var o=new RegExp(e,"g");t=t.replace(o,r[n])}})}return t},o=/(\[|\])(\d+|Inf), ?(\d+|Inf)(\[|\])(.+)/,i=/\{(\d+)\}(.*)/,u=function(e,r){var t=e;return t.split("|").forEach(function(e){var n=parseInt(r.count,10),u=e.match(i);if(u)parseInt(u[1],10)===n&&(t=u[2]);else{var a=e.match(o);if(!a)return;var f=a[2],_=a[3];"Inf"!==f&&(f=parseInt(f,10)),"Inf"!==_&&(_=parseInt(_,10)),"]"===a[1]&&"number"==typeof f&&(f+=1),"["===a[4]&&"number"==typeof _&&(_-=1),n>=f&&(n<=_||"Inf"===_)&&(t=a[5])}}),n(t,r)};r.a=function(e,r){var t=e;return void 0!==window.translations&&void 0!==window.translations[e]&&(t=window.translations[e]),r&&"object"===_typeof(r)&&Object.prototype.hasOwnProperty.call(r,"count")?u(t,r):n(t,r)}}])});