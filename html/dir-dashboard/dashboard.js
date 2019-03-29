//NAME=dash

//FUNCTIONS
//refreshDash()
//openDash()
//setDash(address)
//dashTeamsSelect()
//dashSelectMatch(matchnum)
//dashMatchSelectTeam(index)
//isMatchScouted(matchnum, teamnum)
//getTeamData(teamnum)
//getTeamMatches(teamnum)
//getTeamRanking(teamnum)
//getGroupedCycles(teamnum)
//math.average([num, num, num])
//math.standardDeviation([num, num, num])


var dash = {};
dash.math = {};
dash.data = {src: null, ranking: null, record: null};
dash.history = [];
dash.history_index = 0;
dash.matchteams = null;


function ordinal_suffix_of(num) {
    var jj = num % 10,
        kk = num % 100;
    if (jj == 1 && kk != 11) {
        return num + "st";
    }
    if (jj == 2 && kk != 12) {
        return num + "nd";
    }
    if (jj == 3 && kk != 13) {
        return num + "rd";
    }
    return num + "th";
}

function get_color_format(value, min, max){
    var scale = (value - min) / (max - min);
    scale *= 510;
    r = (scale < 255) ? scale : 255;
    g = (510 - scale < 255) ? 510 - scale : 255;
    return "RGB(" + String(r) + ", " + String(g) + ", 0)";
}

dash.refreshDash = function(){
    dash.data.ranking = [];
    for(i = 0; i < teams.length; i++){
        var teamData = dash.getTeamData(teams[i][0]);

        var autoPoints = [];
        var telePoints = [];
        var cycleTime = [];
        var endPoints = [];
        var hangTime = [];
        var points = [];
        
        for(k in teamData){
            autoPoints[autoPoints.length] = teamData[k].score.auto;
            telePoints[telePoints.length] = teamData[k].score.tele;
            endPoints[endPoints.length] = teamData[k].score.end;
            if(teamData[k].post.park == "hang"){
                hangTime[hangTime.length] = ((teamData[k].time.length) / 1000 - teamData[k].cyclesUngrouped[teamData[k].cyclesUngrouped.length - 1].place);
            }
            points[points.length] = teamData[k].score.total;
        }

        var cycles = dash.getGroupedCycles(teams[i][0]);

        for(k in cycles){
            cycleTime[cycleTime.length] = cycles[k].cycletime;
        }

        dash.data.ranking[i] = {
            team: teams[i][0],
            autoPoints:{value:dash.math.average(autoPoints),rank:null,rank_str:null},
            autoDeviation:{value:dash.math.standardDeviation(autoPoints),rank:null,rank_str:null},
            telePoints:{value:dash.math.average(telePoints),rank:null,rank_str:null},
            teleDeviation:{value:dash.math.standardDeviation(telePoints),rank:null,rank_str:null},
            cycleTime:{value:dash.math.average(cycleTime),rank:null,rank_str:null},
            cycleDeviation:{value:dash.math.standardDeviation(cycleTime),rank:null,rank_str:null},
            endPoints:{value:dash.math.average(endPoints),rank:null,rank_str:null},
            endDeviation:{value:dash.math.standardDeviation(endPoints),rank:null,rank_str:null},
            hangTime:{value:dash.math.average(hangTime),rank:null,rank_str:null},
            hangDeviation:{value:dash.math.standardDeviation(hangTime),rank:null,rank_str:null},
            points:{value:dash.math.average(points),rank:null,rank_str:null},
            pointsDeviation:{value:dash.math.standardDeviation(points),rank:null,rank_str:null}
        }
    }

    for(t in dash.data.ranking[0]){
        if(t != 'team'){
            if(t == "autoDeviation" || t == "teleDeviation" || t == "endDeviation" || t == "pointsDeviation" || t == "cycleDeviation" || t == "hangDeviation"){
                var max = dash.data.ranking.length;
                for(i = 0; i < max; i++){
                    for(k = i + 1; k < max; k++){
                        if(dash.data.ranking[i][t].value > dash.data.ranking[k][t].value){
                            var temp = dash.data.ranking[i];
                            dash.data.ranking[i] = dash.data.ranking[k];
                            dash.data.ranking[k] = temp;
                        }
                    }
                
                    dash.data.ranking[i][t].rank = i + 1;

                    if(i > 0){
                        if(dash.data.ranking[i][t].value == dash.data.ranking[i - 1][t].value){
                            dash.data.ranking[i][t].rank = dash.data.ranking[i - 1][t].rank;
                        }
                    }

                    dash.data.ranking[i][t].rank_str = ordinal_suffix_of(dash.data.ranking[i][t].rank);
                }
            }else{
                var max = dash.data.ranking.length;
                for(i = 0; i < max; i++){
                    for(k = i + 1; k < max; k++){
                        if(dash.data.ranking[i][t].value < dash.data.ranking[k][t].value){
                            var temp = dash.data.ranking[i];
                            dash.data.ranking[i] = dash.data.ranking[k];
                            dash.data.ranking[k] = temp;
                        }
                    }
                
                    dash.data.ranking[i][t].rank = i + 1;

                    if(i > 0){
                        if(dash.data.ranking[i][t].value == dash.data.ranking[i - 1][t].value){
                            dash.data.ranking[i][t].rank = dash.data.ranking[i - 1][t].rank;
                        }
                    }

                    dash.data.ranking[i][t].rank_str = ordinal_suffix_of(dash.data.ranking[i][t].rank);
                }
            }
            
        }
    }
    //console.log(t, dash.data.ranking);

    var html = document.getElementById("dash-1-teams-src").innerHTML;

    var outHTML = "";
    for(i in teams){
        add = html;

        add = add.replace(/00001/g, teams[i][0]);
        add = add.replace(/name1/g, teams[i][1]);

        outHTML += add;
    }
    document.getElementById("dash-1-teams").innerHTML = outHTML;

    var html = document.getElementById("dash-2-match-src").innerHTML;
    
    outHTML = "";
    for(i in match.matches){
        add = html;
        add = add.replace(/99/g, match.matches[i][0]);
        add = add.replace(/00001/g, match.matches[i][1]);
        add = add.replace(/00002/g, match.matches[i][2]);
        add = add.replace(/00003/g, match.matches[i][3]);
        add = add.replace(/00004/g, match.matches[i][4]);
        add = add.replace(/text1/g, (dash.isMatchScouted(match.matches[i][0], match.matches[i][1])) ? "text-success" : "text-danger");
        add = add.replace(/text2/g, (dash.isMatchScouted(match.matches[i][0], match.matches[i][2])) ? "text-success" : "text-danger");
        add = add.replace(/text3/g, (dash.isMatchScouted(match.matches[i][0], match.matches[i][3])) ? "text-success" : "text-danger");
        add = add.replace(/text4/g, (dash.isMatchScouted(match.matches[i][0], match.matches[i][4])) ? "text-success" : "text-danger");

        
        outHTML += add;
    }

    document.getElementById("dash-2-match").innerHTML = outHTML;
}

