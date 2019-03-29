//NAME=info

//FUNCTIONS
//load()

var info = {};

info.load = function(){
    var html = document.getElementById("info-1-teams-src").innerHTML;

    var outHTML = "";
    for(i in teams){
        add = html;

        add = add.replace(/00001/g, teams[i][0]);
        add = add.replace(/name1/g, teams[i][1]);

        outHTML += add;
    }
    document.getElementById("info-1-teams").innerHTML = outHTML;

    var html = document.getElementById("info-2-matches-src").innerHTML;
    
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

    document.getElementById("info-2-matches").innerHTML = outHTML;

    var html = document.getElementById("info-3-scouting-src").innerHTML;
    
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

    document.getElementById("info-3-scouting").innerHTML = outHTML;
}