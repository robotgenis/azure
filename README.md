# Node.js PowerScout by PowerStackers FTC #5029

### match inputs
matchInputHanging
matchInputPrediction
matchInputAutoLand
matchInputAutoSample
matchInputAutoClaim
matchInputAutoPark

### database requests
teams
matches
users

### javascript functions
setTab(tabName)
loadElement()
loginSubmit()
loginSubmitUser(username, teamnum)
loginCreate()
getTeamName(number)
matchSelectMatch(matchNumber)
matchLoad()
getMatch(matchNumber) - [matchNumber, red1, red2, blue1, blue2]
matchStart()
matchAutoInput(id)
matchTele()
matchTimerAdd()
matchFinish()
saveData(jsonData)
submitCheck()
submitSend()
matchMineralClick()
matchMineralTimerCount()
matchRadioClick(section)
matchSubmit()
matchNextMatch()
openDashboard()
refreshDashboard()
dashSelectTeam()
dashSetTab()
loadDashboard()

### javascript public variables
loginUsers
loginUsername
loginTeam
matches - roundNumber, red1, red2, blue1, blue2
teams - teamnumber, teamname
matchNumber
matchTeam
matchTime
matchTimer
matchTimerStart
matchData
submitTimer
matchMineralCount
matchMineralStart1
matchMineralStart2
matchAutoTime
cookieName
matchStartHang
dashMatchesHTML
dashData
dashSel

### div names
login
menu
match-0
match-1
match-2
match-3
match-4
pit-0
pit-1
tournament
dashboard

### HTML javascript sources
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

### Access levels numbers
1 guest
2 not confirmed account
3 temp access account
4 auto confirmed account
5 manually confirmed account
10 admin

### Match JSON Format
        type: "match"
        number: 99
        team: 6133
        scouter: {username: Brandon, teamnum: 5029, prediction: 50}
        auto:{land:{value:false,time:00.0}, sample:{value:false,time:00.0}, claim:{value:false,time:00.0}, park:{value:false,time:00.0}}
        teleop:{count:{depot:0,lander:0,drop:0},cycles:[{start:00.0,end:00.0,length:00.0,type:'depot'},{start:00.0,end:00.0,length:00.0,type:'lander'}]}
        post:{park:'hang',ratings:{blocks:0,balls:0,pick:0}}
        match:{times:{length:0.0,auto:0.0},score:{auto:0,tele:0,end:0,total:0}}


### New Match JSON Format
        type: "match"
        match: {number: 99, teamnum: 1001, Color:"red/blue"}
        scouter: {username: Brandon, teamnum: 5029, prediction: 50}
        auto:{position:"crater/depot",land:{value:false,time:00.0}, sample:{value:false,time:00.0}, claim:{value:false,time:00.0}, park:{value:false,time:00.0}}
        cyclesUngrouped[{pick:00.0,place:00.0,length:00.0,type:'lander/drop'}]
        cyclesGrouped[{pick:[00.0],place:[00.0],length:00.0,type:'lander/drop']
        minerals:{count:{lander:0,drop:0}}
        post:{park:'hang/park/parkcomplete',path:{},ratings:{defender:false,defended:false}}
        time:{length:0.0,auto:0.0}
        score:{auto:0,tele:0,end:0,total:0}}

### Score JSON Format
        type: "score"
        score: 100
        scouter: {username: Brandon, teamnum: 5029}

### Cycle formats
depot, lander, drop

### park
hang, park, parkcomplete

### ratings
blocks
balls
pick
 value 1 to 5

### Menu Button ID
menuMatch
menuPit
menuTournament
menuLogout
menuDashboard


### Mineral actions
pick
scoredepot
scorelander
drop

### Correct Match Data
{"type":"match","number":0,"team":"14615","scouter":{"username":"Brandon","teamnum":"5029","prediction":50},"auto":{"land":{"value":true,"time":14001},"sample":{"value":true,"time":14801},"claim":{"value":true,"time":27525},"park":{"value":true,"time":31701}},"teleop":{"cycles":[{"start":45.8,"end":52.1,"length":6.3,"type":"lander"},{"start":47,"end":52.5,"length":5.5,"type":"lander"},{"start":56.5,"end":61.5,"length":5,"type":"lander"},{"start":57.5,"end":62.7,"length":5.2,"type":"drop"},{"start":66.3,"end":72.8,"length":6.5,"type":"lander"},{"start":67.5,"end":73.4,"length":5.9,"type":"lander"},{"start":75.6,"end":81.7,"length":6.1,"type":"lander"},{"start":76.7,"end":82.3,"length":5.6,"type":"lander"},{"start":86.2,"end":90.1,"length":3.9,"type":"lander"},{"start":86.8,"end":90.7,"length":3.9,"type":"lander"},{"start":94.4,"end":97.8,"length":3.4,"type":"lander"},{"start":95.1,"end":98.3,"length":3.2,"type":"lander"},{"start":103.8,"end":107.9,"length":4.1,"type":"lander"},{"start":106.1,"end":108.4,"length":2.3,"type":"lander"},{"start":112.3,"end":115.5,"length":3.2,"type":"lander"},{"start":113,"end":115.9,"length":2.9,"type":"lander"},{"start":119,"end":124.5,"length":5.5,"type":"lander"},{"start":121.6,"end":124.9,"length":3.3,"type":"lander"},{"start":128.1,"end":132.6,"length":4.5,"type":"lander"},{"start":129.1,"end":133,"length":3.9,"type":"lander"},{"start":136.6,"end":142.4,"length":5.8,"type":"lander"},{"start":138.1,"end":143.4,"length":5.3,"type":"drop"},{"start":146.3,"end":149.9,"length":3.6,"type":"lander"},{"start":147.1,"end":150.4,"length":3.3,"type":"lander"}],"count":{"depot":0,"lander":22,"drop":2}},"post":{"park":"hang","ratings":{"balls":3,"block":3,"pick":3}},"match":{"times":{"length":163301,"auto":33901},"score":{"auto":80,"tele":110,"end":50,"total":240}}}

average cycle = 4.44