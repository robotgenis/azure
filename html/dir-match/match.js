var matches = null;
var teams = null;
var matchNumber = null;
var matchTeam = null;
var matchTime = null;
var matchTimer = null;
var matchData = null;

$(document).ready(function() {
    $.get(' sql', { cmd: 'matches' }, function(data) {
        matches = JSON.parse(data);
        $.get(' sql', { cmd: 'teams' }, function(data) {
            teams = JSON.parse(data);
            //console.log(teams);
            //console.log(matches);
            matchLoad();
        });
    });
});

function getTeamName(number){
    out = null;
    for(i = 0; i < teams.length; i++){
        if(teams[i][0] == number){
            out = teams[i][1]
        }
    }
    return out;
}

function getMatch(matchNumber){
    ret = null;
    for(match in matches){
        if(matches[match][0] == matchNumber){
            ret = matches[match];
        }
    }
    return ret;
}

function matchLoad(){
    var max = matches.length;
    for(i = 0; i < max - 1; i ++){
        for(k = i + 1; k < max; k++){
            if(matches[i][0] > matches[k][0]){
                var temp = matches[i];
                matches[i] = matches[k];
                matches[k] = temp;
            }
        }
    }
    var html = document.getElementById("matchList").innerHTML;
    var outHtml = "";
    for(match in matches){
        add = html;
        add = add.replace(/99/g, matches[match][0]);
        add = add.replace(/00001/g, matches[match][1]);
        add = add.replace(/00002/g, matches[match][2]);
        add = add.replace(/00003/g, matches[match][3]);
        add = add.replace(/00004/g, matches[match][4]);
        outHtml += add;
    }
    document.getElementById("matchList").innerHTML = outHtml;
}

function matchSelectMatch(match){
    matchNumber = match;
    var html = document.getElementById("matchTeams").innerHTML;

    html = html.replace(/00001/g, getMatch(matchNumber)[1]);
    html = html.replace(/name1/g, getTeamName(getMatch(matchNumber)[1]));
    html = html.replace(/00002/g, getMatch(matchNumber)[2]);
    html = html.replace(/name2/g, getTeamName(getMatch(matchNumber)[2]));
    html = html.replace(/00003/g, getMatch(matchNumber)[3]);
    html = html.replace(/name3/g, getTeamName(getMatch(matchNumber)[3]));
    html = html.replace(/00004/g, getMatch(matchNumber)[4]);
    html = html.replace(/name4/g, getTeamName(getMatch(matchNumber)[4]));

    document.getElementById("matchTeams").innerHTML = html;

    document.getElementById("matchNumber-1").innerHTML = String(matchNumber);
    setTab('match-1');
}

function matchSelectTeam(team){
    matchTeam = team;

    document.getElementById("matchNumber-2").innerHTML = String(matchNumber);
    document.getElementById("matchTeamName-2").innerHTML = getTeamName(matchTeam);
    document.getElementById("matchTeamNumber-2").innerHTML = String(matchTeam);

    document.getElementById("matchNumber-3").innerHTML = String(matchNumber);
    document.getElementById("matchTeamName-3").innerHTML = getTeamName(matchTeam);
    document.getElementById("matchTeamNumber-3").innerHTML = String(matchTeam);

    document.getElementById("matchNumber-4").innerHTML = String(matchNumber);
    document.getElementById("matchTeamName-4").innerHTML = getTeamName(matchTeam);
    document.getElementById("matchTeamNumber-4").innerHTML = String(matchTeam);

    document.getElementById("matchInputHanging").checked = "";

    setTab('match-2');
}

function matchStart(){

    document.getElementById("matchInputAutoLand").checked = "";
    document.getElementById("matchInputAutoSample").checked = "";
    document.getElementById("matchInputAutoClaim").checked = "";
    document.getElementById("matchInputAutoPark").checked = "";

    matchTime = 0.0;
    matchTimer = setInterval(matchTimerAdd, 100);

    matchData = {};
    matchData.number = matchNumber;
    matchData.team = matchTeam;
    matchData.scouter = {'username': loginUsername, 'teamnum': loginTeam, 'prediction': Number(document.getElementById("matchInputPrediction").innerText)};
    matchData.auto = {
        land:{value:false,time:0.0}, 
        sample:{value:false,time:0.0}, 
        claim:{value:false,time:0.0}, 
        park:{value:false,time:0.0}
    };

    setTab('match-3');
}

function matchAutoInput(id){
    var value = document.getElementById(id).checked;
    var time = matchTime;
    if(value == false){
        time = 0.0;
    }
    if(id == "matchInputAutoLand"){
        matchData.auto.land.value = value;
        matchData.auto.land.time = time;
    }else if(id == "matchInputAutoSample"){
        matchData.auto.sample.value = value;
        matchData.auto.sample.time = time;
    }else if(id == "matchInputAutoClaim"){
        matchData.auto.claim.value = value;
        matchData.auto.claim.time = time;
    }else if(id == "matchInputAutoPark"){
        matchData.auto.park.value = value;
        matchData.auto.park.time = time;
    }
}

function matchTele(){

    setTab('match-4');

    $.ajax("/submit", {
        data : JSON.stringify([matchData]),
        contentType : 'application/json',
        type : 'POST'}, function(ret){
            alert("sent!");
        });
}

function matchTimerAdd(){
    matchTime += 0.1;
    matchTime = Math.round(matchTime * 10) / 10;
}

function matchFinish(){
    clearTimeout(matchTimer);
}