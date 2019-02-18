var loginUsers = null;
var loginUsername = null;
var loginTeam = null;
var loginScore = null;
var loginSecurity = null;

$(document).ready(function() {
    $.get('sql', { cmd: 'users' }, function(data) {
        users = JSON.parse(data);
        //auto login for testing
        //loginSubmitUser("Brandon", 5029);
    });
});

function loginSubmit(){
    var username = document.getElementById("loginUsername").value;
    var teamnum = document.getElementById("loginTeam").value;
    return loginSubmitUser(username, teamnum)
}

function loginSubmitUser(username, teamnum){
    var login = false;
    for(i in users){
        if(users[i][0] == username && users[i][1] == teamnum){
            login = true;
            loginUsername = username;
            loginTeam = teamnum;
            loginScore = users[i][2];
            loginSecurity = users[i][3];
        }
    }
    if(login == true){
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

        setTab('menu');
    }
    document.getElementById("loginUsername").value = "";
    document.getElementById("loginTeam").value = "";
    return false;
}

function loginCreate(){
    var username = document.getElementById("loginCreateUsername").value;
    username = username.trim();
    var teamnum = String(document.getElementById("loginCreateTeam").value);
    $.get('createuser', { cmd: username + '-' + teamnum }, function(data) {});
    return true;
}