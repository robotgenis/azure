var dashMatchesHTML = null;
var dashData = null;
var dashSel = null;

function openDashboard(){
    refreshDashboard();

    dashSetTab('dashTeamTab');
    setTab('dashboard');
}

function dashSetTab(name){
    var ele = document.getElementsByClassName('dashtab');
    for(i = 0; i < ele.length; i++){
        ele[i].style.display = "none";
    }
    document.getElementById(name).style.display = "block";
}

function loadDashboard(){
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

    var html = document.getElementById('dashTeams').innerHTML;
    var outHtml = "";
    for(i in teams){
        add = html;

        add = add.replace(/00001/g, teams[i][0] + " - " + teams[i][1]);

        outHtml += add;
    }
    document.getElementById('dashTeams').innerHTML = outHtml;

    refreshDashboard();

    google.charts.load("current", {packages:['corechart','table']});
    // google.charts.load('current', {packages:['table']});
    google.charts.setOnLoadCallback(drawChart);

    document.getElementById('dashTeams').value = String(teams[0][0]) + " - " + String(teams[0][1]);
}

function refreshDashboard(){
    $.get('get', function(data) {
        var arr = JSON.parse(data);
        for(i in arr){
            arr[i] = JSON.parse(arr[i][0]);
        }
        dashData = arr;

        if(dashMatchesHTML == null){
            dashMatchesHTML = document.getElementById("dashboardMatches").innerHTML;
        }

        var html = dashMatchesHTML;
        var outHtml = "";
        for(match in matches){
            add = html;
            add = add.replace(/99/g, matches[match][0]);
            add = add.replace(/00001/g, matches[match][1]);
            add = add.replace(/00002/g, matches[match][2]);
            add = add.replace(/00003/g, matches[match][3]);
            add = add.replace(/00004/g, matches[match][4]);
            
            for(i in dashData){
                if(dashData[i].number == Number(matches[match][0])){
                    // console.log(dashData[i].team);
                    // console.log(matches[match][1]);
                    // console.log(Number(dashData[i].team) == matches[match][1]);
                    if(Number(dashData[i].team) == matches[match][1]){
                        add = add.replace(/text1/g, 'text-success');
                    }
                    if(Number(dashData[i].team) == matches[match][2]){
                        add = add.replace(/text2/g, "text-success");
                    }
                    if(Number(dashData[i].team) == matches[match][3]){
                        add = add.replace(/text3/g, "text-success");
                    }
                    if(Number(dashData[i].team) == matches[match][4]){
                        add = add.replace(/text4/g, "text-success");
                    }
                }
            }

            add = add.replace(/text1/g, "text-danger");
            add = add.replace(/text2/g, "text-danger");
            add = add.replace(/text3/g, "text-danger");
            add = add.replace(/text4/g, "text-danger");

            outHtml += add;
        }
        document.getElementById("dashboardMatches").innerHTML = outHtml;

        $("select").on("change", function(e) {
            var sel = document.getElementById('dashTeams').value;
            dashSelectTeam(sel.split(' - ')[0]);
        });

        var sel = document.getElementById('dashTeams').value;
        //dashSelectTeam(sel.split(' - ')[0]);
        dashSelectTeam('5029');
    });
}

function dashSelectTeam(teamnum){
    dashSel = [];
    for(i in dashData){
        if(dashData[i].team == teamnum){
            dashSel[dashSel.length] = dashData[i];
        }
    }
    for(i = 0; i < dashSel.length - 1; i++){
        for(s = i + 1; s < dashSel.length; s++){
            if(dashSel[s].number < dashSel[i].number){
                var temp = dashSel[s];
                dashSel[s] = dashSel[i];
                dashSel[i] = temp;
            }
        }
    }
    mat = "";
    for(i in dashSel){
        if(mat != "") mat += " ,";
        mat += dashSel[i].number;
    }

    drawChart();
}

