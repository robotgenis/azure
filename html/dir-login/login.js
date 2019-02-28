//NAME=login

//FUNCTIONS
//loginSubmit()
//loginSubmitUser(username, teamnum)
//loginCreate()
//getScouter()


var login = {};
login.users = null;
login.user = {username:null,teamnum:null,score:null,security:null};

$(document).ready(function() {
    $.get('sql', { cmd: 'users' }, function(data) {
        login.users = JSON.parse(data);
        //auto login for testing
        //loginSubmitUser("Brandon", 5029);
    });
});

login.loginSubmit = function(){
    var username = document.getElementById("loginUsername").value;
    var teamnum = document.getElementById("loginTeam").value;
    return loginSubmitUser(username, teamnum);
}

login.loginSubmitUser = function (username, teamnum){
    var loginBool = false;
    for(i in login.users){
        if(login.users[i][0] == username && login.users[i][1] == teamnum){
            loginBool = true;
            login.username = username;
            login.teamnum = teamnum;
            login.score = login.users[i][2];
            login.security = login.users[i][3];
        }
    }
    if(loginBool == true){
        if(loginSecurity < 2){
            var element = document.getElementById("menuMatch");
            element.classList.add("disabled");
            element.disabled = true;
            var element = document.getElementById("menuPit");
            element.classList.add("disabled");
            element.disabled = true;
        }else{
            var element = document.getElementById("menuMatch");
            element.classList.remove("disabled");
            element.disabled = false;
            var element = document.getElementById("menuPit");
            element.classList.remove("disabled");
            element.disabled = false;
        }
        var element = document.getElementById("menuTournament");
        //element.classList.add("disabled");
        element.disabled = true;
        var element = document.getElementById("menuPit");
        //element.classList.add("disabled");
        element.disabled = true;

        matchLoad();
        dash.loadDashboard();

        setTab('menu');
    }
    document.getElementById("loginUsername").value = "";
    document.getElementById("loginTeam").value = "";
    return false;
}

login.loginCreate = function(){
    var username = document.getElementById("loginCreateUsername").value;
    username = username.trim();
    var teamnum = String(document.getElementById("loginCreateTeam").value);
    $.get('createuser', { cmd: username + '-' + teamnum }, function() {});
    return true;
}

login.getScouter = function(){
    return {username: login.user.username, teamnum: login.user.teamnum};
}