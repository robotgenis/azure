//NAME=match

//FUNCTIONS
//getTeamName(number)
//getMatch(matchNumber)
//loadMatches()
//selectMatch(matchNumber)
//selectTeam(team)
//matchStart()
//matchTimerAdd()
//changePosition()
//autoInput(id)

var teams = null; //public

var match = {};
match.matches = null;
match.matchNumber = null;
match.current = null;
match.matchTeam = null;
match.matchTeamName = null;
match.data = null;
match.startHanging = null;
match.startPosition = {color:null, position:null};
match.mineral = {count:null,start1:null,start2:null};
match.mineralCount = null;
match.timer = {time:null,timer:null,timerStart:null};

// match.matchNumber = null;
// var matchTeam = null;
// var matchTime = null;
// var matchAutoTime = null;
// var matchTimer = null;
// var matchTimerStart = null;
// var matchData = null;
// var matchMineralCount = null;
// var matchMineralStart1 = null;
// var matchMineralStart2 = null;
// var matchTeamsHTML = null;
// var matchStartHang = null;


match.getTeamName = function(number){
    out = null;
    for(i = 0; i < teams.length; i++){
        if(teams[i][0] == number){
            out = teams[i][1]
        }
    }
    return out;
}

match.getMatch = function(matchNumber){
    ret = null;
    for(i in match.matches){
        if(match.matches[i][0] == matchNumber){
            ret = match.matches[i];
        }
    }
    return ret;
}

match.loadMatches = function(){
    //sort
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
    //Generate Chart
    var html = document.getElementById("match-list-source").innerHTML;
    var outHtml = "";
    var displayMatches = [];
    if(login.user.security < 3){
        for(i in match.matches){
            if(match.matches[i][0] < 1){
                displayMatches[displayMatches.length] = match.matches[i];
            }
        }
    }else{
        for(i in match.matches){
            if(match.matches[i][0] != 0){
                displayMatches[displayMatches.length] = match.matches[i];
            }
        }
    }

    for(i in displayMatches){
        add = html;
        add = add.replace(/99/g, displayMatches[i][0]);
        add = add.replace(/00001/g, displayMatches[i][1]);
        add = add.replace(/00002/g, displayMatches[i][2]);
        add = add.replace(/00003/g, displayMatches[i][3]);
        add = add.replace(/00004/g, displayMatches[i][4]);
        outHtml += add;
    }
    document.getElementById("match-list").innerHTML = outHtml;
}

match.selectMatch = function(matchNumber){
    match.matchNumber = matchNumber;

    var html = document.getElementById("match-teams-source").innerHTML;
    match.current = match.getMatch(match.matchNumber);

    html = html.replace(/00001/g, match.current[1]);
    html = html.replace(/name1/g, match.getTeamName(match.current[1]));
    html = html.replace(/00002/g, match.current[2]);
    html = html.replace(/name2/g, match.getTeamName(match.current[2]));
    html = html.replace(/00003/g, match.current[3]);
    html = html.replace(/name3/g, match.getTeamName(match.current[3]));
    html = html.replace(/00004/g, match.current[4]);
    html = html.replace(/name4/g, match.getTeamName(match.current[4]));

    document.getElementById("match-teams").innerHTML = html;

    document.getElementById("match-1-number").innerHTML = String(match.matchNumber);
    document.getElementById("match-2-number").innerHTML = String(match.matchNumber);
    document.getElementById("match-3-number").innerHTML = String(match.matchNumber);
    document.getElementById("match-4-number").innerHTML = String(match.matchNumber);
    document.getElementById("match-5-number").innerHTML = String(match.matchNumber);

    setTab('match-1');
}

