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

### HTML javascript sources
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

### Access levels numbers
1 guest
2 not confirmed account
5 confirmed account
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

### Score JSON Format
        type: "score"
        score: 100
        scouter: {username: Brandon, teamnum: 5029}

### Cycle formats
depot, lander

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