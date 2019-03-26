//NAME=dash

//FUNCTIONS
//refreshDash()
//setDash(address)
//getTeamData(teamnum)
//getTeamMatches(teamnum)
//getTeamRanking(teamnum)
//math.average([num, num, num])
//math.standardDeviation([num, num, num])


var dash = {};
dash.math = {};
dash.data = {src: null, ranking: null};
dash.history = [];
dash.history_index = 0;


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

dash.refreshDash = function(){
    dash.data.ranking = [];
    console.log(teams);
    for(i = 0; i < teams.length; i++){
        //alert(String(i) + "-" + teams[i][0]);
        console.log(i, teams[i]);
        var teamData = dash.getTeamData(teams[i][0]);

        var autoPoints = [];
        var telePoints = [];
        var endPoints = [];
        var points = [];
        
        for(k in teamData){
            autoPoints[autoPoints.length] = teamData[k].score.auto;
            telePoints[telePoints.length] = teamData[k].score.tele;
            endPoints[endPoints.length] = teamData[k].score.end;
            points[points.length] = teamData[k].score.total;
        }
        dash.data.ranking[i] = {
            team: teams[i][0],
            autoPoints:{value:dash.math.average(autoPoints),rank:null,rank_str:null},
            autoDeviation:{value:dash.math.standardDeviation(autoPoints),rank:null,rank_str:null},
            telePoints:{value:dash.math.average(telePoints),rank:null,rank_str:null},
            teleDeviation:{value:dash.math.standardDeviation(telePoints),rank:null,rank_str:null},
            endPoints:{value:dash.math.average(endPoints),rank:null,rank_str:null},
            endDeviation:{value:dash.math.standardDeviation(endPoints),rank:null,rank_str:null},
            points:{value:dash.math.average(points),rank:null,rank_str:null},
            pointsDeviation:{value:dash.math.standardDeviation(points),rank:null,rank_str:null}
        }
        console.log(dash.data.ranking[i]);
    }

    console.log("go");

    console.log(dash.data.ranking);
    console.log(teams);

    for(t in dash.data.ranking[0]){
        console.log(t);
        if(t != 'team'){
            if(t == "autoDeviation" || t == "teleDeviation" || t == "endDeviation" || t == "pointsDeviation"){
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
            console.log(t, dash.data.ranking);
        }
    }

    var html = document.getElementById("dash-1-teams-src").innerHTML;

    var outHTML = "";
    for(i in teams){
        add = html;

        add = add.replace(/00001/g, teams[i][0]);
        add = add.replace(/name1/g, teams[i][1]);

        outHTML += add;
    }
    document.getElementById("dash-1-teams").innerHTML = outHTML;
}

dash.setDash = function(address){
    address = String(address);
    dash.history[dash.history.length] = address;

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
                var score_color = score * 255 / 80;
                data.addRow([String(matchData[i].match.number) + "-" + ((matchData[i].auto.position == "crater") ? "C" : "D"), land, sample, claim, park, score]);
                data.setProperty(i, 0, 'style', 'text-align: right;');
                data.setProperty(i, 1, 'style', (land) ? 'background-color: RGB(0,255,0);' : 'background-color: RGB(255,0,0);');
                data.setProperty(i, 2, 'style', (sample) ? 'background-color: RGB(0,255,0);' : 'background-color: RGB(255,0,0);');
                data.setProperty(i, 3, 'style', (claim) ? 'background-color: RGB(0,255,0);' : 'background-color: RGB(255,0,0);');
                data.setProperty(i, 4, 'style', (park) ? 'background-color: RGB(0,255,0);' : 'background-color: RGB(255,0,0);');
                data.setProperty(i, 5, 'style', 'background-color: RGB(' + String(255 - score_color) + ',' + String(score_color) + ', 0);')
            };
            
            var table = new google.visualization.Table(document.getElementById('dash-1-auto-table'));

            table.draw(data, {showRowNumber: false, width: '100%', height: '100%', allowHtml: true});

            document.getElementById('dash-1-auto-average').innerText = "Average Score  " + (ranking.autoPoints.value).toFixed(1) + " - " + ranking.autoPoints.rank_str;
            document.getElementById('dash-1-auto-deviation').innerText = "Standard Deviation  " + (ranking.autoDeviation.value).toFixed(1) + " - " + ranking.autoPoints.rank_str;

            document.getElementById("dash-1-section").style.display = "block";
        }
    }

    setTab('dashboard');
}

dash.dashTeamsSelect = function(){
    var teamnum = (document.getElementById("dash-1-teams").value).split(" - ")[0];
    dash.setDash("teams?" + teamnum);
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
    return Math.sqrt(varianceTotal/(nums.length - 1));
}