dash.openDash = function(){
    dash.setDash("teams");
    setTab("dashboard");    
}

dash.setDash = function(address){
    address = String(address);
    dash.history[dash.history.length] = address;
    dash.history_index = dash.history.length - 1;

    var item = (address.includes("?")) ? address.split("?")[1] : null;
    address = (item != null) ? address.split("?")[0] : address;
    var subsection = (address.includes("/")) ? address.split("/")[1] : null;
    var section = (subsection != null) ? address.split("/")[0] : address;

    console.log(section + "/" + subsection + "?" + item);

    if(section == "teams"){
        $('#dash-tab-teams-bar').trigger('click');

        if(item == null){
            document.getElementById("dash-1-section").style.display = "none";
        }else{
            var teamnum = item;
            var matchData = dash.getTeamData(teamnum);
            var matches = dash.getTeamMatches(teamnum);
            var ranking = dash.getTeamRanking(teamnum);
            var cycles = dash.getGroupedCycles(teamnum);

            document.getElementById("dash-1-team").innerText = teamnum + " - " + match.getTeamName(teamnum);

            //matches
            var html = document.getElementById("dash-1-matches-src").innerHTML;


            var outHTML = "";
            for(i in matches){
                var add = html;
                
                add = add.replace(/99/g, matches[i][0]);

                var scouted = false;
                for(k in matchData){
                    if(matchData[k].match.number == matches[i][0]){
                        scouted = true;
                    }
                }

                if(!scouted){
                    add = add.replace(/success/g, "danger");
                }

                outHTML += add;
            }
            document.getElementById("dash-1-matches").innerHTML = outHTML;

            //Auto
            var data = new google.visualization.DataTable();
            data.addColumn('string','');
            data.addColumn('boolean', 'Land');
            data.addColumn('boolean', 'Sample');
            data.addColumn('boolean', 'Claim');
            data.addColumn('boolean', 'Park');
            data.addColumn('number', '');

            for(i = 0; i < matchData.length; i++){
                var land = matchData[i].auto.land.value;
                var sample = matchData[i].auto.sample.value;
                var claim = matchData[i].auto.claim.value;
                var park = matchData[i].auto.park.value;
                var score = matchData[i].score.auto;
                var score_color = get_color_format(score, 0, 80);
                data.addRow([String(matchData[i].match.number) + "-" + ((matchData[i].auto.position == "crater") ? "C" : "D"), land, sample, claim, park, score]);
                data.setProperty(i, 0, 'style', 'text-align: right;');
                data.setProperty(i, 1, 'style', (land) ? 'background-color: RGB(0,255,0);' : 'background-color: RGB(255,0,0);');
                data.setProperty(i, 2, 'style', (sample) ? 'background-color: RGB(0,255,0);' : 'background-color: RGB(255,0,0);');
                data.setProperty(i, 3, 'style', (claim) ? 'background-color: RGB(0,255,0);' : 'background-color: RGB(255,0,0);');
                data.setProperty(i, 4, 'style', (park) ? 'background-color: RGB(0,255,0);' : 'background-color: RGB(255,0,0);');
                data.setProperty(i, 5, 'style', 'background-color: ' + score_color + ';')
            };
            
            var table = new google.visualization.Table(document.getElementById('dash-1-auto-table'));

            table.draw(data, {showRowNumber: false, width: '100%', height: '100%', allowHtml: true});

            document.getElementById('dash-1-auto-average').innerText = "Average Score - " + (ranking.autoPoints.value).toFixed(1) + " - " + ranking.autoPoints.rank_str + "";
            document.getElementById('dash-1-auto-deviation').innerText = "Standard Deviation - "+ (ranking.autoDeviation.value).toFixed(1) + " - " + ranking.autoPoints.rank_str;

            //tele
            var cycle1 = 0;
            var cycle2 = 0;
            var cycle3 = 0;
            var cycle4 = 0;
            var cycleTotal = 0;
            var cycleCount = 0;
            for(i = 0; i < cycles.length; i++){
                if(cycles[i].mineralcount > 1){
                    cycle1 += (cycles[i].pick[cycles[i].pick.length - 1] - cycles[i].pick[0]);
                    cycle2 += (cycles[i].place[0] - cycles[i].pick[cycles[i].pick.length - 1]);
                    cycle3 += (cycles[i].place[cycles[i].place.length - 1] - cycles[i].place[0]);
                    cycleTotal += (cycles[i].cycletime);
                    cycleCount++;
                }
            }
            cycle1 = cycle1 / cycleCount;
            cycle2 = cycle2 / cycleCount;
            cycle3 = cycle3 / cycleCount;
            cycleTotal = cycleTotal / cycleCount;

            cycle4 = cycleTotal - cycle3 - cycle2 - cycle1;

            // document.getElementById('dash-1-tele-time-1').innerText = (cycle1).toFixed(1) + "sec";
            // document.getElementById('dash-1-tele-time-2').innerText = (cycle2).toFixed(1) + "sec";
            // document.getElementById('dash-1-tele-time-3').innerText = (cycle3).toFixed(1) + "sec";
            // document.getElementById('dash-1-tele-time-4').innerText = (cycle4).toFixed(1) + "sec";
            // document.getElementById('dash-1-tele-time-length').innerText = (cycleTotal).toFixed(1) + "sec";

            document.getElementById('dash-1-tele-average-minerals').innerText = "Average - " + (ranking.telePoints.value / 5).toFixed(1) + " minerals - " + (ranking.telePoints.value).toFixed(1) + " points - " + ranking.autoPoints.rank_str + "";
            document.getElementById('dash-1-tele-deviation-minerals').innerText = "Deviation - " + (ranking.teleDeviation.value / 5).toFixed(1) + " minerals - " + (ranking.teleDeviation.value).toFixed(1) + " points - " + ranking.telePoints.rank_str;

            document.getElementById('dash-1-tele-average-time').innerText = "Average - " + (ranking.cycleTime.value).toFixed(1) + " sec - " + ranking.cycleTime.rank_str + "";
            document.getElementById('dash-1-tele-deviation-time').innerText = "Deviation - " + (ranking.cycleDeviation.value).toFixed(1) + " sec - " + ranking.cycleDeviation.rank_str;

            var data = [["Match", "Drop", "Depot", "Crater"]];

            for(i in matchData){
                var drop = matchData[i].minerals.count.drop, depot;
                var lander = matchData[i].minerals.count.lander;
                var crater = (matchData[i].post.path == "crater") ? {v: (lander - drop), f: String(lander)} : {v: 0, f: '0'};
                var depot = (matchData[i].post.path == "crater") ? {v: 0, f: '0'} : {v: (lander - drop), f: String(lander)};
                data[data.length] = [{v:String(matchData[i].match.number),f:"Match " + String(matchData[i].match.number)}, drop, depot, crater];
            }

            var data = google.visualization.arrayToDataTable(data);

            var view = new google.visualization.DataView(data);
            view.setColumns([0, 1,
            { calc: "stringify",
                sourceColumn: 1,
                type: "string",
                role: "annotation" },
            2, 3]);

            var greatestMineralCount = 0;
            for(i in dash.data.src){
                if(dash.data.src[i].minerals.count.lander > greatestMineralCount){
                    greatestMineralCount = dash.data.src[i].minerals.count.lander;
                }
            }
            
            var chart = new google.visualization.ColumnChart(document.getElementById("dash-1-tele-chart"));

            chart.draw(data, {
                 allowHtml: true,
                title: "Minerals Scored",
                bar: {groupWidth: "95%"},
                width: '100%', 
                heigth: '30vh', 
                isStacked: true,
                colors: ["#FF0000", '#FFEF00', '#660066'],
                vAxis: {
                    //viewWindowMode:'explicit',
                    viewWindow: {
                        max:Math.floor(greatestMineralCount * 1.05) + 1,
                        min:0
                    }
                },
                chartArea:{
                    left:'5%',
                    top:'5%',
                    width:'80%',
                    height:'70%'
                }
            });

            //end game
            document.getElementById('dash-1-end-time').innerText = "Average Hang Time - " + (ranking.hangTime.value).toFixed(1) + " - " + (ranking.hangTime.rank_str);
            document.getElementById('dash-1-end-points').innerText = "End Game Points - " + (ranking.endPoints.value).toFixed(1) + " - " + (ranking.endPoints.rank_str);
            document.getElementById('dash-1-end-deviation').innerText = "End Game Deviation - " + (ranking.endDeviation.value).toFixed(1) + " - " + (ranking.endDeviation.rank_str);

            var data = [['Match', 'End-Game Points']];

            for(i in matchData){
                data[data.length] = [{v:String(matchData[i].match.number),f:"Match " + String(matchData[i].match.number)}, {v:matchData[i].score.end, f:String(matchData[i].score.end) + " Points - " + matchData[i].post.park}]
            }

            data = google.visualization.arrayToDataTable(data);

            var view = new google.visualization.DataView(data);
            view.setColumns([0, 1, {cals: "stringify", sourceColumn: 1, type: "number", role: "annotation"}]);

            var chart = new google.visualization.BarChart(document.getElementById("dash-1-end-chart"));

            chart.draw(view, {
                title: "End Game points",
                width: '70%', 
                height: '100%',
                legend: 'none',
                chartArea:{
                    left: "5%",
                    top: "5%",
                    width: '70%',
                    height: '100%'
                },
                bar: {groupWidth: "95%"},
                colors: ['#00FF00'],
                hAxis: {
                    //viewWindowMode:'explicit',
                    viewWindow: {
                        max:52,
                        min:0
                    }
                }
            });

            //overall

            document.getElementById('dash-1-overall-average').innerText = "Average Score - " + (ranking.points.value).toFixed(1) + " - " + (ranking.points.rank_str);
            document.getElementById('dash-1-overall-deviation').innerText = "Standard Deviation - " + (ranking.pointsDeviation.value).toFixed(1) + " - " + (ranking.pointsDeviation.rank_str);

            document.getElementById("dash-1-section").style.display = "block";
        }
    }else if(section == "matches"){
        if(item == null){
            $('#dash-tab-matches-bar').trigger('click');
        }else{
            var matchnum = item;
            dash.matchteams = [0, 0, 0, 0, 0];
            for(i in match.matches){
                if(match.matches[i][0] == matchnum){
                    dash.matchteams = match.matches[i];
                }
            }

            document.getElementById('dash-3-match').innerText = "Match " + matchnum;

            for(t = 0; t < 4; t++){
                var ts = String(t);
                var teamnum = dash.matchteams[t + 1];
                document.getElementById('dash-3-' + ts + '-teamnum').innerText = teamnum;
                document.getElementById('dash-3-' + ts + '-name').innerText = teamnum + " - " + match.getTeamName(teamnum);
            }

            $('#dash-tab-match-bar').trigger('click');
        }
    }
}

