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
        dashSelectTeam(sel.split(' - ')[0]);
        
    });
}

function dashSelectTeam(teamnum){
    dashSel = [];
    mat = "";
    for(i in dashData){
        if(dashData[i].team == teamnum){
            dashSel[dashSel.length] = dashData[i];
            if(mat != "") mat += " ,";
            mat += dashSel[dashSel.length - 1].number;
        }
    }
    //info

    document.getElementById('dashNumMatches').innerText = String(dashSel.length);

    document.getElementById('dashMatchesScouted').innerText = mat;

    //auto
    var land = 0;
    var sample = 0;
    var claim = 0
    var park = 0;
    for(i in dashSel){
        land += (dashSel[i].auto.land.value) ? 1 : 0;
        sample += (dashSel[i].auto.sample.value) ? 1 : 0;
        claim += (dashSel[i].auto.claim.value) ? 1 : 0;
        park += (dashSel[i].auto.park.value) ? 1 : 0;
    }

    land = (dashSel.length > 0) ? (land / dashSel.length * 100).toFixed(0) + "%" : NaN;
    sample = (dashSel.length > 0) ? (sample / dashSel.length * 100).toFixed(0) + "%" : NaN;
    claim = (dashSel.length > 0) ? (claim / dashSel.length * 100).toFixed(0) + "%" : NaN;
    park = (dashSel.length > 0) ? (park / dashSel.length * 100).toFixed(0) + "%" : NaN;

    document.getElementById('dashLandPer').innerText = land;
    document.getElementById('dashSamplePer').innerText = sample;
    document.getElementById('dashClaimPer').innerText = claim;
    document.getElementById('dashParkPer').innerText = park;

    //teleOp

    drawChart();
}

function drawChart() {
    //Cycle times
    var arr = [["Round", "Cycle Time", { role: "style" } ]];
    var color = 0;
    for(i = 0; i < dashSel.length; i++){
        var landerCycles = false;
        for(c = 0; c < dashSel[i].teleop.cycles.length; c++){
            if(dashSel[i].teleop.cycles[c].type == "lander"){
                arr[arr.length] = [String(dashSel[i].number), dashSel[i].teleop.cycles[c].length, (color == 0) ? "#FFD827" : "#FFAD27"];
                landerCycles = true;
            }
        }
        if(landerCycles)
            color = (color == 0) ? 1 : 0;
        // console.log(color);
    }
    var data = google.visualization.arrayToDataTable(arr);
    var view = new google.visualization.DataView(data);
        view.setColumns([0, 1,
        { calc: "stringify",
        sourceColumn: 1,
        type: "string",
        role: "annotation" },
        2]);
    var options = {
        title: "Lander Cycles - One mineral at a time",
        width: "100%",
        height: 400,
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
        vAxes: {
            0: {title: 'Cycle Times (seconds)'},
        },
        hAxes: {
            0: {title: 'Round Number'},
        }
    };
    var chart = new google.visualization.ColumnChart(document.getElementById("dashChartCycleTimes"));
    chart.draw(view, options);

    var arr = [];

    for(i = 0; i < dashSel.length; i++){
        var cycleCount = 1;
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
        }
    }

    var cycleCount = 0;
    var cycleCount2 = 0;
    var totalMinerals = 0;
    var totalLength1 = 0;
    var totalLength2 = 0;

    for(i = 0; i < arr.length; i++){
        cycleCount++;
        totalMinerals += arr[i][3];
        totalLength1 += arr[i][4];
        totalLength2 += arr[i][5];
        if(arr[i][5] != null){
            cycleCount2++;
        }
    }


    var len = arr.length;
    for(i = len - 1; i >= 0; i--){
        arr[i + 1] = arr[i];
    }
    arr[0] = ['Average', , ,totalMinerals/cycleCount, totalLength1/cycleCount, totalLength2/cycleCount2]

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Match');
    data.addColumn('string', 'Cycle');
    data.addColumn('string', 'Type');
    data.addColumn('number', 'minerals');
    data.addColumn('number', 'pickup-place sec');
    data.addColumn('number', 'pickup-next pickup sec');
        

    data.addRows(arr);
    for(i = 0; i < arr.length; i++){
        var s = Math.abs(Math.round(arr[i][4] * 255 / 30));
        data.setProperty(i, 4, 'style', 'background-color: rgb(' + String(s)  + ',' + String(255 - s) + ',0);');
        var s = (arr[i][3] - 1) * 255 / 1;
        data.setProperty(i, 3, 'style', 'background-color: rgb(' + String(255 - s)  + ',' + String(s) + ',0);');
        if(arr[i][5] != null){
            var s = Math.round(arr[i][5] * 255 / 30);
            data.setProperty(i, 5, 'style', 'background-color: rgb(' + String(s)  + ',' + String(255 - s) + ',0);');
        }
    }
    

    var table = new google.visualization.Table(document.getElementById('dashChartCycles'));

    table.draw(data, {allowHtml: true, showRowNumber: false, width: '100%', height: '100%'});
}