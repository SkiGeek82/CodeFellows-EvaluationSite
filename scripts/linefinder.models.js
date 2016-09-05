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

LINEFINDER.models.Runs = function(objArray) {
  this.runs = objArray || [];
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
  this.byName = function(a, b) {
    if (a.name < b.name)
      return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  };
};

LINEFINDER.models.Runs.prototype.push = function(runObj) {
  this.runs.push(runObj);
};

LINEFINDER.models.Runs.prototype.filterByDifficulty = function(value) {
  return this.runs.filter(this.byDiff(value));
};

LINEFINDER.models.Runs.prototype.filterBySurface = function(value) {
  return this.runs.filter(this.bySurface(value));
};

LINEFINDER.models.Runs.prototype.filterByText = function(value) {
  return this.runs.filter(this.byText(value));
};

LINEFINDER.models.Runs.prototype.filterByResort = function(value) {
  return this.runs.filter(this.byResort(value));
};

LINEFINDER.models.Runs.prototype.filter = function(filter) {
  return new LINEFINDER.models.Runs(this.runs.filter(this.byDiff(filter.difficulty))
      .filter(this.byText(filter.filterText.toLowerCase()))
      .filter(this.bySurface(filter.surface))
      .filter(this.byResort(filter.resort)));
};

LINEFINDER.models.Runs.prototype.sort = function() {
  return new LINEFINDER.models.Runs(this.runs.sort(this.byName));
};
