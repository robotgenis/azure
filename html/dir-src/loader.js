//NAME=loader

//FUNCTIONS
//loadElement()
//dataCheck()

var loader = {};
loader.timer = null;
loader.refreshInterval = 60; //seconds

$(document).ready(function() {
    var elements = document.getElementsByClassName('load');
    var len = elements.length
    for(i = 0; i < len; i++){
        loader.loadElement(elements[i]);
    }
    loader.dataCheck();
});

loader.loadElement = function(element){
    $.get(element.innerHTML, function(data, status){
        element.innerHTML = data;
    });
}

loader.dataCheck = function(){
    clearTimeout(loader.timer);
    $.get( "/check", function( data ) {
        if(data == "SUCCESS!"){
            $.get(' sql', { cmd: 'matches' }, function(data) {
                match.matches = JSON.parse(data);
                $.get(' sql', { cmd: 'teams' }, function(data) {
                    teams = JSON.parse(data);
                    $.get('sql', { cmd: 'users' }, function(data) {
                        login.users = JSON.parse(data);
                        
                        match.loadMatches();

                        
                    });
                });
            });
        }    
    });
    loader.timer = setTimeout(loader.dataCheck, loader.refreshInterval * 1000);
}