dash.dashTeamsSelect = function(){
    var teamnum = (document.getElementById("dash-1-teams").value).split(" - ")[0];
    dash.setDash("teams?" + teamnum);
}

dash.dashSelectMatch = function(matchnum){
    dash.setDash('matches?' + String(matchnum));
}

dash.dashMatchSelectTeam = function(ii){
    dash.setDash('teams?' + dash.matchteams[ii+1]);
}

dash.isMatchScouted = function(matchnum, teamnum){
    for(ii in dash.data.src){
        if(dash.data.src[ii].match.number == matchnum && dash.data.src[ii].match.teamnum == teamnum){
            return true;
        }
    }
    return false;
}

dash.getTeamData = function(teamnum){
    out = []
    for(ii in dash.data.src){
        if(dash.data.src[ii].match.teamnum == teamnum){
            out[out.length] = dash.data.src[ii];
        }
    }
    return out;
}

dash.getTeamMatches = function(teamnum){
    out = []
    for(ii in match.matches){
        if(match.matches[ii][1] == teamnum || match.matches[ii][2] == teamnum || match.matches[ii][3] == teamnum || match.matches[ii][4] == teamnum){
            out[out.length] = match.matches[ii];
        }
    }
    return out;
}

dash.getTeamRanking = function(teamnum){
    out = null;
    for(ii in dash.data.ranking){
        if(dash.data.ranking[ii].team == teamnum){
            out = dash.data.ranking[ii];
        }
    }
    return out;
}

