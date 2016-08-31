'use strict';

var rundata = {
    "runs": [
        {
            "id": 1,
            "name": "Lucky Shot",
            "description": "The easiest way down from the top of the Gondola or Raineir express offers a mixture of steep slopes seperated by mild runouts. With plenty of cat tracks to bypass the steeper slopes this is defnitely your easiest way down",
            "difficulty": "blue",
            "surface": "Groomed",
            "image": "./images/runs/luckyshot.jpg"
        },
        {
            "id": 2,
            "name": "Snorting Elk",
            "description": "Offering a number of routes from a steep groomed slope to powder. This run varies on the day but is worth checking out.",
            "difficulty": "black",
            "surface": "Mixed",
            "image": "./images/runs/luckyshot.jpg"
        },
        {
            "id": 3,
            "name": "Brain Damage",
            "description": "A hike from the throne saddle around the back and up to the top of Silver King leads you to find a number of entrances into A basin the main entrance from the peak is Brain Damage.",
            "difficulty": "black",
            "surface": "Mixed",
            "image": "./images/runs/luckyshot.jpg"
        }
    ]
};


// We probably don't need a default filter we will just clear the current filter
// var defaultFilter = { "difficulty": ["green", "blue", "black", "doubleblack"] }

var btnFilter = document.getElementById("applyfilter");
btnFilter.addEventListener("click", filterData);

window.onload = function () {
    formatResults(rundata.runs, "results");
}

function filterData(filters) {
    var text = document.getElementById("filterText").value;
    formatResults(rundata.runs.filter(filterByText(text)), "results");
}

//find all runs where name includes a specified value
function filterByText(value) {
    return function (element) {
        return element.name.toLowerCase().includes(value.toLowerCase()) || element.description.toLowerCase().includes(value.toLowerCase());
    }
}