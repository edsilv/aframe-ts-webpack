/* global location */

/* Centralized place to reference utilities since utils is exposed to the user. */
import { debug } from './debug';
import { deepAssign } from 'deep-assign';
import { device } from './device';
import { objectAssign } from 'object-assign';
import { objectPool } from './object-pool';

var warn = debug('utils:warn');

export * from './bind';
export * from './coordinates';
export debug;
export device;
export * from './entity';
export * from './forceCanvasResizeSafariMobile';
export * from './is-ie11';
export * from './material';
export objectPool;
export * from './split';
export * from './styleParser';
export * from './tracked-controls';

export const checkHeadsetConnected = function () {
  warn('`utils.checkHeadsetConnected` has moved to `utils.device.checkHeadsetConnected`');
  return device.checkHeadsetConnected(arguments);
};
export const isGearVR = device.isGearVR = function () {
  warn('`utils.isGearVR` has been deprecated, use `utils.device.isMobileVR`');
};
export const isIOS = function () {
  warn('`utils.isIOS` has moved to `utils.device.isIOS`');
  return device.isIOS(arguments);
};
export const isOculusGo = device.isOculusGo = function () {
  warn('`utils.isOculusGo` has been deprecated, use `utils.device.isMobileVR`');
};
export const isMobile = function () {
  warn('`utils.isMobile has moved to `utils.device.isMobile`');
  return device.isMobile(arguments);
};

/**
 * Returns throttle function that gets called at most once every interval.
 *
 * @param {function} functionToThrottle
 * @param {number} minimumInterval - Minimal interval between calls (milliseconds).
 * @param {object} optionalContext - If given, bind function to throttle to this context.
 * @returns {function} Throttled function.
 */
export const throttle = function (functionToThrottle, minimumInterval, optionalContext) {
  var lastTime;
  if (optionalContext) {
    functionToThrottle = module.exports.bind(functionToThrottle, optionalContext);
  }
  return function () {
    var time = Date.now();
    var sinceLastTime = typeof lastTime === 'undefined' ? minimumInterval : time - lastTime;
    if (typeof lastTime === 'undefined' || (sinceLastTime >= minimumInterval)) {
      lastTime = time;
      functionToThrottle.apply(null, arguments);
    }
  };
};

/**
 * Returns throttle function that gets called at most once every interval.
 * Uses the time/timeDelta timestamps provided by the global render loop for better perf.
 *
 * @param {function} functionToThrottle
 * @param {number} minimumInterval - Minimal interval between calls (milliseconds).
 * @param {object} optionalContext - If given, bind function to throttle to this context.
 * @returns {function} Throttled function.
 */
export const throttleTick = function (functionToThrottle, minimumInterval, optionalContext) {
  var lastTime;
  if (optionalContext) {
    functionToThrottle = module.exports.bind(functionToThrottle, optionalContext);
  }
  return function (time, delta) {
    var sinceLastTime = typeof lastTime === 'undefined' ? delta : time - lastTime;
    if (typeof lastTime === 'undefined' || (sinceLastTime >= minimumInterval)) {
      lastTime = time;
      functionToThrottle(time, sinceLastTime);
    }
  };
};

/**
 * Returns debounce function that gets called only once after a set of repeated calls.
 *
 * @param {function} functionToDebounce
 * @param {number} wait - Time to wait for repeated function calls (milliseconds).
 * @param {boolean} immediate - Calls the function immediately regardless of if it should be waiting.
 * @returns {function} Debounced function.
 */
export const debounce = function (func, wait, immediate) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

/**
 * Mix the properties of source object(s) into a destination object.
 *
 * @param  {object} dest - The object to which properties will be copied.
 * @param  {...object} source - The object(s) from which properties will be copied.
 */
export const extend = objectAssign;
export const extendDeep = deepAssign;

