'use strict';

var LINEFINDER = LINEFINDER || {};
LINEFINDER.event = LINEFINDER.event || {};

LINEFINDER.event = {
    // Parameters:
    // el - element object to add listner to
    // type - the event type as a string to add ie: "click"
    // fn - the function reference to call when event is raised
  addListner: function(el, type, fn) {
    el.addEventListener(type, fn);
  },

    // add the same event listner to an array of elments
  addListners: function(el, type, fn) {
    for (var i = 0; i < el.length; i++) {
      el[i].addEventListener(type, fn);
    }
  },

  removeListner: function(el, type, fn) {
    el.removeEventListener(type, fn);
  },

  removeListners: function(el, type, fn) {
    for (var i = 0; i < i.length; i++) {
      el[i].removeEventListener(type, fn);
    }
  }
};