dash.getGroupedCycles = function(teamnum){
    var groupedCyclesTeamMatches = dash.getTeamData(teamnum);
    out = [];
    for(ii = 0; ii < groupedCyclesTeamMatches.length; ii++){
        
        var roundNumCycles = 0;
        for(kk = 0; kk < groupedCyclesTeamMatches[ii].cyclesUngrouped.length; kk++){
            var combined = false;
            if(kk > 0){
                if(out[out.length - 1].place[0] > groupedCyclesTeamMatches[ii].cyclesUngrouped[kk].pick){
                    combined = true;
                    var cycleIndex = out[out.length - 1].pick.length
                    out[out.length - 1].pick[cycleIndex] = groupedCyclesTeamMatches[ii].cyclesUngrouped[kk].pick;
                    out[out.length - 1].place[cycleIndex] = groupedCyclesTeamMatches[ii].cyclesUngrouped[kk].place;
                    out[out.length - 1].length[cycleIndex] = groupedCyclesTeamMatches[ii].cyclesUngrouped[kk].length;
                    out[out.length - 1].type[cycleIndex] = groupedCyclesTeamMatches[ii].cyclesUngrouped[kk].type;
                    out[out.length - 1].mineralcount++;
                    if(roundNumCycles > 1){
                        out[out.length - 1].cycletime = out[out.length - 1].pick[0] - out[out.length - 2].pick[0];
                    }
                }
            }
            if(!combined){
                out[out.length] = {
                    match: groupedCyclesTeamMatches[ii].match.number,
                    team: teamnum,
                    pick:[groupedCyclesTeamMatches[ii].cyclesUngrouped[kk].pick],
                    place:[groupedCyclesTeamMatches[ii].cyclesUngrouped[kk].place],
                    length:[groupedCyclesTeamMatches[ii].cyclesUngrouped[kk].length],
                    cycletime: 0.0,
                    mineralcount:1,
                    type: [groupedCyclesTeamMatches[ii].cyclesUngrouped[kk].type],
                    position: groupedCyclesTeamMatches[ii].post.path,
                    matchtime: groupedCyclesTeamMatches[ii].time
                }
                if(kk == 0){
                    out[out.length - 1].cycletime = groupedCyclesTeamMatches[ii].cyclesUngrouped[kk].place - (groupedCyclesTeamMatches[ii].time.auto / 1000);
                }else{
                    out[out.length - 1].cycletime = groupedCyclesTeamMatches[ii].cyclesUngrouped[kk].place - out[out.length - 2].place[0];
                }
                roundNumCycles++;
            }
        }
    }
    return out;
}

dash.math.average = function(nums){
    if(nums.length < 1){
        return 0;
    }
    total = 0;
    for(ii in nums){
        total += nums[ii];
    }
    return total/(nums.length);
}

dash.math.standardDeviation = function(nums){
    if(nums.length < 2){
        return 1e+100;
    }

    var varianceTotal = 0
    var mean = dash.math.average(nums);

    for(ii in nums){
        varianceTotal += Math.pow(nums[ii] - mean, 2);
    }
    return Math.sqrt(varianceTotal/(nums.length));
}
