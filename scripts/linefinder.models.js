'use strict';

var LINEFINDER = LINEFINDER || {};
LINEFINDER.models = LINEFINDER.models || {};
LINEFINDER.models.Run = LINEFINDER.models.Run || {};
LINEFINDER.models.Runs = LINEFINDER.models.Runs || {};

/** Run class represents the details of a ski run
 * @param {any} id - id is a unique id for the run
 * @param {any} resort - the ski resort the run is located at
 * @param {any} name - the run name
 * @param {any} description - a description of the run
 * @param {any} difficulty - the runs difficult as green, blue, black, doubleBlack
 * @param {any} surface - describes the runs surface
 * @param {any} image - a link to an image of the run
 */
LINEFINDER.models.Run = function(id, resort, name, description, difficulty, surface, image) {
  this.id = id;
  this.resort = resort;
  this.name = name;
  this.description = description;
  this.difficulty = difficulty;
  this.surface = surface;
  this.image = image;
};

/**
 * Runs class holds an array of Run objects and provides the functionallity to
 * filter and sort that data
 * @param {LINEFINDER.models.Run[]} objArray - an array of LINEFINDER.models.Run
 */
LINEFINDER.models.Runs = function(objArray) {
  this.runs = objArray || [];

  // Filter Functions
  this.byDiff = function(value) {
    return function(element) {
      return value.includes(element.difficulty) || value.length === 0;
    };
  };
  this.bySurface = function(value) {
    return function(element) {
      return value.includes(element.surface) || value.length === 0;
    };
  };
  this.byText = function(value) {
    return function(element) {
      return element.name.toLowerCase().includes(value.toLowerCase()) || element.description.toLowerCase().includes(value.toLowerCase());
    };
  };
  this.byResort = function(value) {
    return function(element) {
      return value.includes(element.resort.toLowerCase()) || value.length === 0;
    };
  };

  // Sort Functions
  this.byName = function(a, b) {
    if (a.name < b.name)
      return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  };
};

/**
 * Adds a Run object to the Runs.runs array
 * @param {LINEFINDER.models.Run} runObj - Run object to be added
 */
LINEFINDER.models.Runs.prototype.push = function(runObj) {
  this.runs.push(runObj);
};

/**
 * query returns a Runs object containing only the Runs that match the filter
 * criteria
 * @param {any} filter - either a LINEFINDER.Filter object or a filter function
 * @return {LINEFINDER.models.Runs} - a copy of the filtered data
 */
LINEFINDER.models.Runs.prototype.query = function(filter) {
  var filteredRuns = new LINEFINDER.models.Runs();
  if (LINEFINDER.helpers.isFunction(filter)) {
    filteredRuns.runs = this.runs.filter(filter);
  }
  else {
    filteredRuns.runs = this.runs.filter(this.byDiff(filter.difficulty))
      .filter(this.byText(filter.filterText.toLowerCase()))
      .filter(this.bySurface(filter.surface))
      .filter(this.byResort(filter.resort));
  }
  return filteredRuns;
};

LINEFINDER.models.Runs.prototype.sort = function() {
  return new LINEFINDER.models.Runs(this.runs.sort(this.byName));
};