function drawChart() {
    //info

    document.getElementById('dashNumMatches').innerText = String(dashSel.length);

    document.getElementById('dashMatchesScouted').innerText = mat;

    //Scores
    var totalScore = 0;
    var highestScore = 0;
    for(c in dashSel){
        totalScore += dashSel[c].match.score.total;
        if(dashSel[c].match.score.total > highestScore){
            highestScore = dashSel[c].match.score.total;
        }
    }

    document.getElementById('dashAverageScore').innerText = (totalScore / dashSel.length).toFixed(2); 
    document.getElementById('dashMaxScore').innerText = highestScore.toFixed(0);

    var theoryMaxScore = 0;    

    //auto
    var land = 0;
    var sample = 0;
    var claim = 0
    var park = 0;
    var maxAutoPoints = 0;
    for(i in dashSel){
        land += (dashSel[i].auto.land.value) ? 1 : 0;
        sample += (dashSel[i].auto.sample.value) ? 1 : 0;
        claim += (dashSel[i].auto.claim.value) ? 1 : 0;
        park += (dashSel[i].auto.park.value) ? 1 : 0;
        var points = 0;
        points += (dashSel[i].auto.land.value) ? 30 : 0;
        points += (dashSel[i].auto.sample.value) ? 25 : 0;
        points += (dashSel[i].auto.claim.value) ? 15 : 0;
        points += (dashSel[i].auto.park.value) ? 10 : 0;
        if(points > maxAutoPoints){
            maxAutoPoints = points;
        }
    }

    var autoPoints = (land * 30) + (sample  * 25) + (claim * 15) + (park  * 10);
    autoPoints = autoPoints / dashSel.length;
    document.getElementById('dashAutoPoints').innerText = autoPoints.toFixed(2);
    document.getElementById('dashAutoPointsMax').innerText = maxAutoPoints.toFixed(0);
    theoryMaxScore += maxAutoPoints;

    land = (dashSel.length > 0) ? (land / dashSel.length * 100).toFixed(0) + "%" : NaN;
    sample = (dashSel.length > 0) ? (sample / dashSel.length * 100).toFixed(0) + "%" : NaN;
    claim = (dashSel.length > 0) ? (claim / dashSel.length * 100).toFixed(0) + "%" : NaN;
    park = (dashSel.length > 0) ? (park / dashSel.length * 100).toFixed(0) + "%" : NaN;

    document.getElementById('dashLandPer').innerText = land;
    document.getElementById('dashSamplePer').innerText = sample;
    document.getElementById('dashClaimPer').innerText = claim;
    document.getElementById('dashParkPer').innerText = park;



    //teleOp

    //cycles
    var arr = [];
    var averageCycles = [["Round", {type: 'string', role: 'tooltip'} , "Cycle Time", { role: "style" } ]];
    var bestCycleAverage = 120;

    for(i = 0; i < dashSel.length; i++){
        var cycleCount = 1;

        var cycleCountPlace = 0;
        var cycleCountPick = 0;
        var totalMinerals = 0;
        var totalLengthPlace = 0;
        var totalLengthPick = 0;
        for(c = 0; c < dashSel[i].teleop.cycles.length; c++){
            cycles = dashSel[i].teleop.cycles;
            arr[arr.length] = [String(dashSel[i].number), String(cycleCount), cycles[c].type, 1, cycles[c].length, null];
            if(c + 1 < cycles.length){
                arr[arr.length - 1] = [String(dashSel[i].number), String(cycleCount), cycles[c].type, 1, cycles[c].length, cycles[c + 1].start - cycles[c].start];
                if(cycles[c + 1].start < cycles[c].end && cycles[c+1].type == cycles[c].type){
                    arr[arr.length - 1] = [String(dashSel[i].number), String(cycleCount), cycles[c].type, 2, cycles[c+1].end - cycles[c].start, null];
                    if(c + 2 < cycles.length){
                        arr[arr.length - 1] = [String(dashSel[i].number), String(cycleCount), cycles[c].type, 2, cycles[c+1].end - cycles[c].start, cycles[c + 2].start - cycles[c].start]
                    }
                    c++;
                }
            }
            cycleCount++;
            
            cycleCountPlace++;
            totalMinerals += arr[arr.length - 1][3];
            totalLengthPlace += arr[arr.length - 1][4];
            totalLengthPick += arr[arr.length - 1][5];
            if(arr[arr.length - 1][5] != null){
                cycleCountPick++;
            }
        }
        arr[arr.length] = [String(dashSel[i].number), 'Average', ,totalMinerals/cycleCountPlace, totalLengthPlace/cycleCountPlace, totalLengthPick/cycleCountPick];
        averageCycles[averageCycles.length] = [String(dashSel[i].number), 'Match' + String(dashSel[i].number), totalLengthPick/cycleCountPick, "#FF0000"];

        if(bestCycleAverage > totalLengthPick/cycleCountPick){
            bestCycleAverage = totalLengthPick/cycleCountPick;
        }
    }

    var cycleCountPlace = 0;
    var cycleCountPick = 0;
    var totalMinerals = 0;
    var totalLengthPlace = 0;
    var totalLengthPick = 0;

    for(i = 0; i < arr.length; i++){
        if(arr[i][2] != 'Average'){
            cycleCountPlace++;
            totalMinerals += arr[i][3];
            totalLengthPlace += arr[i][4];
            totalLengthPick += arr[i][5];
            if(arr[i][5] != null){
                cycleCountPick++;
            }
        }
    }


    var len = arr.length;
    for(i = len - 1; i >= 0; i--){
        arr[i + 1] = arr[i];
    }
    arr[0] = ['All Match', 'Average', ,totalMinerals/cycleCountPlace, totalLengthPlace/cycleCountPlace, totalLengthPick/cycleCountPick];

    document.getElementById('dashAverageCycleTime').innerText = (totalLengthPick/cycleCountPick).toFixed(2);
    document.getElementById('dashBestAverageCycleTime').innerText = bestCycleAverage.toFixed(2);

    document.getElementById('dashTheoryMineralsScore').innerText = (100/(totalLengthPick/cycleCountPick) * 2).toFixed(0);
    document.getElementById('dashTheoryMaxMineralsScore').innerText = (100/bestCycleAverage * 2).toFixed(0);

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Match');
    data.addColumn('string', 'Cycle');
    data.addColumn('string', 'Type');
    data.addColumn('number', 'minerals');
    data.addColumn('number', 'pickup-place sec');
    data.addColumn('number', 'pickup-next pickup sec');
        

    data.addRows(arr);
    for(i = 0; i < arr.length; i++){
        var s = (arr[i][3] - 1) * 100 / 1 + 155;
        data.setProperty(i, 3, 'style', 'background-color: rgb(' + String(255 - s)  + ',' + String(s) + ',0);');
        var s = Math.abs(Math.round(arr[i][4] * 255 / 30));
        data.setProperty(i, 4, 'style', 'background-color: rgb(' + String(s)  + ',' + String(255 - s) + ',0);');

        if(arr[i][5] != null){
            var s = Math.round(arr[i][5] * 255 / 30);
            data.setProperty(i, 5, 'style', 'background-color: rgb(' + String(s)  + ',' + String(255 - s) + ',0);');
        }
    }
    
    var table = new google.visualization.Table(document.getElementById('dashChartCycles'));

    table.draw(data, {allowHtml: true, showRowNumber: false, width: '100%', height: '100%'});


    var data = google.visualization.arrayToDataTable(averageCycles);
    var view = new google.visualization.DataView(data);

    var options = {
        title: "Average Cycle Times - Pickup to next cycle pickup",
        width: "95%",
        height: 400,
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
        vAxes: {
            0: {
                title: 'Cycle Times (seconds)',
                viewWindow: {
                    min: 0,
                    max: 30
                }
            }   
        },
        hAxes: {
            0: {title: 'Round Number'},
        }
    };
    var chart = new google.visualization.ColumnChart(document.getElementById("dashChartCycleTimes"));
    chart.draw(view, options);

    var minerals = [["Round", {type: 'string', role: 'tooltip'} , "Mineral Count", { role: "style" } ]];
    var mineralsScored = 0;
    var matchCount = 0;
    var maxMineralsScored = 0;

    for(i in dashSel){
        minerals[minerals.length] = [String(dashSel[i].number), 'Match' + String(dashSel[i].number), dashSel[i].teleop.count.lander, "#00FF00"];
        mineralsScored += dashSel[i].teleop.count.lander;
        matchCount++;
        if(dashSel[i].teleop.count.lander > maxMineralsScored){
            maxMineralsScored = dashSel[i].teleop.count.lander;
        }
    }

    document.getElementById('dashMineralsAverage').innerText = (matchCount > 0) ? (mineralsScored/matchCount).toFixed(2) : "NaN";
    document.getElementById('dashMineralsAveragePoints').innerText = (matchCount > 0) ? (mineralsScored/matchCount * 5).toFixed(2) : "NaN";

    document.getElementById('dashMaxMineralsAverage').innerText = (maxMineralsScored).toFixed(0);
    document.getElementById('dashMaxMineralsAveragePoints').innerText = (maxMineralsScored * 5).toFixed(0);

    theoryMaxScore += maxMineralsScored * 5;

    var data = google.visualization.arrayToDataTable(minerals);
    var view = new google.visualization.DataView(data);

    var options = {
        title: "Minerals in Lander",
        width: "95%",
        height: 400,
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
        vAxes: {
            0: {
                title: 'Number of Minerals',
                viewWindow: {
                    min: 0,
                    max: 40
                }
            }   
        },
        hAxes: {
            0: {title: 'Round Number'},
        }
    };
    var chart = new google.visualization.ColumnChart(document.getElementById("dashChartMinerals"));
    chart.draw(view, options);

    //end game

    var hang = [["Round" , "Hang", { role: "style" } ]];
    var count = 0;
    var maxPoints = 0;
    var totalPoints = 0;

    for(c in dashSel){
        hang[hang.length] = [String(dashSel[i].number), (dashSel[i].post.park == 'hang') ? 3 : (dashSel[i].post.park == 'park') ? 2 : (dashSel[i].post.park == 'parkcomplete') ? 1 : 0, "#00FF00"];
        count++;
        var add = (dashSel[i].post.park == 'hang') ? 50 : (dashSel[i].post.park == 'park') ? 25 : (dashSel[i].post.park == 'parkcomplete') ? 10 : 0;
        totalPoints += add;
        if(add > maxPoints){
            maxPoints = add;
        }
    }

    document.getElementById('dashEndPoints').innerText = (count > 0) ? String(totalPoints/count) : "NaN";
    document.getElementById('dashEndPointsMax').innerText = String(maxPoints);
    theoryMaxScore += maxPoints;

    var data = google.visualization.arrayToDataTable(hang);
    var view = new google.visualization.DataView(data);

    var options = {
        title: "End Game Position, 3=hang, 2=parkcompelte, 1=park",
        width: "95%",
        height: 400,
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
        vAxes: {
            0: {
                title: 'Park Position',
                viewWindow: {
                    min: 0,
                    max: 3
                }
            }   
        },
        hAxes: {
            0: {title: 'Round Number'},
        }
    };

    var chart = new google.visualization.ColumnChart(document.getElementById("dashChartHang"));
    chart.draw(view, options);

    document.getElementById('dashTheoryMaxScore').innerText = theoryMaxScore.toFixed(0);
}