'use strict';
//Sticking to ECMAScript 5 based on feedback from CodeFellows Admin

//Creating 'Namespace' 
var LINEFINDER = LINEFINDER || {};
//LINEFINDER.models = LINEFINDER.models || {};
//LINEFINDER.views = LINEFINDER.views || {};
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




//using object literals because there is not a need for more than one instance of the filter object
LINEFINDER.Filters = {
    difficulty: [],
    resort: [],
    surface: [],
    filterText: '',
    getFilters: function () {
        this.difficulty = this.getDifficulty();
        this.surface = this.getSurface();
        this.resort = this.getResort();
        this.filterText = this.getFilterText();
        this.save();
        return this
    },
    save: function () {
        //implement localstorage saving
        localStorage.setItem(LINEFINDER.settings.filterLocalStorage, JSON.stringify(this));
    },
    load: function () {
        //implement localstorage retrieval
        var tmpFilters = JSON.parse(localStorage.getItem(LINEFINDER.settings.filterLocalStorage));

        if (tmpFilters == null) {
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

        //Update UI
        //Change to Notify Controler
        this.updateControls();
    },
    //Move to model
    reset: function () {
        //delete from local storage
        localStorage.removeItem(LINEFINDER.settings.filterLocalStorage);
        //delete in memory
        this.load();

    },

    //Move to controller
    getDifficulty: function () {
        return LINEFINDER.helpers.getCheckedBoxesValues(LINEFINDER.settings.difficultyCtrlName);
    },
    //Move to controller
    getSurface: function () {
        return LINEFINDER.helpers.getCheckedBoxesValues(LINEFINDER.settings.surfaceCtrlName);
    },
    //Move to controller
    getResort: function () {
        return LINEFINDER.helpers.getSelectedOptions(LINEFINDER.settings.resortId);
    },
    //Move to controller
    getFilterText: function () {
        return document.getElementById(LINEFINDER.settings.filterTxtId).value;
    },
    //Move to controller
    updateControls: function () {
        LINEFINDER.helpers.setCheckBoxes(LINEFINDER.settings.difficultyCtrlName, this.difficulty);
        LINEFINDER.helpers.setCheckBoxes(LINEFINDER.settings.surfaceCtrlName, this.surface);
        LINEFINDER.helpers.setSelectedOptions(LINEFINDER.settings.resortId, this.resort);
        document.getElementById(LINEFINDER.settings.filterTxtId).value = this.filterText;

    }

}


//Getting Elements to add event listners to

var elDifficultyLabels = document.getElementById(LINEFINDER.settings.difficultyGrpId).getElementsByTagName('label');
var elSurfaceLabels = document.getElementById(LINEFINDER.settings.surfaceGrpId).getElementsByTagName('label');
var elResortSelector = document.getElementById(LINEFINDER.settings.resortId);
var elFilterText = document.getElementById(LINEFINDER.settings.filterTxtId)
var elResetFilterBtn = document.getElementById(LINEFINDER.settings.resetBtnId);

//Adding event listners to elements
LINEFINDER.event.addListner(elResetFilterBtn, 'click', resetFilters);
LINEFINDER.event.addListners(elDifficultyLabels, 'click', filterData);
LINEFINDER.event.addListners(elSurfaceLabels, 'click', filterData);
LINEFINDER.event.addListner(elResortSelector, 'click', filterData);
//this will run if someone just clicks in the text field and press any key even if it doesnt result in data entry
LINEFINDER.event.addListner(elFilterText, 'keyup', filterData);


window.onload = function () {
    // formatResults(rundata.runs, 'results');
    LINEFINDER.Filters.load();
    filterData();
}

function resetFilters() {
    LINEFINDER.Filters.reset();
    filterData();

}

function filterData() {
    LINEFINDER.Filters.getFilters();
    //apears that passing an object to the filter function does not evaluate correctly
    //will do some more research but for now going to apply consecutive filters.
    //formatResults(rundata.runs.filter(filterByAll(filterData)), 'results');

    var filteredRuns = rundata.runs
        .filter(filterByDifficulty(LINEFINDER.Filters.difficulty))
        .filter(filterByText(LINEFINDER.Filters.filterText.toLowerCase()))
        .filter(filterBySurface(LINEFINDER.Filters.surface))
        .filter(filterByResort(LINEFINDER.Filters.resort));
    formatResults(filteredRuns, LINEFINDER.settings.resultsId);
}

// Need to move filters into runs model object
//Filters Runs by difficulty given an array of selected difficulties
function filterByDifficulty(value) {
    return function (element) {
        return value.includes(element.difficulty) || value.length===0;
    }
}

function filterBySurface(value) {
    return function (element) {
        return value.includes(element.surface) || value.length === 0;
    }
}


//find all runs where name or description includes a specified value
function filterByText(value) {
    return function (element) {
        return element.name.toLowerCase().includes(value.toLowerCase()) || element.description.toLowerCase().includes(value.toLowerCase());
    }
}

//find all runs where name or description includes a specified value
function filterByResort(value) {
    return function (element) {
        return value.includes(element.resort.toLowerCase()) || value.length === 0;
    }
}


