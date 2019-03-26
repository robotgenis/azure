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
}