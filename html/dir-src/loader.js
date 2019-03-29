//NAME=loader

//FUNCTIONS
//loadElement()
//dataCheck()

var loader = {};
loader.timer = null;
loader.refreshInterval = 60; //seconds



$(document).ready(function() {
    submit.loadCookies();
    
    var elements = document.getElementsByClassName('load');
    var len = elements.length;
    for(i = 0; i < len; i++){
        loader.loadElement(elements[i]);
    }

    google.charts.load('current', {'packages':['corechart', 'line', 'table', 'bar']});

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

                var max = match.matches.length;
                for(i = 0; i < max - 1; i ++){
                    for(k = i + 1; k < max; k++){
                        if(match.matches[i][0] > match.matches[k][0]){
                            var temp = match.matches[i];
                            match.matches[i] = match.matches[k];
                            match.matches[k] = temp;
                        }
                    }
                }

                
                $.get(' sql', { cmd: 'teams' }, function(data) {
                    teams = JSON.parse(data);

                    //Put teams in number order
                    var max = teams.length;
                    for(i = 0; i < max - 1; i ++){
                        for(k = i + 1; k < max; k++){
                            if(teams[i][0] > teams[k][0]){
                                var temp = teams[i];
                                teams[i] = teams[k];
                                teams[k] = temp;
                            }
                        }
                    }

                    $.get('sql', { cmd: 'users' }, function(data) {
                        login.users = JSON.parse(data);
                        
                        $.get('sql', { cmd: 'scouting' }, function(data) {
                            match.scouting = JSON.parse(data);
                            

                            $.get('sql', { cmd: 'data' }, function(data) {
                                dash.data.src = JSON.parse(data);

                                for(i in dash.data.src){
                                    dash.data.src[i] = JSON.parse(dash.data.src[i]);
                                }

                                submit.updateSettings();

                                match.loadMatches();

                                info.load();
                                
                                settings.load();

                                dash.refreshDash();
                            });
                        });
                    });
                });
            });
        }    
    });
    loader.timer = setTimeout(loader.dataCheck, loader.refreshInterval * 1000);
}