// JavaScript source code
'use strict';

var rundata = {
    "runs": [{
        "name": "Lucky Shot",
        "description": "The easiest way down from the top of the Gondola or Raineir express offers a mixture of steep slopes seperated by mild runouts. With plenty of cat tracks to bypass the steeper slopes this is defnitely your easiest way down",
        "difficulty": "blue",
        "surface":"Groomed"},
            {
        "name": "Snorting Elk",
        "description": "Offering a number of routes from a steep groomed slope powder. This run varies on the day but is worth checking out.",
        "difficulty": "black",
        "surface": "Mixed"
            }
    ]
};


/* We probably don't need a default filter we will just clear the current filter*/
var defaultFilter = { "difficulty": ["green", "blue", "black", "doubleblack"] }

window.onload = function () {
    formatResults(rundata, "results");
}