match.selectTeam = function(teamNumber){
    match.matchTeam = teamNumber;
    match.matchTeamName = match.getTeamName(match.matchTeam)

    document.getElementById("match-2-teamName").innerHTML = match.matchTeamName;
    document.getElementById("match-2-teamNumber").innerHTML = String(match.matchTeam);
    document.getElementById("match-3-teamName").innerHTML = match.matchTeamName;
    document.getElementById("match-3-teamNumber").innerHTML = String(match.matchTeam);
    document.getElementById("match-4-teamName").innerHTML = match.matchTeamName;
    document.getElementById("match-4-teamNumber").innerHTML = String(match.matchTeam);
    document.getElementById("match-5-teamName").innerHTML = match.matchTeamName;
    document.getElementById("match-5-teamNumber").innerHTML = String(match.matchTeam);

    document.getElementById("match-2-inputHanging").checked = true;

    document.getElementById("match-2-position-1").style.display = "none";
    document.getElementById("match-2-position-2").style.display = "none";
    document.getElementById("match-2-position-3").style.display = "none";
    document.getElementById("match-2-position-4").style.display = "none";
    

    
    match.startPosition.position = "crater";
    if(match.current[1] == match.matchTeam || match.current[2] == match.matchTeam){
        match.startPosition.color = "red";
        document.getElementById("match-2-position-2").style.display = "block";
    }else{
        match.startPosition.color = "blue";
        document.getElementById("match-2-position-3").style.display = "block";
    }

    setTab('match-2');
}

match.changePosition = function(){
    
    if(match.startPosition.color == "red"){
        if(match.startPosition.position == "crater"){
            match.startPosition.position = "depot";
            document.getElementById("match-2-position-1").style.display = "block";
            document.getElementById("match-2-position-2").style.display = "none";
        }else{
            match.startPosition.position = "crater";
            document.getElementById("match-2-position-1").style.display = "none";
            document.getElementById("match-2-position-2").style.display = "block";
        }
    }else{
        if(match.startPosition.position == "crater"){
            match.startPosition.position = "depot";
            document.getElementById("match-2-position-4").style.display = "block";
            document.getElementById("match-2-position-3").style.display = "none";
        }else{
            match.startPosition.position = "crater";
            document.getElementById("match-2-position-4").style.display = "none";
            document.getElementById("match-2-position-3").style.display = "block";
        }
    }
    console.log(match.startPosition.position);
}

match.matchStart = function(){

    document.getElementById("match-3-inputAutoLand").checked = "";
    document.getElementById("match-3-inputAutoSample").checked = "";
    document.getElementById("match-3-inputAutoClaim").checked = "";
    document.getElementById("match-3-inputAutoPark").checked = "";

    document.getElementById("match-4-mineralTimer1").style.display = "none";
    document.getElementById("match-4-mineralTimerPic1").style.display = "none";
    document.getElementById("match-4-mineralTimer2").style.display = "none";
    document.getElementById("match-4-mineralTimerPic2").style.display = "none";

    document.getElementById("match-5-park-1").classList.remove("active");
    document.getElementById("match-5-park-2").classList.remove("active");
    document.getElementById("match-5-park-3").classList.remove("active");

    document.getElementById("match-5-rating1-1").classList.remove("active");
    document.getElementById("match-5-rating1-2").classList.remove("active");
    document.getElementById("match-5-rating1-3").classList.remove("active");
    document.getElementById("match-5-rating1-4").classList.remove("active");

    document.getElementById("match-5-rating2-1").classList.remove("active");
    document.getElementById("match-5-rating2-2").classList.remove("active");
    document.getElementById("match-5-rating2-3").classList.remove("active");
    document.getElementById("match-5-rating2-4").classList.remove("active");

    document.getElementById("match-5-rating3-1").classList.remove("active");
    document.getElementById("match-5-rating3-2").classList.remove("active");
    document.getElementById("match-5-rating3-3").classList.remove("active");
    document.getElementById("match-5-rating3-4").classList.remove("active");

    match.startHang = document.getElementById("match-2-inputHanging").checked;

    match.mineral.count = 0;

    match.timer.time = 0.0;
    match.timer.timerStart = Date.now();
    match.timer.timer = setInterval(match.matchTimerAdd, 100);

    match.data = {};
    match.data.type = "match";
    match.data.match = {number: match.matchNumber, teamnum: match.matchTeam, color: match.startPosition.color};
    match.data.scouter = login.getScouter();//matchData.scouter = {'username': loginUsername, 'teamnum': loginTeam, 'prediction': Number(document.getElementById("matchInputPrediction").innerText)};
    match.data.scouter.prediction = Number(document.getElementById("match-2-inputPrediction").innerText);
    match.data.auto = {
        position: match.startPosition.position,
        hanging: match.startHanging,
        land:{value:false,time:0.0}, 
        sample:{value:false,time:0.0}, 
        claim:{value:false,time:0.0}, 
        park:{value:false,time:0.0}
    };
    match.data.cyclesUngrouped = [];
    match.data.cyclesGrouped = [];
    match.data.minerals = {count: {lander:0,drop:0}};
    match.data.time = {length:0.0,auto:0.0};

    setTab('match-3');
}

