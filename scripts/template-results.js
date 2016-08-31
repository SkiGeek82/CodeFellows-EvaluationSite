/* I am separating this out as it has UI display aspects*/
'use strict';

/*  There are better ways to do this with some additional frameworks 
    but with pure javascript and no jquery, mustache, angular this is
    the approach I am going to take. It honestly reminds me of code I 
    wrote in 1999.
    */

//takes a run object and returns the html needed to render the result
function formatResult(run) {
    var output = '  <div class="result"> \
                        <div class="result-left"> \
                            <a href="#"> \
                                <img class="result-obj" src="' + run.image + '" alt="' + run.name + '"> \
                            </a> \
                        </div> \
                        <div class="result-body"> \
                            <h4 class="result-heading">' + run.name + '</h4>' + run.description + ' \
                        </div> \
                    </div>';
    return output;
}

// change this so that it takes an array and formats and the specific array object
// in the object is not needed to be known and so it works with filters
function formatResults(obj, target) {
    var results = "";
    for (var i = 0, len = obj.length; i<len; i++)
    {
        results += formatResult(obj[i]);
    }
    //formatResult(run)
    document.getElementById(target).innerHTML = results;
}


