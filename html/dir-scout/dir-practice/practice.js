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

    setTab("practice-1");
}