match.matchTimerAdd = function(){
    match.timer.time = Date.now() - match.timer.timerStart; // milliseconds elapsed since start

    if(match.mineralCount >= 1){
        var t = (match.timer.time - match.mineral.start1) / 1000;
        document.getElementById("match-4-mineralTimer1").innerText = t.toFixed(1);
    }
    if(match.mineralCount >= 2){
        var t = (match.timer.time - match.mineral.start2) / 1000;
        document.getElementById("match-4-mineralTimer2").innerText = t.toFixed(1);
    }
}

match.autoInput = function(id){
    var value = document.getElementById(id).checked;
    var time = match.timer.time;
    if(value == false){
        time = 0.0;
    }
    if(id == "match-3-inputAutoLand" && match.startHanging == false){
        document.getElementById(id).checked = false;
        id = "";
    }
    if(id == "match-3-inputAutoLand"){
        match.data.auto.land.value = value;
        match.data.auto.land.time = time;
    }else if(id == "match-3-inputAutoSample"){
        match.data.auto.sample.value = value;
        match.data.auto.sample.time = time;
    }else if(id == "match-3-inputAutoClaim"){
        match.data.auto.claim.value = value;
        match.data.auto.claim.time = time;
    }else if(id == "match-3-inputAutoPark"){
        match.data.auto.park.value = value;
        match.data.auto.park.time = time;
    }
}

// function matchTele(){
//     matchAutoTime = matchTime;

//     setTab('match-4');
// }

// function matchMineralClick(action){
//     if(action == "pick"){
//         if(matchMineralCount < 2){
//             matchMineralCount += 1;
//             if(matchMineralCount == 1){
//                 document.getElementById("matchMineralTimer1").innerText = "0.0";
//                 document.getElementById("matchMineralTimer1").style.display = "block";
//                 document.getElementById("matchMineralTimerPic1").style.display = "block";
                
//                 matchMineralStart1 = matchTime;
//             }else if(matchMineralCount == 2){
//                 document.getElementById("matchMineralTimer2").innerText = "0.0";
//                 document.getElementById("matchMineralTimer2").style.display = "block";
//                 document.getElementById("matchMineralTimerPic2").style.display = "block";

//                 matchMineralStart2 = matchTime;
//             }
//         }
//     }else if(action == "scoredepot"){
//         if(matchMineralCount > 0){
//             var start = 0;
//             var end = 0;
//             var len = 0;
//             if(matchMineralCount == 2){
//                 start = Math.round(matchMineralStart1 / 100) / 10;
//                 end = Math.round((matchTime) / 100) / 10;
//                 len = Math.round((end - start) * 10) / 10;

//                 matchMineralStart1 = matchMineralStart2;

//                 document.getElementById("matchMineralTimer2").style.display = "none";
//                 document.getElementById("matchMineralTimerPic2").style.display = "none";
//                 var t = (matchTime - matchMineralStart1) / 1000;
//                 document.getElementById("matchMineralTimer1").innerText = t.toFixed(1);
//             }else if(matchMineralCount == 1){
//                 start = Math.round(matchMineralStart1 / 100) / 10;
//                 end = Math.round((matchTime) / 100) / 10;
//                 len = Math.round((end - start) * 10) / 10;

//                 document.getElementById("matchMineralTimer1").style.display = "none";
//                 document.getElementById("matchMineralTimerPic1").style.display = "none";
//             }
//             matchData.teleop.cycles[matchData.teleop.cycles.length] = {start: start,end: end,length: len,type:'depot'};
            
