
//NAME=pit

//FUNCTIONS
//load()
//select(team)
//save()

var pit = {};
pit.teamnum = null;
pit.data = null;

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

    $.get(' sql', { cmd: 'pit' }, function(data) {
        pit.data = JSON.parse(data);

        for(i in pit.data){
            pit.data[i] = JSON.parse(pit.data[i]);
        }
    });
}

pit.select = function(team){
    pit.teamnum = team;

    document.getElementById("pit-1-crater").checked = false;
    document.getElementById("pit-1-depot").checked = false;
    document.getElementById("pit-1-land").checked = false;
    document.getElementById("pit-1-sample").checked = false;
    document.getElementById("pit-1-claim").checked = false;
    document.getElementById("pit-1-park").checked = false;

    document.getElementById('pit-1-autoMinerals').innerText = "0";
    document.getElementById('pit-1-depotMinerals').innerText = "0";
    document.getElementById('pit-1-craterMinerals').innerText = "0";

    document.getElementById('pit-1-hang').innerText = false;

    console.log(pit.data);

    for(i in pit.data){
        if(pit.teamnum == pit.data[i].teamnum){
            document.getElementById("pit-1-crater").checked = pit.data[i].auto.crater;
            document.getElementById("pit-1-depot").checked = pit.data[i].auto.depot;
            document.getElementById("pit-1-land").checked = pit.data[i].auto.land;
            document.getElementById("pit-1-sample").checked = pit.data[i].auto.sample;
            document.getElementById("pit-1-claim").checked = pit.data[i].auto.claim;
            document.getElementById("pit-1-park").checked = pit.data[i].auto.park;

            document.getElementById('pit-1-autoMinerals').innerText = String(pit.data[i].auto.minerals);
            document.getElementById('pit-1-depotMinerals').innerText = String(pit.data[i].tele.depot);
            document.getElementById('pit-1-craterMinerals').innerText = String(pit.data[i].tele.crater);

            document.getElementById('pit-1-hang').innerText = pit.data[i].end.hang;
        }
    }

    setTab('pit-1');
}

pit.save = function(){

    var da = {
        type: "pit",
        teamnum: pit.teamnum,
        scouter: login.getScouter(),
        auto:{crater:document.getElementById("pit-1-crater").checked,
            depot:document.getElementById("pit-1-depot").checked,
            land:document.getElementById("pit-1-land").checked,
            sample:document.getElementById("pit-1-sample").checked,
            claim:document.getElementById("pit-1-claim").checked,
            park:document.getElementById("pit-1-park").checked,
            minerals: Number(document.getElementById('pit-1-autoMinerals').innerText)},
        tele:{depot:Number(document.getElementById('pit-1-depotMinerals').innerText),
            crater:Number(document.getElementById('pit-1-craterMinerals').innerText)},
        end:{hang:document.getElementById("pit-1-hang").checked},
    };
    
    console.log(da);

    submit.saveData(da);

    setTab('pit-0');

    $.get(' sql', { cmd: 'pit' }, function(data) {
        pit.data = JSON.parse(data);

        for(i in pit.data){
            pit.data[i] = JSON.parse(pit.data[i]);
        }
    });
}