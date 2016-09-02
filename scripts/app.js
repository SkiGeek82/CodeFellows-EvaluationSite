'use strict';
//Sticking to ECMAScript 5 based on feedback from CodeFellows Admin

//Creating "Namespace" 
var LINEFINDER = LINEFINDER || {};


LINEFINDER.commonMethod = {
    FilterLocalStorage: "Filters"
}

LINEFINDER.event = LINEFINDER.event || {};

LINEFINDER.event = {
    // Parameters:
    // el - element object to add listner to
    // type - the event type as a string to add ie: "click"
    // fn - the function reference to call when event is raised
    addListner: function (el, type, fn) {
        el.addEventListener(type, fn);
    },

    removeListner: function (el, type, fn) {        
        el.removeEventListener(type, fn);
    }
};

var btnFilter = document.getElementById("applyfilter");

//Using this element could potentially call the filterData function when 
//user doesnt click the checkbox label. I could add an event listner for 
//each label if it is an issue
var diffSelector = document.getElementById("diffSelector");
var resortSelector = document.getElementById("resort");
var filterText = document.getElementById("filterText")



LINEFINDER.event.addListner(btnFilter, "click", filterData);
LINEFINDER.event.addListner(diffSelector, "click", filterData);
LINEFINDER.event.addListner(resortSelector, "click", filterData);
//this will run if someone just clicks in the text field and press any key even if it doesnt result in data entry
LINEFINDER.event.addListner(filterText, "keyup", filterData);


window.onload = function () {
   // formatResults(rundata.runs, "results");
    LINEFINDER.Filters.load();
    filterData();
}

//using object literals because there is not a need for more than one instance of the filter object
LINEFINDER.Filters = {
    difficulty: [],
    resort: [],
    surface: [],
    filterText: "",
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
        localStorage.setItem(LINEFINDER.commonMethod.FilterLocalStorage, JSON.stringify(this));
    },
    load: function () {
        //implement localstorage retrieval
        var tmpFilters = JSON.parse(localStorage.getItem(LINEFINDER.commonMethod.FilterLocalStorage));

        if (tmpFilters == null) {
            this.difficulty = [];
            this.resort = [];
            this.surface = [];
            this.filterText = "";
        }
        else {
            this.difficulty = tmpFilters.difficulty;
            this.resort = tmpFilters.resort;
            this.surface = tmpFilters.surface;
            this.filterText = tmpFilters.filterText;
        }

        //Update UI
        this.updateControls();
    },
    reset: function () {
        //delete from local storage
        localStorage.removeItem(LINEFINDER.commonMethod.FilterLocalStorage);
        //delete in memory
        this.load();
    },

    //need to convert from literal so I can make these private/privlaged
    getDifficulty: function () {
        return getCheckedBoxesValues("difficulty[]");
    },
    getSurface: function () {
        return getCheckedBoxesValues("surface[]");
    },
    getResort: function () {
        return getSelectedOptions("resort");
    },
    getFilterText: function () {
        return document.getElementById("filterText").value.toLowerCase();
    },


    updateControls: function () {
        document.getElementById("filterText").value = this.filterText;

    }

}




function filterData() {
    LINEFINDER.Filters.getFilters();
    //apears that passing an object to the filter function does not evaluate correctly
    //will do some more research but for now going to apply consecutive filters.
    //formatResults(rundata.runs.filter(filterByAll(filterData)), "results");

    var filteredRuns = rundata.runs
        .filter(filterByDifficulty(LINEFINDER.Filters.difficulty))
        .filter(filterByText(LINEFINDER.Filters.filterText))
        .filter(filterBySurface(LINEFINDER.Filters.surface))
        .filter(filterByResort(LINEFINDER.Filters.resort));
    formatResults(filteredRuns, "results");
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


// In the MDN guide these would move to the CommonMethod section
// Return array of the checked checkbox values
function getCheckedBoxesValues(objName) {
    var checkBoxes = document.getElementsByName(objName);
    var checkedCheckBoxes = [];
    for(var i=0; i<checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            checkedCheckBoxes.push(checkBoxes[i].value);
        }
    }
    return checkedCheckBoxes;
}

// Return array of the checked checkbox values
function getSelectedOptions(objId) {
    var selectElement = document.getElementById(objId);
    var selectedOptions = [];
    for (var i = 0; i < selectElement.length; i++) {
        if (selectElement[i].selected) {
            selectedOptions.push(selectElement[i].value.toLowerCase());
        }
    }
    return selectedOptions;
}