//NAME=settings

//FUNCTIONS
//load()
//saveTeam()
//saveMatch()
//saveScouting()
//saveUser()

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

    var html = document.getElementById("settings-4-scouting-src").innerHTML;
    
    outHTML = "";
    for(i in match.matches){
        add = html;
        for(k in match.scouting){
            if(match.scouting[k][0] == match.matches[i][0]){
                if(match.scouting[k][1] != null && match.scouting[k][1] != '') add = add.replace(/name1/g, match.scouting[k][1]);
                if(match.scouting[k][2] != null && match.scouting[k][2] != '') add = add.replace(/name2/g, match.scouting[k][2]);
                if(match.scouting[k][3] != null && match.scouting[k][3] != '') add = add.replace(/name3/g, match.scouting[k][3]);
                if(match.scouting[k][4] != null && match.scouting[k][4] != '') add = add.replace(/name4/g, match.scouting[k][4]);
                if(match.scouting[k][5] != null && match.scouting[k][5] != '') add = add.replace(/name5/g, match.scouting[k][5]);
            }
        }
        
        add = add.replace(/99/g, match.matches[i][0]);
        add = add.replace(/name1/g, "");
        add = add.replace(/name2/g, "");
        add = add.replace(/name3/g, "");
        add = add.replace(/name4/g, "");
        add = add.replace(/name5/g, "");

        outHTML += add;
    }
    document.getElementById("settings-4-scouting").innerHTML = outHTML;
    




    var html = document.getElementById("settings-4-scouter-src").innerHTML;
    var outHTML = "";
    add = html;
    add = add.replace(/name1/g, '');
    outHTML += add;

    for(i in login.users){
        add = html;

        add = add.replace(/name1/g, login.users[i][0] + "-" + login.users[i][1]);

        outHTML += add;
    }
    document.getElementById("settings-4-scouter").innerHTML = outHTML;





    var html = document.getElementById("settings-5-users-src").innerHTML;
    var outHTML = "";


    for(i in login.users){
        add = html;

        add = add.replace(/name1/g, login.users[i][0]);
        add = add.replace(/00001/g, login.users[i][1]);
        add = add.replace(/score1/g, login.users[i][2]);
        add = add.replace(/security1/g, login.users[i][3]);

        outHTML += add;
    }
    document.getElementById("settings-5-users").innerHTML = outHTML;


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
            //alert("Saved!");
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
            //alert("Saved!");
        }
    });
}

settings.saveScouting = function(){
    var mat = (document.getElementById("settings-4-matches").value).split("-");
    var locations = {"Red 1": "red1", "Red 2": "red2", "Blue 1": "blue1", "Blue 2": "blue2", "Alt": "alt", };
    var sendData = {
        type: "scouting",
        scouter: document.getElementById("settings-4-scouter").value,
        position: document.getElementById("settings-4-position").value,
        matches: {start: Number(mat[0]), end: Number(mat[1])}
    };
    $.get( "/check", function( data ) {
        if(data == "SUCCESS!"){
            $.ajax("/settings", {
                data : JSON.stringify(sendData),
                contentType : 'application/json',
                type : 'POST'}, function(ret){
                    console.log("ITS WORKING NOW!!!");
                });
            //alert("Saved!");
        }
    });
}

settings.saveUser = function(){
    var sendData = {
        type: "user",
        name: document.getElementById("settings-5-name").value,
        teamnum: document.getElementById("settings-5-teamnum").value,
        score: document.getElementById("settings-5-score").value,
        security: document.getElementById("settings-5-security").value
    };
    $.get( "/check", function( data ) {
        if(data == "SUCCESS!"){
            $.ajax("/settings", {
                data : JSON.stringify(sendData),
                contentType : 'application/json',
                type : 'POST'}, function(ret){
                    console.log("ITS WORKING NOW!!!");
                });
            //alert("Saved!");
        }
    });
}