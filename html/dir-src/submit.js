//NAME=submit

//FUNCTIONS
//loadCookies
//setSettings(setting, value);
//updateSettings();
//saveData(arr)
//submitCheck()
//submitSend()

var submit = {};
submit.timer = null;
submit.cookieName = "POWERSCOUTDATA-WORLDS";
submit.backupName = "POWERSCOUTDATA-BACKUP";
submit.settingsName = "POWERSCOUTDATA_SETTINGS";
submit.settings = null;

submit.loadCookies = function(){
    submit.timer = setInterval(submit.submitCheck, 3000);
    if(localStorage.getItem(submit.cookieName) == null){
        localStorage.setItem(submit.cookieName, JSON.stringify([]));
    }
    if(localStorage.getItem(submit.backupName) == null){
        localStorage.setItem(submit.backupName, JSON.stringify([]));
    }
    if(localStorage.getItem(submit.settingsName) == null){
        localStorage.setItem(submit.settingsName, JSON.stringify({position: "all"}));
    }

    submit.settings = JSON.parse(localStorage.getItem(submit.settingsName));
}

submit.setSettings = function(setting, setTo){
    submit.settings[setting] = setTo;

    localStorage.setItem(submit.settingsName, JSON.stringify(submit.settings));

    submit.updateSettings();
}

submit.updateSettings = function(){
    document.getElementById('settings-1-position').innerText = submit.settings.position;
    var settingSelections = {all: "All", red1: "Red 1", red2: "Red 2", blue1: "Blue 1", blue2: "Blue 2"};

    document.getElementById('menu-scout-scoutingPosition').innerText = settingSelections[submit.settings.position];
}

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