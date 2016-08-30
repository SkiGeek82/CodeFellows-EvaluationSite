/* I am seperating this out as it has UI display aspects*/
'use strict';

/*  There are better ways to do this with some additional frameworks 
    but with pure javascript and no jquery, mustache, angular this is
    the approach I am going to take. It honestly reminds me of code I 
    wrote in 1999.
    */

//takes a run object and returns the html needed to render the result
function formatResult(run) {
    var output = '<div class="result"><div class="result-left"><a href="#"><img class="result-obj" src="..." alt="..."></a></div> \
    <div class="result-body"><h4 class="result-heading">' + run.name + '</h4>' + run.description + '</div></div>';
    return output;
}

function formatResults(obj, target) {
    var results = "";
    for (var i = 0, len = obj.runs.length; i<len; i++)
    {
        results += formatResult(obj.runs[i]);
    }
    //formatResult(run)
    document.getElementById(target).innerHTML = results;
}
