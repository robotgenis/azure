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
//matchTele()
//matchMineralClick(action)
//startDC()
//endDC()
//matchFinish()
//matchRadioClick(item)
//matchSubmit()
//matchNextMatch()

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
match.mineral = {count:null,start1:null,start2:null, start:[]};
match.timer = {time:null,timer:null,timerStart:null,autoTime:null};
match.scoringPosition = null;
match.dc = {start: null};
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
            out = teams[i][1];
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
    //Generate Chart
    var html = document.getElementById("match-list-source").innerHTML;
    var outHtml = "";
    var displayMatches = [];
    // if(login.user.security < 3){
    //     for(i in match.matches){
    //         if(match.matches[i][0] < 1){
    //             displayMatches[displayMatches.length] = match.matches[i];
    //         }
    //     }
    // }else{
    //     for(i in match.matches){
    //         if(match.matches[i][0] != 0){
    //             displayMatches[displayMatches.length] = match.matches[i];
    //         }
    //     }
    // }

    for(i in match.matches){
        displayMatches[displayMatches.length] = match.matches[i];
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
    document.getElementById("match-4-breakdown-number").innerHTML = String(match.matchNumber);
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
    document.getElementById("match-4-breakdown-teamName").innerHTML = match.matchTeamName;
    document.getElementById("match-4-breakdown-teamNumber").innerHTML = String(match.matchTeam);
    document.getElementById("match-5-teamName").innerHTML = match.matchTeamName;
    document.getElementById("match-5-teamNumber").innerHTML = String(match.matchTeam);

    document.getElementById("match-2-inputHanging").checked = true;

    document.getElementById("match-2-position-1").style.display = "none";
    document.getElementById("match-2-position-2").style.display = "none";
    document.getElementById("match-2-position-3").style.display = "none";
    document.getElementById("match-2-position-4").style.display = "none";
    
    document.getElementById("match-3-matchTimer").innerHTMl = "0.0";
    
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
}

match.changeScoringPosition = function(){
    
    if(match.startPosition.color == "red"){
        if(match.scoringPosition == "crater"){
            match.scoringPosition = "depot";
            document.getElementById("match-5-position-1").style.display = "block";
            document.getElementById("match-5-position-2").style.display = "none";
        }else{
            match.scoringPosition = "crater";
            document.getElementById("match-5-position-1").style.display = "none";
            document.getElementById("match-5-position-2").style.display = "block";
        }
    }else{
        if(match.scoringPosition == "crater"){
            match.scoringPosition = "depot";
            document.getElementById("match-5-position-4").style.display = "block";
            document.getElementById("match-5-position-3").style.display = "none";
        }else{
            match.scoringPosition = "crater";
            document.getElementById("match-5-position-4").style.display = "none";
            document.getElementById("match-5-position-3").style.display = "block";
        }
    }
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
    document.getElementById("match-4-mineralTimerPic3").style.display = "none";
    document.getElementById("match-4-mineralTimerPic4").style.display = "none";

    document.getElementById("match-5-park-1").classList.remove("active");
    document.getElementById("match-5-park-2").classList.remove("active");
    document.getElementById("match-5-park-3").classList.remove("active");

    document.getElementById("match-5-rating1-1").classList.remove("active");
    document.getElementById("match-5-rating1-2").classList.remove("active");

    document.getElementById("match-5-rating2-1").classList.remove("active");
    document.getElementById("match-5-rating2-2").classList.remove("active");

    document.getElementById("match-5-position-1").style.display = "none";
    document.getElementById("match-5-position-2").style.display = "none";
    document.getElementById("match-5-position-3").style.display = "none";
    document.getElementById("match-5-position-4").style.display = "none";

    match.scoringPosition = "crater";
    if(match.current[1] == match.matchTeam || match.current[2] == match.matchTeam){
        document.getElementById("match-5-position-2").style.display = "block";
    }else{
        document.getElementById("match-5-position-3").style.display = "block";
    }

    match.startHang = document.getElementById("match-2-inputHanging").checked;

    match.mineral.count = 0;

    match.timer.time = 0.0;
    match.timer.timerStart = Date.now();
    match.timer.timer = setInterval(match.matchTimerAdd, 100);

    match.data = {};
    match.data.type = "match";
    var dateTime = new Date();
    var date = (dateTime.getMonth() + 1).toFixed(0) + "/" + (dateTime.getDate()).toFixed(0) + "/" + (dateTime.getFullYear()).toFixed(0);
    var time = (dateTime.getHours()).toFixed(0) + ":" + (dateTime.getMinutes()).toFixed(0) + ":" + (dateTime.getSeconds()).toFixed(0);
    // console.log(date);
    // console.log(time);
    match.data.match = {number: match.matchNumber, teamnum: match.matchTeam, color: match.startPosition.color, date: date, time: time};
    match.data.scouter = login.getScouter();//matchData.scouter = {'username': loginUsername, 'teamnum': loginTeam, 'prediction': Number(document.getElementById("matchInputPrediction").innerText)};
    match.data.scouter.prediction = Number(document.getElementById("match-2-inputPrediction").innerText);
    match.data.auto = {
        position: match.startPosition.position,
        hanging: match.startHanging,
        land:{value:false,time:0.0}, 
        sample:{value:false,time:0.0}, 
        sample2:{value:false, time:0.0},
        claim:{value:false,time:0.0}, 
        park:{value:false,time:0.0}
    };
    match.data.cyclesUngrouped = [];
    match.data.minerals = {count: {lander:0,drop:0}};
    match.data.time = {length:0.0,auto:0.0};
    match.data.disconnect = [];

    setTab('match-3');
}

