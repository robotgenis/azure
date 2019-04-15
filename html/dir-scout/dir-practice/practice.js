//NAME=practice

//FUNCTIONS
//start()
//matchMineralClick(action)
//matchTimerAdd()
//finish()

var practice = {};
practice.cycles = null;
practice.count = null;
practice.minerals = null;
practice.start = null;
practice.timer = {time:null,timer:null,timerStart:null,autoTime:null};


practice.start = function(){
    practice.cycles = [];
    practice.count = 0
    practice.minerals = {lander: 0, drop: 0};
    practice.start = [];

    setTab("practice-0");

    practice.timer.time = 0;
    practice.timer.timerStart = Date.now();

    practice.timer.timer = setInterval(practice.matchTimerAdd, 100);


    document.getElementById("practice-0-mineralTimer1").style.display = "none";
    document.getElementById("practice-0-mineralTimerPic1").style.display = "none";
    document.getElementById("practice-0-mineralTimer2").style.display = "none";
    document.getElementById("practice-0-mineralTimerPic2").style.display = "none";
    document.getElementById("practice-0-mineralTimerPic3").style.display = "none";
    document.getElementById("practice-0-mineralTimerPic4").style.display = "none";
}

practice.matchMineralClick = function(action){
    if(action == "pick"){
        practice.count += 1;
        practice.start[practice.count - 1] = practice.timer.time;
        if(practice.count == 1){
            document.getElementById("practice-0-mineralTimer1").innerText = "0.0";
            document.getElementById("practice-0-mineralTimer1").style.display = "block";
            document.getElementById("practice-0-mineralTimerPic1").style.display = "block";
        }else if(practice.count == 2){
            document.getElementById("practice-0-mineralTimer2").innerText = "0.0";
            document.getElementById("practice-0-mineralTimer2").style.display = "block";
            document.getElementById("practice-0-mineralTimerPic2").style.display = "block";
        }else if(practice.count == 3){
            document.getElementById("practice-0-mineralTimerPic3").style.display = "block";
        }else if(practice.count == 4){
            document.getElementById("practice-0-mineralTimerPic4").style.display = "block";
        }
    }else if(action == "scorelander"){
        if(practice.count > 0){
            var start = Math.round(practice.start[0] / 100) / 10;
            var end = Math.round((practice.timer.time) / 100) / 10;
            var len = Math.round((end - start) * 10) / 10;

            practice.cycles[practice.cycles.length] = {pick: start,place: end,length: len,type:'lander'};
            
            practice.minerals.lander += 1;

            for(i = 1; i < practice.count; i++){
                practice.start[i - 1] = practice.start[i];
            }
            
            practice.count -= 1;

            if(practice.count == 3){
                document.getElementById("practice-0-mineralTimerPic4").style.display = "none";
            }else if(practice.count == 2){
                document.getElementById("practice-0-mineralTimerPic3").style.display = "none";
            }else if(practice.count == 1){
                document.getElementById("practice-0-mineralTimer2").style.display = "none";
                document.getElementById("practice-0-mineralTimerPic2").style.display = "none";
            }else if(practice.count == 0){
                document.getElementById("practice-0-mineralTimer1").style.display = "none";
                document.getElementById("practice-0-mineralTimerPic1").style.display = "none";
            }

            if(practice.count > 1){
                var t = (practice.timer.time - practice.start[1]) / 1000;
                document.getElementById("practice-0-mineralTimer1").innerText = t.toFixed(1);
            }
            if(practice.count > 1){
                var t = (practice.timer.time - practice.start[0]) / 1000;
                document.getElementById("practice-0-mineralTimer1").innerText = t.toFixed(1);
            }
        }
    }else if(action == "drop"){
        if(practice.count > 0){
            var start = Math.round(practice.start[0] / 100) / 10;
            var end = Math.round((practice.timer.time) / 100) / 10;
            var len = Math.round((end - start) * 10) / 10;

            practice.cycles[practice.cycles.length] = {pick: start,place: end,length: len,type:'drop'};
            
            practice.minerals.drop += 1;

            for(i = 1; i < practice.count; i++){
                practice.start[i - 1] = practice.start[i];
            } 
            
            practice.count -= 1;

            if(practice.count == 3){
                document.getElementById("practice-0-mineralTimerPic4").style.display = "none";
            }else if(practice.count == 2){
                document.getElementById("practice-0-mineralTimerPic3").style.display = "none";
            }else if(practice.count == 1){
                document.getElementById("practice-0-mineralTimer2").style.display = "none";
                document.getElementById("practice-0-mineralTimerPic2").style.display = "none";
            }else if(practice.count == 0){
                document.getElementById("practice-0-mineralTimer1").style.display = "none";
                document.getElementById("practice-0-mineralTimerPic1").style.display = "none";
            }

            if(practice.count > 1){
                var t = (practice.timer.time - practice.start[1]) / 1000;
                document.getElementById("practice-0-mineralTimer1").innerText = t.toFixed(1);
            }
            if(practice.count > 1){
                var t = (practice.timer.time - practice.start[0]) / 1000;
                document.getElementById("practice-0-mineralTimer1").innerText = t.toFixed(1);
            }
        }
    }
}

