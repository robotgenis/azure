//NAME=pit

//FUNCTIONS
//load()
//select(team)

var pit = {};

pit.load = function(){
    var html = document.getElementById("pit-0-teams-src").innerHTML;

    var outHTML = "";
    for(i in teams){
        add = html;

        add = add.replace(/00001/g, teams[i][0]);
        add = add.replace(/name1/g, teams[i][1]);

        outHTML += add;
    }
    document.getElementById("pit-0-teams").innerHTML = outHTML;
}

pit.select = function(){
    

    setTab('pit-1');
}