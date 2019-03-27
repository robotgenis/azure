//NAME=settings

//FUNCTIONS
//load()
//saveTeam()
//saveMatch()

var settings = {};


settings.load = function(){
    var html = document.getElementById("settings-2-teams-src").innerHTML;

    var outHTML = "";
    for(i in teams){
        add = html;

        add = add.replace(/00001/g, teams[i][0]);
        add = add.replace(/name1/g, teams[i][1]);

        outHTML += add;
    }
    document.getElementById("settings-2-teams").innerHTML = outHTML;

    var html = document.getElementById("settings-3-matches-src").innerHTML;
    
    outHTML = "";
    for(i in match.matches){
        add = html;
        add = add.replace(/99/g, match.matches[i][0]);
        add = add.replace(/00001/g, match.matches[i][1]);
        add = add.replace(/00002/g, match.matches[i][2]);
        add = add.replace(/00003/g, match.matches[i][3]);
        add = add.replace(/00004/g, match.matches[i][4]);

        
        outHTML += add;
    }

    document.getElementById("settings-3-matches").innerHTML = outHTML;
    
    document.getElementById("settings-3-red1").addEventListener("keydown", function(event){
        if(event.keyCode == 13){
            event.preventDefault()
            event.stopImmediatePropagation();

            document.getElementById("settings-3-red2").focus();
        }
    });

    document.getElementById("settings-3-red2").addEventListener("keydown", function(event){
        if(event.keyCode == 13){
            event.preventDefault()
            event.stopImmediatePropagation();

            document.getElementById("settings-3-blue1").focus();
        }
    });

    document.getElementById("settings-3-blue1").addEventListener("keydown", function(event){
        if(event.keyCode == 13){
            event.preventDefault()
            event.stopImmediatePropagation();

            document.getElementById("settings-3-blue2").focus();
        }
    });

    document.getElementById("settings-3-blue2").addEventListener("keydown", function(event){
        if(event.keyCode == 13 || event.keyCode == 9){
            event.preventDefault();
            event.stopImmediatePropagation();

            settings.saveMatch();

            document.getElementById("settings-3-round").value = (Number(document.getElementById("settings-3-round").value) + 1).toFixed(0);
            document.getElementById("settings-3-red1").value = "";
            document.getElementById("settings-3-red2").value = "";
            document.getElementById("settings-3-blue1").value = "";
            document.getElementById("settings-3-blue2").value = "";
            document.getElementById("settings-3-red1").focus();
        }
    });
}

settings.saveTeam = function(){
    var sendData = {type: "team", teamname: document.getElementById('settings-2-teamname').value, teamnum: String(document.getElementById('settings-2-teamnum').value)};
    $.get( "/check", function( data ) {
        if(data == "SUCCESS!"){
            $.ajax("/settings", {
                data : JSON.stringify(sendData),
                contentType : 'application/json',
                type : 'POST'}, function(ret){
                    console.log("ITS WORKING NOW!!!");
                });
        }
    });
}

settings.saveMatch = function(){
    var sendData = {
        type: "match",
        number: String(document.getElementById('settings-3-round').value), 
        red1: String(document.getElementById('settings-3-red1').value),
        red2: String(document.getElementById('settings-3-red2').value),
        blue1: String(document.getElementById('settings-3-blue1').value),
        blue2: String(document.getElementById('settings-3-blue2').value)
    };
    $.get( "/check", function( data ) {
        if(data == "SUCCESS!"){
            $.ajax("/settings", {
                data : JSON.stringify(sendData),
                contentType : 'application/json',
                type : 'POST'}, function(ret){
                    console.log("ITS WORKING NOW!!!");
                });
        }
    });
}