//             matchData.teleop.count.depot += 1;

//             matchMineralCount -= 1;
//         }
//     }else if(action == "scorelander"){
//         if(matchMineralCount > 0){
//             var start = 0;
//             var end = 0;
//             var len = 0;
//             if(matchMineralCount == 2){
//                 start = Math.round(matchMineralStart1 / 100) / 10;
//                 end = Math.round((matchTime) / 100) / 10;
//                 len = Math.round((end - start) * 10) / 10;

//                 matchMineralStart1 = matchMineralStart2;

//                 document.getElementById("matchMineralTimer2").style.display = "none";
//                 document.getElementById("matchMineralTimerPic2").style.display = "none";
//                 var t = (matchTime - matchMineralStart1) / 1000;
//                 document.getElementById("matchMineralTimer1").innerText = t.toFixed(1);
//             }else if(matchMineralCount == 1){
//                 start = Math.round(matchMineralStart1 / 100) / 10;
//                 end = Math.round((matchTime) / 100) / 10;
//                 len = Math.round((end - start) * 10) / 10;

//                 document.getElementById("matchMineralTimer1").style.display = "none";
//                 document.getElementById("matchMineralTimerPic1").style.display = "none";
//             }
//             matchData.teleop.cycles[matchData.teleop.cycles.length] = {start: start,end: end,length: len,type:'lander'};
            
//             matchData.teleop.count.lander += 1;

//             matchMineralCount -= 1;
//         }
//     }else if(action == "drop"){
//         if(matchMineralCount > 0){
//             // if(matchMineralCount == 1){
//             //     document.getElementById("matchMineralTimer1").style.display = "none";
//             //     document.getElementById("matchMineralTimerPic1").style.display = "none";
//             // }else if(matchMineralCount == 2){
//             //     document.getElementById("matchMineralTimer2").style.display = "none";
//             //     document.getElementById("matchMineralTimerPic2").style.display = "none";
//             // }
//             // matchMineralCount -= 1;

//             var start = 0;
//             var end = 0;
//             var len = 0;
//             if(matchMineralCount == 2){
//                 start = Math.round(matchMineralStart1 / 100) / 10;
//                 end = Math.round((matchTime) / 100) / 10;
//                 len = Math.round((end - start) * 10) / 10;

//                 matchMineralStart1 = matchMineralStart2;

//                 document.getElementById("matchMineralTimer2").style.display = "none";
//                 document.getElementById("matchMineralTimerPic2").style.display = "none";
//                 var t = (matchTime - matchMineralStart1) / 1000;
//                 document.getElementById("matchMineralTimer1").innerText = t.toFixed(1);
//             }else if(matchMineralCount == 1){
//                 start = Math.round(matchMineralStart1 / 100) / 10;
//                 end = Math.round((matchTime) / 100) / 10;
//                 len = Math.round((end - start) * 10) / 10;

//                 document.getElementById("matchMineralTimer1").style.display = "none";
//                 document.getElementById("matchMineralTimerPic1").style.display = "none";
//             }
//             matchData.teleop.cycles[matchData.teleop.cycles.length] = {start: start,end: end,length: len,type:'drop'};
            
//             matchData.teleop.count.drop += 1;

//             matchMineralCount -= 1;
//         }
//     }
// }

// function matchMineralTimerCount(){
//     if(document.getElementById("matchMineralTimer1").style.display == "block"){
//         var input = document.getElementById("matchMineralTimer1").innerText;
//         input = Number(input);
//         document.getElementById("matchMineralTimer1").innerText = (input + .1).toFixed(1);
//     }
// }

// function matchFinish(){
//     clearTimeout(matchTimer);

//     setTab('match-5');
// }

// function matchRadioClick(item){
//     var section = String(item).split('-')[0];
//     count = 4;
//     if(section == "matchFinishPark"){
//         count = 3;
//     }
//     for(i = 1; i <= count; i++){
//         if(section + '-' + String(i) != item || section != "matchFinishPark"){
//             document.getElementById(section + '-' + String(i)).classList.remove("active");
//         }
//     }
// }

