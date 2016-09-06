'use strict';

var LINEFINDER = LINEFINDER || {};
LINEFINDER.event = LINEFINDER.event || {};

LINEFINDER.event = {

  /**
   * @param {any} el - element object to add listner to
   * @param {string} type - the event type as a string to add ie: "click"
   * @param {function} fn - the function reference to call when event is raised
   */
  addListner: function(el, type, fn) {
    el.addEventListener(type, fn);
  },

  /**
   * @param {any} el - element object array to add listners to
   * @param {string} type - the event type as a string to add ie: "click"
   * @param {function} fn - the function reference to call when event is raised
   */
  addListners: function(el, type, fn) {
    for (var i = 0; i < el.length; i++) {
      el[i].addEventListener(type, fn);
    }
  },

  /**
   * @param {any} el - element object to remove listner from
   * @param {string} type - the event type as a string to add ie: "click"
   * @param {function} fn - the function reference to call when event is raised
   */
  removeListner: function(el, type, fn) {
    el.removeEventListener(type, fn);
  },

  /**
   * @param {any} el - element object array to remove listners from
   * @param {string} type - the event type as a string to add ie: "click"
   * @param {function} fn - the function reference to call when event is raised
   */
  removeListners: function(el, type, fn) {
    for (var i = 0; i < i.length; i++) {
      el[i].removeEventListener(type, fn);
    }
  }
};
