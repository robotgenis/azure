var submitTimer = null;
var cookieName = "POWERSCOUTDATA-STATES";

$(document).ready(function() {
    submitTimer = setInterval(submitCheck, 3000);
    if(localStorage.getItem(cookieName) == null){
        localStorage.setItem(cookieName, JSON.stringify([]));
    }
});

function saveData(arr){ 
    var prev = localStorage.getItem(cookieName);
    prev = JSON.parse(prev);
    
    prev[prev.length] = arr;

    localStorage.setItem(cookieName, JSON.stringify(prev));
}

function submitCheck(){
    if(JSON.parse(localStorage.getItem(cookieName)).length > 0){
        $.get( "/check", function( data ) {
            if(data == "SUCCESS!"){
                submitSend();
            }    
        });
    }
}

function submitSend(){
    var data = localStorage.getItem(cookieName);
    $.ajax("/submit", {
        data : data,
        contentType : 'application/json',
        type : 'POST'}, function(ret){
        });
    localStorage.setItem(cookieName, JSON.stringify([]));
}