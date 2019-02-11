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

### javascript public variables
loginUsers
loginUsername
loginTeam
matches - roundNumber, red1, red2, blue1, blue2
teams - teamnumber, teamname
matchNumber
matchTeam

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

### HTML sources

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

### Access levels numbers
1 guest
2 not confirmed account
5 confirmed account
10 admin