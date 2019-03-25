# Match JSON Format
    {
        type: "match",
        match: {number: 99, teamnum: 1001, color: "red/blue", date:"1/31/2019", time:"10:15:00"},
        scouter: {username: Brandon, teamnum: 5029, prediction: 50},
        auto:{position:"crater/depot",hanging:false,land:{value:false,time:00.0}, sample:{value:false,time:00.0}, sample2:{value:false,time:00.0}, claim:{value:false,time:00.0}, park:{value:false,time:00.0}},
        cyclesUngrouped: [{pick:00.0,place:00.0,length:00.0,type:'lander/drop'}],
        minerals:{count:{lander:0,drop:0}},
        post:{park:'hang/park/parkcomplete',path:'crater/depot',ratings:{defender:false,defended:false}},
        time:{length:0.0,auto:0.0},
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
        endPoints:{value:0,rank:1,rank_str:'1st'},
        endDeviation:{value:0,rank:1,rank_str:'1st'},
        points:{value:0,rank:1,rank_str:'1st'},
        pointsDeviation:{value:0,rank:1,rank_str:'1st'}
    }