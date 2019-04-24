# Match JSON Format
    {
        type: "match",
        match: {number: 99, teamnum: 1001, color: "red/blue", date:"1/31/2019", time:"10:15:00"},
        scouter: {username: Brandon, teamnum: 5029, prediction: 50, bet:10, earnings: 0},
        auto:{position:"crater/depot",hanging:false,land:{value:false,time:00.0}, sample:{value:false,time:00.0}, sample2:{value:false,time:00.0}, claim:{value:false,time:00.0}, park:{value:false,time:00.0}},
        cyclesUngrouped: [{pick:00.0,place:00.0,length:00.0,type:'lander/drop'}],
        minerals:{count:{lander:0,drop:0}},
        post:{park:'hang/park/parkcomplete',path:'crater/depot',ratings:{defender:false,defended:false}},
        time:{length:160000,auto:30000},
        score:{auto:0,tele:0,end:0,total:0}},
        disconnect:[{start:00.0,end:00.0,length:00.0}]
    }

# Score JSON Format
    {
        type: "score",
        score: 3,
        scouter: {username: Brandon, teamnum: 5029}
    }

# Ranking JSON Format
    {
        team: 1001,
        autoPoints:{value:0,rank:1,rank_str:'1st'},
        autoDeviation:{value:0,rank:1,rank_str:'1st'},
        telePoints:{value:0,rank:1,rank_str:'1st'},
        teleDeviation:{value:0,rank:1,rank_str:'1st'},
        cycleTime:{value:0,rank:1,rank_str:'1st'},
        cycleDeviation:{value:0,rank:1,rank_str:'1st'},
        endPoints:{value:0,rank:1,rank_str:'1st'},
        endDeviation:{value:0,rank:1,rank_str:'1st'},
        hangTime:{value:0,rank:1,rank_str:'1st'},
        hangDeviation:{value:0,rank:1,rank_str:'1st'},
        points:{value:0,rank:1,rank_str:'1st'},
        pointsDeviation:{value:0,rank:1,rank_str:'1st'}
    }

# Grouped Cycles
    {
        match: 1,
        team: 1001,
        pick:[00.0],
        place:[00.0],
        length:[00.0],
        cycletime:00.0,
        mineralcount:0,
        type:['lander/drop']
        position:"depot/crater",
        matchtime:{length:160000,auto:30000}
    }

# Cookie Settings
    {
        position: "all/red1/red2/blue1/blue2"
    }

# Settings Change
    {
        type: "team",
        teamnum: 1001,
        teamname: "Name"
    }
    {
        type: "match",
        number: 1,
        red1: 2,
        red2: 3,
        blue1: 4,
        blue2: 5
    }
    {
        type: "scouting",
        scouter: "Brandon-5029",
        position: "red1/red2/blue1/blue2/alt",
        matches: {start: 1, end: 30}
    }
    {
        type: "user",
        name: "Brandon",
        teamnum: 00001,
        score: 100,
        security: 30
    }

# Pit Scouting
    {
        type: "pit",
        teamnumteamnum: 1001
        scouter: {username: Brandon, teamnum: 5029},
        auto:{crater:true,depot:true,land:true,sample:true,claim:true,park:true,minerals:0},
        tele:{depot:15,crater:10},
        end:{hang:true},
    }