match.matchTimerAdd = function(){
    match.timer.time = Date.now() - match.timer.timerStart; // milliseconds elapsed since start

    var t = (match.timer.time) / 1000;
    document.getElementById("match-3-matchTimer").innerText = t.toFixed(1);
    document.getElementById("match-4-matchTimer").innerText = t.toFixed(1);
    document.getElementById("match-4-breakdown-matchTimer").innerText = t.toFixed(1);

    if(match.mineral.count >= 1){
        var t = (match.timer.time - match.mineral.start[0]) / 1000;
        document.getElementById("match-4-mineralTimer1").innerText = t.toFixed(1);
    }
    if(match.mineral.count >= 2){
        var t = (match.timer.time - match.mineral.start[1]) / 1000;
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

match.matchTele = function(){
    match.timer.autoTime = match.timer.time;

    setTab('match-4');
}

match.matchMineralClick = function(action){
    if(action == "pick"){
        match.mineral.count += 1;
        match.mineral.start[match.mineral.count - 1] = match.timer.time;
        if(match.mineral.count == 1){
            document.getElementById("match-4-mineralTimer1").innerText = "0.0";
            document.getElementById("match-4-mineralTimer1").style.display = "block";
            document.getElementById("match-4-mineralTimerPic1").style.display = "block";
        }else if(match.mineral.count == 2){
            document.getElementById("match-4-mineralTimer2").innerText = "0.0";
            document.getElementById("match-4-mineralTimer2").style.display = "block";
            document.getElementById("match-4-mineralTimerPic2").style.display = "block";
        }else if(match.mineral.count == 3){
            document.getElementById("match-4-mineralTimerPic3").style.display = "block";
        }else if(match.mineral.count == 4){
            document.getElementById("match-4-mineralTimerPic4").style.display = "block";
        }
    }else if(action == "scorelander"){
        if(match.mineral.count > 0){
            var start = Math.round(match.mineral.start[0] / 100) / 10;
            var end = Math.round((match.timer.time) / 100) / 10;
            var len = Math.round((end - start) * 10) / 10;

            match.data.cyclesUngrouped[match.data.cyclesUngrouped.length] = {pick: start,place: end,length: len,type:'lander'};
            
            match.data.minerals.count.lander += 1;

            for(i = 1; i < match.mineral.count; i++){
                match.mineral.start[i - 1] = match.mineral.start[i];
            }
            
            match.mineral.count -= 1;

            if(match.mineral.count == 3){
                document.getElementById("match-4-mineralTimerPic4").style.display = "none";
            }else if(match.mineral.count == 2){
                document.getElementById("match-4-mineralTimerPic3").style.display = "none";
            }else if(match.mineral.count == 1){
                document.getElementById("match-4-mineralTimer2").style.display = "none";
                document.getElementById("match-4-mineralTimerPic2").style.display = "none";
            }else if(match.mineral.count == 0){
                document.getElementById("match-4-mineralTimer1").style.display = "none";
                document.getElementById("match-4-mineralTimerPic1").style.display = "none";
            }

            if(match.mineral.count > 1){
                var t = (match.timer.time - match.mineral.start[1]) / 1000;
                document.getElementById("match-4-mineralTimer1").innerText = t.toFixed(1);
            }
            if(match.mineral.count > 1){
                var t = (match.timer.time - match.mineral.start[0]) / 1000;
                document.getElementById("match-4-mineralTimer1").innerText = t.toFixed(1);
            }
        }
    }else if(action == "drop"){
        if(match.mineral.count > 0){
            var start = Math.round(match.mineral.start[0] / 100) / 10;
            var end = Math.round((match.timer.time) / 100) / 10;
            var len = Math.round((end - start) * 10) / 10;

            match.data.cyclesUngrouped[match.data.cyclesUngrouped.length] = {pick: start,place: end,length: len,type:'drop'};
            
            match.data.minerals.count.drop += 1;

            for(i = 1; i < match.mineral.count; i++){
                match.mineral.start[i - 1] = match.mineral.start[i];
            } 
            
            match.mineral.count -= 1;

            if(match.mineral.count == 3){
                document.getElementById("match-4-mineralTimerPic4").style.display = "none";
            }else if(match.mineral.count == 2){
                document.getElementById("match-4-mineralTimerPic3").style.display = "none";
            }else if(match.mineral.count == 1){
                document.getElementById("match-4-mineralTimer2").style.display = "none";
                document.getElementById("match-4-mineralTimerPic2").style.display = "none";
            }else if(match.mineral.count == 0){
                document.getElementById("match-4-mineralTimer1").style.display = "none";
                document.getElementById("match-4-mineralTimerPic1").style.display = "none";
            }

            if(match.mineral.count > 1){
                var t = (match.timer.time - match.mineral.start[1]) / 1000;
                document.getElementById("match-4-mineralTimer1").innerText = t.toFixed(1);
            }
            if(match.mineral.count > 1){
                var t = (match.timer.time - match.mineral.start[0]) / 1000;
                document.getElementById("match-4-mineralTimer1").innerText = t.toFixed(1);
            }
        }
    }
}

match.startDC = function(){
    match.dc.start = match.timer.time;

    setTab('match-4-breakdown');
}

match.endDC = function(){
    var start = match.dc.start;
    var end = match.timer.time;
    var length =  end - start;
    match.data.disconnect[match.data.disconnect.length] = {start: start, end: end, length: length};

    setTab('match-4');
}

// function matchMineralTimerCount(){
//     if(document.getElementById("matchMineralTimer1").style.display == "block"){
//         var input = document.getElementById("matchMineralTimer1").innerText;
//         input = Number(input);
//         document.getElementById("matchMineralTimer1").innerText = (input + .1).toFixed(1);
//     }
// }

match.matchFinish = function(){
    clearTimeout(match.timer.timer);

    var t = (match.timer.time) / 1000;
    document.getElementById("match-5-matchTimer").innerText = t.toFixed(1);

    setTab('match-5');
}

match.matchRadioClick = function(item){
    var section = String(item).split('-')[2];
    count = 2;
    if(section == "park"){
        count = 3;
    }
    for(i = 1; i <= count; i++){
        if("match-5-" + section + '-' + String(i) != item || section != "park"){
            document.getElementById("match-5-" + section + '-' + String(i)).classList.remove("active");
        }
    }
}

match.matchSubmit = function(){
    var park = (document.getElementById("match-5-park-1").classList.contains("active")) ? "park" : (document.getElementById("match-5-park-2").classList.contains("active")) ? "parkcomplete" : (document.getElementById("match-5-park-3").classList.contains("active")) ? "hang" : ""; 
    var defended = (document.getElementById("match-5-rating1-1").classList.contains("active")) ? false : (document.getElementById("match-5-rating1-2").classList.contains("active")) ? 2 :  true;
    var defender = (document.getElementById("match-5-rating2-1").classList.contains("active")) ? false : (document.getElementById("match-5-rating2-2").classList.contains("active")) ? 2 :  true;
    match.data.post = {park:park,path:match.scoringPosition,ratings:{defender:defender,defended:defended}};
    var autoScore = 0;
    autoScore += (match.data.auto.land.value) ? 30 : 0;
    autoScore += (match.data.auto.sample.value) ? 25 : 0;
    autoScore += (match.data.auto.sample2.value) ? 25 : 0;
    autoScore += (match.data.auto.claim.value) ? 15 : 0;
    autoScore += (match.data.auto.park.value) ? 10 : 0;
    var teleScore = 0;
    teleScore += (match.data.minerals.count.lander) * 5;
    var endScore = 0;
    endScore += (match.data.post.park == "park") ? 10 : (match.data.post.park == "parkcomplete") ? 25 : (match.data.post.park == "hang") ? 50 : 0;
    
    match.data.time = {length:match.timer.time,auto:match.timer.autoTime};
    match.data.score = {auto:autoScore,tele:teleScore,end:endScore,total:autoScore + teleScore + endScore};

    document.getElementById("matchOutputPredicted").innerText = String(match.data.scouter.prediction);
    document.getElementById("matchOutputCalculated").innerText = String(match.data.score.total);
    var offby = Math.abs(match.data.score.total - match.data.scouter.prediction);
    var points = 0;
    if(offby < 50) points = 2;
    if(offby < 25) points = 5;
    if(offby < 15) points = 8;
    if(offby < 5) points = 10;
    var score = Math.round(3 + points);
    document.getElementById("matchOutputScouting").innerText = String(score);
    
    
    //If training match
    // if(Number(matchNumber) == 0){
    //     var pass = true; 
        
    //     if(!matchData.auto.land.value || !matchData.auto.sample.value || !matchData.auto.claim.value || !matchData.auto.park.value) pass = false;
    //     if(matchData.teleop.count.lander > 25 || matchData.teleop.count.lander < 19) pass = false;
    //     var total = 0;
    //     var count = 0;
    //     for(c in matchData.teleop.cycles){
	//         if(matchData.teleop.cycles[c].type == "lander"){
	// 	        total += matchData.teleop.cycles[c].length;
    //             count++;
    //         }
    //     }
    //     if(total/count < 2.5 || total/count > 7.0) pass = false;
    //     if(matchData.post.park != "hang") pass = false;
        
    //     if(pass){
    //         saveData({type: "cert", scouter: login.getScouter()});
    //         document.getElementById('trainingComplete').innerText = 'Completed Successfully';
    //     }else{
    //         document.getElementById('trainingComplete').innerText = 'Try again!';
    //     }

    //     setTab("match-7");
    // }else{
        submit.saveData({type: "score", score: score, scouter: login.getScouter()});
        
        submit.saveData(match.data);

        setTab("match-6");
    //}
}

match.matchNextMatch = function(){
    match.selectMatch(match.matchNumber + 1);
}