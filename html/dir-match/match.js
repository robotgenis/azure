var matches = null;
var teams = null;
var matchNumber = null;
var matchTeam = null;
var matchTime = null;
var matchAutoTime = null;
var matchTimer = null;
var matchTimerStart = null;
var matchData = null;
var matchMineralCount = null;
var matchMineralStart1 = null;
var matchMineralStart2 = null;
var matchTeamsHTML = null;
var matchStartHang = null;

$(document).ready(function() {
    $.get(' sql', { cmd: 'matches' }, function(data) {
        matches = JSON.parse(data);
        $.get(' sql', { cmd: 'teams' }, function(data) {
            teams = JSON.parse(data);
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
    if(matchTeamsHTML == null){
        matchTeamsHTML = document.getElementById("matchTeams").innerHTML;
    }

    var html = matchTeamsHTML;

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

    document.getElementById("matchNumber-5").innerHTML = String(matchNumber);
    document.getElementById("matchTeamName-5").innerHTML = getTeamName(matchTeam);
    document.getElementById("matchTeamNumber-5").innerHTML = String(matchTeam);

    document.getElementById("matchInputHanging").checked = "";

    setTab('match-2');
}

function matchStart(){

    document.getElementById("matchInputAutoLand").checked = "";
    document.getElementById("matchInputAutoSample").checked = "";
    document.getElementById("matchInputAutoClaim").checked = "";
    document.getElementById("matchInputAutoPark").checked = "";

    document.getElementById("matchMineralTimer1").style.display = "none";
    document.getElementById("matchMineralTimerPic1").style.display = "none";
    document.getElementById("matchMineralTimer2").style.display = "none";
    document.getElementById("matchMineralTimerPic2").style.display = "none";

    document.getElementById("matchFinishPark-1").classList.remove("active");
    document.getElementById("matchFinishPark-2").classList.remove("active");
    document.getElementById("matchFinishPark-3").classList.remove("active");

    document.getElementById("matchRating1-1").classList.remove("active");
    document.getElementById("matchRating1-2").classList.remove("active");
    document.getElementById("matchRating1-3").classList.remove("active");
    document.getElementById("matchRating1-4").classList.remove("active");

    document.getElementById("matchRating2-1").classList.remove("active");
    document.getElementById("matchRating2-2").classList.remove("active");
    document.getElementById("matchRating2-3").classList.remove("active");
    document.getElementById("matchRating2-4").classList.remove("active");

    document.getElementById("matchRating3-1").classList.remove("active");
    document.getElementById("matchRating3-2").classList.remove("active");
    document.getElementById("matchRating3-3").classList.remove("active");
    document.getElementById("matchRating3-4").classList.remove("active");

    document

    matchMineralCount = 0;

    matchTime = 0.0;
    matchTimerStart = Date.now();
    matchTimer = setInterval(matchTimerAdd, 100);

    matchData = {};
    matchData.type = "match";
    matchData.number = matchNumber;
    matchData.team = matchTeam;
    matchData.scouter = {'username': loginUsername, 'teamnum': loginTeam, 'prediction': Number(document.getElementById("matchInputPrediction").innerText)};
    matchData.auto = {
        land:{value:false,time:0.0}, 
        sample:{value:false,time:0.0}, 
        claim:{value:false,time:0.0}, 
        park:{value:false,time:0.0}
    };
    matchData.teleop = {};
    matchData.teleop.cycles = [];
    matchData.teleop.count = {depot:0,lander:0};

    matchStartHang = document.getElementById("matchInputHanging").checked;

    setTab('match-3');
}

function matchAutoInput(id){
    var value = document.getElementById(id).checked;
    var time = matchTime;
    if(value == false){
        time = 0.0;
    }
    if(id == "matchInputAutoLand" && matchStartHang == false){
        document.getElementById(id).checked = false;
        id = "";
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
    matchAutoTime = matchTime;

    setTab('match-4');
}

function matchTimerAdd(){
    matchTime = Date.now() - matchTimerStart; // milliseconds elapsed since start

    if(matchMineralCount >= 1){
        var t = (matchTime - matchMineralStart1) / 1000;
        document.getElementById("matchMineralTimer1").innerText = t.toFixed(1);
    }
    if(matchMineralCount >= 2){
        var t = (matchTime - matchMineralStart2) / 1000;
        document.getElementById("matchMineralTimer2").innerText = t.toFixed(1);
    }
}

function matchMineralClick(action){
    if(action == "pick"){
        if(matchMineralCount < 2){
            matchMineralCount += 1;
            if(matchMineralCount == 1){
                document.getElementById("matchMineralTimer1").innerText = "0.0";
                document.getElementById("matchMineralTimer1").style.display = "block";
                document.getElementById("matchMineralTimerPic1").style.display = "block";
                
                matchMineralStart1 = matchTime;
            }else if(matchMineralCount == 2){
                document.getElementById("matchMineralTimer2").innerText = "0.0";
                document.getElementById("matchMineralTimer2").style.display = "block";
                document.getElementById("matchMineralTimerPic2").style.display = "block";

                matchMineralStart2 = matchTime;
            }
        }
    }else if(action == "scoredepot"){
        if(matchMineralCount > 0){
            var start = 0;
            var end = 0;
            var len = 0;
            if(matchMineralCount == 2){
                start = Math.round(matchMineralStart1 / 100) / 10;
                end = Math.round((matchTime) / 100) / 10;
                len = Math.round((end - start) * 10) / 10;

                matchMineralStart1 = matchMineralStart2;

                document.getElementById("matchMineralTimer2").style.display = "none";
                document.getElementById("matchMineralTimerPic2").style.display = "none";
                var t = (matchTime - matchMineralStart1) / 1000;
                document.getElementById("matchMineralTimer1").innerText = t.toFixed(1);
            }else if(matchMineralCount == 1){
                start = Math.round(matchMineralStart1 / 100) / 10;
                end = Math.round((matchTime) / 100) / 10;
                len = Math.round((end - start) * 10) / 10;

                document.getElementById("matchMineralTimer1").style.display = "none";
                document.getElementById("matchMineralTimerPic1").style.display = "none";
            }
            matchData.teleop.cycles[matchData.teleop.cycles.length] = {start: start,end: end,length: len,type:'depot'};
            
            matchData.teleop.count.depot += 1;

            matchMineralCount -= 1;
        }
    }else if(action == "scorelander"){
        if(matchMineralCount > 0){
            var start = 0;
            var end = 0;
            var len = 0;
            if(matchMineralCount == 2){
                start = Math.round(matchMineralStart1 / 100) / 10;
                end = Math.round((matchTime) / 100) / 10;
                len = Math.round((end - start) * 10) / 10;

                matchMineralStart1 = matchMineralStart2;

                document.getElementById("matchMineralTimer2").style.display = "none";
                document.getElementById("matchMineralTimerPic2").style.display = "none";
                var t = (matchTime - matchMineralStart1) / 1000;
                document.getElementById("matchMineralTimer1").innerText = t.toFixed(1);
            }else if(matchMineralCount == 1){
                start = Math.round(matchMineralStart1 / 100) / 10;
                end = Math.round((matchTime) / 100) / 10;
                len = Math.round((end - start) * 10) / 10;

                document.getElementById("matchMineralTimer1").style.display = "none";
                document.getElementById("matchMineralTimerPic1").style.display = "none";
            }
            matchData.teleop.cycles[matchData.teleop.cycles.length] = {start: start,end: end,length: len,type:'lander'};
            
            matchData.teleop.count.lander += 1;

            matchMineralCount -= 1;
        }
    }else if(action == "drop"){
        if(match > 0){
            if(matchMineralCount == 1){
                document.getElementById("matchMineralTimer1").style.display = "none";
                document.getElementById("matchMineralTimerPic1").style.display = "none";
            }else if(matchMineralCount == 2){
                document.getElementById("matchMineralTimer2").style.display = "none";
                document.getElementById("matchMineralTimerPic2").style.display = "none";
            }
            matchMineralCount -= 1;
        }
    }
}

function matchMineralTimerCount(){
    if(document.getElementById("matchMineralTimer1").style.display == "block"){
        var input = document.getElementById("matchMineralTimer1").innerText;
        input = Number(input);
        document.getElementById("matchMineralTimer1").innerText = (input + .1).toFixed(1);
    }
}

function matchFinish(){
    clearTimeout(matchTimer);

    setTab('match-5');
}

function matchRadioClick(item){
    var section = String(item).split('-')[0];
    count = 4;
    if(section == "matchFinishPark"){
        count = 3;
    }
    for(i = 1; i <= count; i++){
        if(section + '-' + String(i) != item || section != "matchFinishPark"){
            document.getElementById(section + '-' + String(i)).classList.remove("active");
        }
    }
}

function matchSubmit(){
    var park = (document.getElementById("matchFinishPark-1").classList.contains("active")) ? "park" : (document.getElementById("matchFinishPark-2").classList.contains("active")) ? "parkcomplete" : (document.getElementById("matchFinishPark-3").classList.contains("active")) ? "hang" : ""; 
    var balls = (document.getElementById("matchRating1-1").classList.contains("active")) ? 1 : (document.getElementById("matchRating1-2").classList.contains("active")) ? 2 : (document.getElementById("matchRating1-3").classList.contains("active")) ? 3 : (document.getElementById("matchRating1-4").classList.contains("active")) ? 4 :  0;
    var blocks = (document.getElementById("matchRating2-1").classList.contains("active")) ? 1 : (document.getElementById("matchRating2-2").classList.contains("active")) ? 2 : (document.getElementById("matchRating2-3").classList.contains("active")) ? 3 : (document.getElementById("matchRating2-4").classList.contains("active")) ? 4 :  0;
    var pick = (document.getElementById("matchRating3-1").classList.contains("active")) ? 1 : (document.getElementById("matchRating3-2").classList.contains("active")) ? 2 : (document.getElementById("matchRating3-3").classList.contains("active")) ? 3 : (document.getElementById("matchRating3-4").classList.contains("active")) ? 4 :  0;
    matchData.post = {park:park,ratings:{balls:balls,block:blocks,pick:pick}};
    var autoScore = 0;
    autoScore += (matchData.auto.land.value) ? 30 : 0;
    autoScore += (matchData.auto.sample.value) ? 25 : 0;
    autoScore += (matchData.auto.claim.value) ? 15 : 0;
    autoScore += (matchData.auto.park.value) ? 10 : 0;
    var teleScore = 0;
    teleScore += (matchData.teleop.count.lander) * 5;
    teleScore += (matchData.teleop.count.depot) * 2;
    var endScore = 0;
    endScore += (matchData.post.park == "park") ? 10 : (matchData.post.park == "parkcomplete") ? 25 : (matchData.post.park == "hang") ? 50 : 0;
    
    matchData.match = {times:{length:matchTime,auto:matchAutoTime},score:{auto:autoScore,tele:teleScore,end:endScore,total:autoScore + teleScore + endScore}};
    saveData(matchData);

    document.getElementById("matchOutputPredicted").innerText = String(matchData.scouter.prediction);
    document.getElementById("matchOutputCalculated").innerText = String(matchData.match.score.total);
    var offby = Math.abs(matchData.match.score.total - matchData.scouter.prediction);
    var points = 0;
    if(offby < 50) points = 2;
    if(offby < 25) points = 5;
    if(offby < 15) points = 8;
    if(offby < 5) points = 10;
    var score = Math.round(3 + points);
    document.getElementById("matchOutputScouting").innerText = String(score);
    
    saveData({type: "score", score: score, scouter: {username: loginUsername, teamnum: loginTeam}});

    setTab("match-6");
}

function matchNextMatch(){
    matchSelectMatch(matchNumber + 1);
}