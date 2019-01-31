$(document).ready(function() {
    var elements = document.getElementsByClassName('load');
    var len = elements.length
    for(i = 0; i < len; i++){
        loadElement(elements[i]);
    }
});

function loadElement(element){
    console.log(element.src);
    $.get(element.innerHTML, function(data, status){
        element.innerHTML = data;
    });
}