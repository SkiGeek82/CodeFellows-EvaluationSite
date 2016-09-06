'use strict';

var LINEFINDER = LINEFINDER || {};

LINEFINDER.helpers = LINEFINDER.helpers || {};

LINEFINDER.helpers.getCheckedBoxesValues = function(objName) {
  var checkBoxes = document.getElementsByName(objName);
  var checkedCheckBoxes = [];
  for (var i = 0; i < checkBoxes.length; i++) {
    if (checkBoxes[i].checked) {
      checkedCheckBoxes.push(checkBoxes[i].value);
    }
  }
  return checkedCheckBoxes;
};

LINEFINDER.helpers.setCheckBoxes = function(objName, objValues) {
  var checkBoxes = document.getElementsByName(objName);
  for (var i = 0; i < checkBoxes.length; i++) {
    checkBoxes[i].checked = objValues.includes(checkBoxes[i].value);
  }
};

LINEFINDER.helpers.getSelectedOptions = function(objId) {
  var selectElement = document.getElementById(objId);
  var selectedOptions = [];
  for (var i = 0; i < selectElement.length; i++) {
    if (selectElement[i].selected) {
      selectedOptions.push(selectElement[i].value.toLowerCase());
    }
  }
  return selectedOptions;
};

LINEFINDER.helpers.setSelectedOptions = function(objId, objValues) {
  var selectElement = document.getElementById(objId);
  for (var i = 0; i < selectElement.length; i++) {
    selectElement[i].selected = objValues.includes(selectElement[i].value.toLowerCase());
  }
};

LINEFINDER.helpers.isFunction = function(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
};
