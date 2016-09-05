'use strict';
// Sticking to ECMAScript 5 based on feedback from CodeFellows Admin

// Creating 'Namespace'
var LINEFINDER = LINEFINDER || {};
LINEFINDER.models = LINEFINDER.models || {};
// LINEFINDER.views = LINEFINDER.views || {};
LINEFINDER.helpers = LINEFINDER.helpers || {};
LINEFINDER.event = LINEFINDER.event || {};
LINEFINDER.settings = LINEFINDER.settings || {};

LINEFINDER.Filters = {
  difficulty: [],
  resort: [],
  surface: [],
  filterText: '',
  getFilters: function() {
    this.difficulty = this.getDifficulty();
    this.surface = this.getSurface();
    this.resort = this.getResort();
    this.filterText = this.getFilterText();
    this.save();
    return this;
  },
  save: function() {
    // implement localstorage saving
    localStorage.setItem(LINEFINDER.settings.filterLocalStorage, JSON.stringify(this));
  },
  load: function() {
    // implement localstorage retrieval
    var tmpFilters = JSON.parse(localStorage.getItem(LINEFINDER.settings.filterLocalStorage));

    if (tmpFilters === null) {
      this.difficulty = [];
      this.resort = [];
      this.surface = [];
      this.filterText = '';
    }
    else {
      this.difficulty = tmpFilters.difficulty;
      this.resort = tmpFilters.resort;
      this.surface = tmpFilters.surface;
      this.filterText = tmpFilters.filterText;
    }

    // Update UI
    // Change to Notify Controler
    this.updateControls();
  },
  // Move to model
  reset: function() {
    // delete from local storage
    localStorage.removeItem(LINEFINDER.settings.filterLocalStorage);
    // delete in memory
    this.load();
  },

  // Move to controller
  getDifficulty: function() {
    return LINEFINDER.helpers.getCheckedBoxesValues(LINEFINDER.settings.difficultyCtrlName);
  },
  // Move to controller
  getSurface: function() {
    return LINEFINDER.helpers.getCheckedBoxesValues(LINEFINDER.settings.surfaceCtrlName);
  },
  // Move to controller
  getResort: function() {
    return LINEFINDER.helpers.getSelectedOptions(LINEFINDER.settings.resortId);
  },
  // Move to controller
  getFilterText: function() {
    return document.getElementById(LINEFINDER.settings.filterTxtId).value;
  },
  // Move to controller
  updateControls: function() {
    LINEFINDER.helpers.setCheckBoxes(LINEFINDER.settings.difficultyCtrlName, this.difficulty);
    LINEFINDER.helpers.setCheckBoxes(LINEFINDER.settings.surfaceCtrlName, this.surface);
    LINEFINDER.helpers.setSelectedOptions(LINEFINDER.settings.resortId, this.resort);
    document.getElementById(LINEFINDER.settings.filterTxtId).value = this.filterText;
  }
};
