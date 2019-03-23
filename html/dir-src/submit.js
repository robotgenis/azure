//NAME=submit

//FUNCTIONS
//saveData(arr)
//submitCheck()
//submitSend()

var submit = {};
submit.timer = null;
submit.cookieName = "POWERSCOUTDATA-WORLDS";
submit.backupName = "POWERSCOUTDATA-BACKUP"

$(document).ready(function() {
    submit.timer = setInterval(submit.submitCheck, 3000);
    if(localStorage.getItem(submit.cookieName) == null){
        localStorage.setItem(submit.cookieName, JSON.stringify([]));
    }
});

submit.saveData = function(arr){ 
    var prev = localStorage.getItem(submit.cookieName);
    prev = JSON.parse(prev);
    
    prev[prev.length] = arr;

    localStorage.setItem(submit.cookieName, JSON.stringify(prev));


    var prev = localStorage.getItem(submit.backupName);
    prev = JSON.parse(prev);
    
    prev[prev.length] = arr;

    localStorage.setItem(submit.backupName, JSON.stringify(prev));
}

submit.submitCheck = function(){
    if(JSON.parse(localStorage.getItem(submit.cookieName)).length > 0){
        $.get( "/check", function( data ) {
            if(data == "SUCCESS!"){
                submit.submitSend();
            }    
        });
    }
}

submit.submitSend = function(){
    var data = localStorage.getItem(submit.cookieName);
    $.ajax("/submit", {
        data : data,
        contentType : 'application/json',
        type : 'POST'}, function(ret){
        });
    localStorage.setItem(submit.cookieName, JSON.stringify([]));
}