// function matchSubmit(){
//     var park = (document.getElementById("matchFinishPark-1").classList.contains("active")) ? "park" : (document.getElementById("matchFinishPark-2").classList.contains("active")) ? "parkcomplete" : (document.getElementById("matchFinishPark-3").classList.contains("active")) ? "hang" : ""; 
//     var balls = (document.getElementById("matchRating1-1").classList.contains("active")) ? 1 : (document.getElementById("matchRating1-2").classList.contains("active")) ? 2 : (document.getElementById("matchRating1-3").classList.contains("active")) ? 3 : (document.getElementById("matchRating1-4").classList.contains("active")) ? 4 :  0;
//     var blocks = (document.getElementById("matchRating2-1").classList.contains("active")) ? 1 : (document.getElementById("matchRating2-2").classList.contains("active")) ? 2 : (document.getElementById("matchRating2-3").classList.contains("active")) ? 3 : (document.getElementById("matchRating2-4").classList.contains("active")) ? 4 :  0;
//     var pick = (document.getElementById("matchRating3-1").classList.contains("active")) ? 1 : (document.getElementById("matchRating3-2").classList.contains("active")) ? 2 : (document.getElementById("matchRating3-3").classList.contains("active")) ? 3 : (document.getElementById("matchRating3-4").classList.contains("active")) ? 4 :  0;
//     matchData.post = {park:park,ratings:{balls:balls,block:blocks,pick:pick}};
//     var autoScore = 0;
//     autoScore += (matchData.auto.land.value) ? 30 : 0;
//     autoScore += (matchData.auto.sample.value) ? 25 : 0;
//     autoScore += (matchData.auto.claim.value) ? 15 : 0;
//     autoScore += (matchData.auto.park.value) ? 10 : 0;
//     var teleScore = 0;
//     teleScore += (matchData.teleop.count.lander) * 5;
//     teleScore += (matchData.teleop.count.depot) * 2;
//     var endScore = 0;
//     endScore += (matchData.post.park == "park") ? 10 : (matchData.post.park == "parkcomplete") ? 25 : (matchData.post.park == "hang") ? 50 : 0;
    
//     matchData.match = {times:{length:matchTime,auto:matchAutoTime},score:{auto:autoScore,tele:teleScore,end:endScore,total:autoScore + teleScore + endScore}};
    

//     document.getElementById("matchOutputPredicted").innerText = String(matchData.scouter.prediction);
//     document.getElementById("matchOutputCalculated").innerText = String(matchData.match.score.total);
//     var offby = Math.abs(matchData.match.score.total - matchData.scouter.prediction);
//     var points = 0;
//     if(offby < 50) points = 2;
//     if(offby < 25) points = 5;
//     if(offby < 15) points = 8;
//     if(offby < 5) points = 10;
//     var score = Math.round(3 + points);
//     document.getElementById("matchOutputScouting").innerText = String(score);
    
    

//     if(Number(matchNumber) == 0){
//         var pass = true; 
        
//         if(!matchData.auto.land.value || !matchData.auto.sample.value || !matchData.auto.claim.value || !matchData.auto.park.value) pass = false;
//         if(matchData.teleop.count.lander > 25 || matchData.teleop.count.lander < 19) pass = false;
//         var total = 0;
//         var count = 0;
//         for(c in matchData.teleop.cycles){
// 	        if(matchData.teleop.cycles[c].type == "lander"){
// 		        total += matchData.teleop.cycles[c].length;
//                 count++;
//             }
//         }
//         if(total/count < 2.5 || total/count > 7.0) pass = false;
//         if(matchData.post.park != "hang") pass = false;
        
//         if(pass){
//             saveData({type: "cert", scouter: login.getScouter()});
//             document.getElementById('trainingComplete').innerText = 'Completed Successfully';
//         }else{
//             document.getElementById('trainingComplete').innerText = 'Try again!';
//         }

//         setTab("match-7");
//     }else{
//         saveData({type: "score", score: score, scouter: login.getScouter()});
        
//         saveData(matchData);

//         setTab("match-6");
//     }
// }

// function matchNextMatch(){
//     matchSelectMatch(matchNumber + 1);
// }