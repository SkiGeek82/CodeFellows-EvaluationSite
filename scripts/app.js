'use strict';

var rundata = {
    "runs": [
        {
            "id": 1,
            "resort":"Crystal Mountain",
            "name": "Lucky Shot",
            "description": "The easiest way down from the top of the Gondola or Raineir express offers a mixture of steep slopes seperated by mild runouts. With plenty of cat tracks to bypass the steeper slopes this is defnitely your easiest way down",
            "difficulty": "blue",
            "surface": "groomed",
            "image": "./images/runs/luckyshot.jpg"
        },
        {
            "id": 2,
            "resort": "Crystal Mountain",
            "name": "Snorting Elk",
            "description": "Offering a number of routes from a steep groomed slope to powder. This run varies on the day but is worth checking out.",
            "difficulty": "black",
            "surface": "moguls",
            "image": "./images/runs/luckyshot.jpg"
        },
        {
            "id": 3,
            "resort": "Crystal Mountain",
            "name": "Brain Damage",
            "description": "A hike from the throne saddle around the back and up to the top of Silver King leads you to find a number of entrances into A basin the main entrance from the peak is Brain Damage.",
            "difficulty": "doubleBlack",
            "surface": "powder",
            "image": "./images/runs/luckyshot.jpg"
        },
        {
            "id": 4,
            "resort": "Stevens Pass",
            "name": "Wild Catz",
            "description": "A hike from the throne saddle around the back and up to the top of Silver King leads you to find a number of entrances into A basin the main entrance from the peak is Brain Damage.",
            "difficulty": "doubleBlack",
            "surface": "powder",
            "image": "./images/runs/luckyshot.jpg"
        }
    ]
};

//class filter {
//    constructor() {
//        this.difficulty = [];
//        this.surface = [];
//        this.text = "";
//    }
    
//}

// We probably don't need a default filter we will just clear the current filter
// var defaultFilter = { "difficulty": ["green", "blue", "black", "doubleblack"] }

var btnFilter = document.getElementById("applyfilter");
btnFilter.addEventListener("click", filterData);

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