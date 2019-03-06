//NAME=loader

//FUNCTIONS
//loadElement()

var loader = {};

$(document).ready(function() {
    var elements = document.getElementsByClassName('load');
    var len = elements.length
    for(i = 0; i < len; i++){
        loader.loadElement(elements[i]);
    }
});

loader.loadElement = function(element){
    $.get(element.innerHTML, function(data, status){
        element.innerHTML = data;
    });
}