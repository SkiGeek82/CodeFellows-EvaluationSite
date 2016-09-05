'use strict';
// Sticking to ECMAScript 5 based on feedback from CodeFellows Admin

// Creating 'Namespace'
var LINEFINDER = LINEFINDER || {};
LINEFINDER.models = LINEFINDER.models || {};
// LINEFINDER.views = LINEFINDER.views || {};
LINEFINDER.helpers = LINEFINDER.helpers || {};
LINEFINDER.event = LINEFINDER.event || {};
LINEFINDER.settings = LINEFINDER.settings || {};

LINEFINDER.settings = {
  filterLocalStorage: 'Filters',
  difficultyGrpId: 'diff-grp',
  difficultyCtrlName: 'difficulty[]',
  surfaceGrpId: 'surface-grp',
  surfaceCtrlName: 'surface[]',
  resortId: 'resort',
  filterTxtId: 'filter-txt',
  resetBtnId: 'reset-btn',
  resultsId: 'results'
};

// Getting Elements to add event listners to
var elDifficultyLabels = document.getElementById(LINEFINDER.settings.difficultyGrpId).getElementsByTagName('label');
var elSurfaceLabels = document.getElementById(LINEFINDER.settings.surfaceGrpId).getElementsByTagName('label');
var elResortSelector = document.getElementById(LINEFINDER.settings.resortId);
var elFilterText = document.getElementById(LINEFINDER.settings.filterTxtId);
var elResetFilterBtn = document.getElementById(LINEFINDER.settings.resetBtnId);

// Adding event listners to elements
LINEFINDER.event.addListner(elResetFilterBtn, 'click', resetFilters);
LINEFINDER.event.addListners(elDifficultyLabels, 'click', filterData);
LINEFINDER.event.addListners(elSurfaceLabels, 'click', filterData);
LINEFINDER.event.addListner(elResortSelector, 'click', filterData);
// this will run if someone just clicks in the text field and press any key even if it doesnt result in data entry
LINEFINDER.event.addListner(elFilterText, 'keyup', filterData);

var lines = new LINEFINDER.models.Runs();
lines.runs = rundata.runs;

window.onload = function() {
  // formatResults(rundata.runs, 'results');
  LINEFINDER.Filters.load();
  filterData();
};

function resetFilters() {
  LINEFINDER.Filters.reset();
  filterData();
}

function filterData() {
  LINEFINDER.Filters.getFilters();

  formatResults(lines.filter(LINEFINDER.Filters).sort().runs, LINEFINDER.settings.resultsId);
}