export const clone = function (obj) {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Checks if two values are equal.
 * Includes objects and arrays and nested objects and arrays.
 * Try to keep this function performant as it will be called often to see if a component
 * should be updated.
 *
 * @param {object} a - First object.
 * @param {object} b - Second object.
 * @returns {boolean} Whether two objects are deeply equal.
 */
var deepEqual = (function () {
  var arrayPool = objectPool.createPool(function () { return []; });

  return function (a, b) {
    var key;
    var keysA;
    var keysB;
    var i;
    var valA;
    var valB;

    // If not objects or arrays, compare as values.
    if (a === undefined || b === undefined || a === null || b === null ||
        !(a && b && (a.constructor === Object && b.constructor === Object) ||
                    (a.constructor === Array && b.constructor === Array))) {
      return a === b;
    }

    // Different number of keys, not equal.
    keysA = arrayPool.use();
    keysB = arrayPool.use();
    keysA.length = 0;
    keysB.length = 0;
    for (key in a) { keysA.push(key); }
    for (key in b) { keysB.push(key); }
    if (keysA.length !== keysB.length) {
      arrayPool.recycle(keysA);
      arrayPool.recycle(keysB);
      return false;
    }

    // Return `false` at the first sign of inequality.
    for (i = 0; i < keysA.length; ++i) {
      valA = a[keysA[i]];
      valB = b[keysA[i]];
      // Check nested array and object.
      if ((typeof valA === 'object' || typeof valB === 'object') ||
          (Array.isArray(valA) && Array.isArray(valB))) {
        if (valA === valB) { continue; }
        if (!deepEqual(valA, valB)) {
          arrayPool.recycle(keysA);
          arrayPool.recycle(keysB);
          return false;
        }
      } else if (valA !== valB) {
        arrayPool.recycle(keysA);
        arrayPool.recycle(keysB);
        return false;
      }
    }

    arrayPool.recycle(keysA);
    arrayPool.recycle(keysB);
    return true;
  };
})();
export const deepEqual = deepEqual;

/**
 * Computes the difference between two objects.
 *
 * @param {object} a - First object to compare (e.g., oldData).
 * @param {object} b - Second object to compare (e.g., newData).
 * @returns {object}
 *   Difference object where set of keys note which values were not equal, and values are
 *   `b`'s values.
 */
export const diff = (function () {
  var keys = [];

  return function (a, b, targetObject) {
    var aVal;
    var bVal;
    var bKey;
    var diff;
    var key;
    var i;
    var isComparingObjects;

    diff = targetObject || {};

    // Collect A keys.
    keys.length = 0;
    for (key in a) { keys.push(key as never); }

    if (!b) { return diff; }

    // Collect B keys.
    for (bKey in b) {
      if (keys.indexOf(bKey as never) === -1) {
        keys.push(bKey as never);
      }
    }

    for (i = 0; i < keys.length; i++) {
      key = keys[i];
      aVal = a[key];
      bVal = b[key];
      isComparingObjects = aVal && bVal &&
                          aVal.constructor === Object && bVal.constructor === Object;
      if ((isComparingObjects && !deepEqual(aVal, bVal)) ||
          (!isComparingObjects && aVal !== bVal)) {
        diff[key] = bVal;
      }
    }
    return diff;
  };
})();

/**
 * Returns whether we should capture this keyboard event for keyboard shortcuts.
 * @param {Event} event Event object.
 * @returns {Boolean} Whether the key event should be captured.
 */
export const shouldCaptureKeyEvent = function (event) {
  if (event.metaKey) { return false; }
  return document.activeElement === document.body;
};

/**
 * Splits a string into an array based on a delimiter.
 *
 * @param   {string=} [str='']        Source string
 * @param   {string=} [delimiter=' '] Delimiter to use
 * @returns {array}                   Array of delimited strings
 */
export const splitString = function (str, delimiter) {
  if (typeof delimiter === 'undefined') { delimiter = ' '; }
  // First collapse the whitespace (or whatever the delimiter is).
  var regex = new RegExp(delimiter, 'g');
  str = (str || '').replace(regex, delimiter);
  // Then split.
  return str.split(delimiter);
};

/**
 * Extracts data from the element given an object that contains expected keys.
 *
 * @param {Element} Source element.
 * @param {Object} [defaults={}] Object of default key-value pairs.
 * @returns {Object}
 */
export const getElData = function (el, defaults) {
  defaults = defaults || {};
  var data = {};
  Object.keys(defaults).forEach(copyAttribute);
  function copyAttribute (key) {
    if (el.hasAttribute(key)) {
      data[key] = el.getAttribute(key);
    }
  }
  return data;
};

/**
 * Retrieves querystring value.
 * @param  {String} name Name of querystring key.
 * @return {String}      Value
 */
export const getUrlParameter = function (name) {
  // eslint-disable-next-line no-useless-escape
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

/**
 * Detects whether context is within iframe.
 */
export const isIframed = function () {
  return window.top !== window.self;
};

/**
 * Finds all elements under the element that have the isScene
 * property set to true
 */
export const findAllScenes = function (el) {
  var matchingElements = [];
  var allElements = el.getElementsByTagName('*');
  for (var i = 0, n = allElements.length; i < n; i++) {
    if (allElements[i].isScene) {
      // Element exists with isScene set.
      matchingElements.push(allElements[i] as never);
    }
  }
  return matchingElements;
};

// Must be at bottom to avoid circular dependency.
export const srcLoader = require('./src-loader');