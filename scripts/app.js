'use strict';
//Sticking to ECMAScript 5 based on feedback from CodeFellows Admin

//Creating "Namespace" 
var LINEFINDER = LINEFINDER || {};
LINEFINDER.models = LINEFINDER.models || {};
LINEFINDER.views = LINEFINDER.views || {};
LINEFINDER.helpers = LINEFINDER.helpers || {};

LINEFINDER.helpers.getCheckedBoxesValues = function (objName) {
    var checkBoxes = document.getElementsByName(objName);
    var checkedCheckBoxes = [];
    for (var i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            checkedCheckBoxes.push(checkBoxes[i].value);
        }
    }
    return checkedCheckBoxes;
};

LINEFINDER.helpers.setCheckBoxes = function (objName, objValues) {
    var checkBoxes = document.getElementsByName(objName);
    for (var i = 0; i < checkBoxes.length; i++) {
        checkBoxes[i].checked = objValues.includes(checkBoxes[i].value)
    }
};

LINEFINDER.helpers.getSelectedOptions = function (objId) {
    var selectElement = document.getElementById(objId);
    var selectedOptions = [];
    for (var i = 0; i < selectElement.length; i++) {
        if (selectElement[i].selected) {
            selectedOptions.push(selectElement[i].value.toLowerCase());
        }
    }
    return selectedOptions;
};

LINEFINDER.helpers.setSelectedOptions = function (objId, objValues) {
    var selectElement = document.getElementById(objId);
    for (var i = 0; i < selectElement.length; i++) {
        selectElement[i].selected = objValues.includes(selectElement[i].value.toLowerCase())
    }
};

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

    //add the same event listner to an array of elments
    addListners: function(el, type, fn){
        for(var i=0; i<el.length;i++)
        {
            el[i].addEventListener(type, fn);
        }
    },

    removeListner: function (el, type, fn) {        
        el.removeEventListener(type, fn);
    },

    removeListners: function(el,type, fn){
        for (i = 0; i < x.length; i++) {
            el[i].removeEventListener(type, fn);
        }
    }
};



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
        return LINEFINDER.helpers.getCheckedBoxesValues("difficulty[]");
    },
    getSurface: function () {
        return LINEFINDER.helpers.getCheckedBoxesValues("surface[]");
    },
    getResort: function () {
        return LINEFINDER.helpers.getSelectedOptions("resort");
    },
    getFilterText: function () {
        return document.getElementById("filterText").value;
    },
    updateControls: function () {
        LINEFINDER.helpers.setCheckBoxes("difficulty[]", this.difficulty);
        LINEFINDER.helpers.setCheckBoxes("surface[]", this.surface);
        LINEFINDER.helpers.setSelectedOptions("resort", this.resort);
        document.getElementById("filterText").value = this.filterText;

    }

}


//Getting Elements to add event listners to
var btnResetFilter = document.getElementById("resetfilter");
var difficultyLabels = document.getElementById("diffSelector").getElementsByTagName("label");
var surfaceLabels = document.getElementById("surfaceGroup").getElementsByTagName("label");
var resortSelector = document.getElementById("resort");
var filterText = document.getElementById("filterText")


//Adding event listners to elements
LINEFINDER.event.addListner(btnResetFilter, "click", resetFilters);
LINEFINDER.event.addListners(difficultyLabels, "click", filterData);
LINEFINDER.event.addListners(surfaceLabels, "click", filterData);
LINEFINDER.event.addListner(resortSelector, "click", filterData);
//this will run if someone just clicks in the text field and press any key even if it doesnt result in data entry
LINEFINDER.event.addListner(filterText, "keyup", filterData);


window.onload = function () {
    // formatResults(rundata.runs, "results");
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
    //formatResults(rundata.runs.filter(filterByAll(filterData)), "results");

    var filteredRuns = rundata.runs
        .filter(filterByDifficulty(LINEFINDER.Filters.difficulty))
        .filter(filterByText(LINEFINDER.Filters.filterText.toLowerCase()))
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
//function getCheckedBoxesValues(objName) {
//    var checkBoxes = document.getElementsByName(objName);
//    var checkedCheckBoxes = [];
//    for(var i=0; i<checkBoxes.length; i++) {
//        if (checkBoxes[i].checked) {
//            checkedCheckBoxes.push(checkBoxes[i].value);
//        }
//    }
//    return checkedCheckBoxes;
//}

//function setCheckBoxes(objName, objValues) {
//    var checkBoxes = document.getElementsByName(objName);
//    for (var i = 0; i < checkBoxes.length; i++) {
//        checkBoxes[i].checked = objValues.includes(checkBoxes[i].value)
//    }
//}

// Return array of the checked checkbox values
//function getSelectedOptions(objId) {
//    var selectElement = document.getElementById(objId);
//    var selectedOptions = [];
//    for (var i = 0; i < selectElement.length; i++) {
//        if (selectElement[i].selected) {
//            selectedOptions.push(selectElement[i].value.toLowerCase());
//        }
//    }
//    return selectedOptions;
//}

//function setSelectedOptions(objId, objValues) {
//    var selectElement = document.getElementById(objId);

//    for (var i = 0; i < selectElement.length; i++) {
//        selectElement[i].selected = objValues.includes(selectElement[i].value.toLowerCase())
//    }
    

//}