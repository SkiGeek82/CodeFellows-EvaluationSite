'use strict';

var LINEFINDER = LINEFINDER || {};

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
}

LINEFINDER.result = {};
LINEFINDER.result = {
    
}

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
    formatResults(rundata.runs, "results");
}





function filterData(filters) {
    var filterData = getFilterData();
    //apears that passing an object to the filter function does not evaluate correctly
    //will do some more research but for now going to apply consecutive filters.
    //formatResults(rundata.runs.filter(filterByAll(filterData)), "results");

    var filteredRuns = rundata.runs
        .filter(filterByDifficulty(filterData.difficutly))
        .filter(filterByText(filterData.text))
        .filter(filterBySurface(filterData.surface))
        .filter(filterByResort(filterData.resort));
    formatResults(filteredRuns, "results");
}

function getFilterData() {
    var filterData = {}
    filterData.difficutly = getCheckedBoxesValues("difficulty[]");
    filterData.surface = getCheckedBoxesValues("surface[]");
    filterData.resort = getSelectedOptions("resort");
    filterData.text = document.getElementById("filterText").value.toLowerCase();
    return filterData;

}


//See if I can combine filters it's not working
function filterByAll(filterObj) {
    return function (element) {
        return filterObj.difficulty.includes(element.difficulty) &&
            (element.name.toLowerCase().includes(filterObj.text) || element.description.toLowerCase().includes(filterObj.text));
    }
}

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