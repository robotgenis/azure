var matches = null;
var teams = null;
var matchNumber = null;
var matchTeam = null;

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

    html = html.replace(/00001/g, matches[matchNumber][1]);
    html = html.replace(/name1/g, getTeamName(matches[matchNumber][1]));
    html = html.replace(/00002/g, matches[matchNumber][2]);
    html = html.replace(/name2/g, getTeamName(matches[matchNumber][2]));
    html = html.replace(/00003/g, matches[matchNumber][3]);
    html = html.replace(/name3/g, getTeamName(matches[matchNumber][3]));
    html = html.replace(/00004/g, matches[matchNumber][4]);
    html = html.replace(/name4/g, getTeamName(matches[matchNumber][4]));

    document.getElementById("matchTeams").innerHTML = html;
    setTab('match-1');
}