practice.matchTimerAdd = function(){
    practice.timer.time = Date.now() - practice.timer.timerStart; // milliseconds elapsed since start

    var t = (practice.timer.time) / 1000;

    if(practice.count >= 1){
        var t = (practice.timer.time - practice.start[0]) / 1000;
        document.getElementById("practice-0-mineralTimer1").innerText = t.toFixed(1);
    }
    if(practice.count >= 2){
        var t = (practice.timer.time - practice.start[1]) / 1000;
        document.getElementById("practice-0-mineralTimer2").innerText = t.toFixed(1);
    }
}

practice.finish = function(){
    clearTimeout(practice.timer.timer);

    var roundNumCycles = 0;

    var out = [];
    for(kk = 0; kk < practice.cycles.length; kk++){
        var combined = false;
        if(kk > 0){
            if(out[out.length - 1].place[0] > practice.cycles[kk].pick){
                combined = true;
                var cycleIndex = out[out.length - 1].pick.length
                out[out.length - 1].pick[cycleIndex] = practice.cycles[kk].pick;
                out[out.length - 1].place[cycleIndex] = practice.cycles[kk].place;
                out[out.length - 1].length[cycleIndex] = practice.cycles[kk].length;
                out[out.length - 1].type[cycleIndex] = practice.cycles[kk].type;
                out[out.length - 1].mineralcount++;
                if(roundNumCycles > 1){
                    out[out.length - 1].cycletime = out[out.length - 1].pick[0] - out[out.length - 2].pick[0];
                }
            }
        }
        if(!combined){
            out[out.length] = {
                pick:[practice.cycles[kk].pick],
                place:[practice.cycles[kk].place],
                length:[practice.cycles[kk].length],
                cycletime: 0.0,
                mineralcount:1,
                type: [practice.cycles[kk].type],
            }
            if(kk == 0){
                out[out.length - 1].cycletime = practice.cycles[kk].place;
            }else{
                out[out.length - 1].cycletime = practice.cycles[kk].place - out[out.length - 2].place[0];
            }
            roundNumCycles++;
        }
    }

    cyclestimes = [];
    var cyclesText = "";

    for(i = 0; i < out.length; i++){
        cyclestimes[i] = out[i].cycletime;
        cyclesText += out[i].mineralcount.toFixed(0) + " minerals - " + out[i].cycletime.toFixed(1) + " sec.  ";
        for(k = 0; k < out[i].type.length; k++){
            cyclesText += (out[i].type[k] == "lander") ? "L" : "D";
        } 
        cyclesText += "\n"
    }

    var average = dash.math.average(cyclestimes);

    document.getElementById("practice-1-cycletime").innerText = "Cycle Time Average = " + average.toFixed(2);
    document.getElementById("practice-1-minerals").innerText = "Minerals Scored = " + practice.minerals.lander.toFixed(0);
    document.getElementById("practice-1-drop").innerText = "Minerals Dropped = " + practice.minerals.drop.toFixed(0);

    document.getElementById("practice-1-cycles").innerText = cyclesText;    
    

    setTab("practice-1");
}