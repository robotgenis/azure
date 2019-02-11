var loginUsers = null;
var loginUsername = null;
var loginTeam = null;

$(document).ready(function() {
    $.get(' sql', { cmd: 'users' }, function(data) {
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
        }
    }
    if(login == true){
        setTab('menu');
    }
    document.getElementById("loginUsername").value = "";
    document.getElementById("loginTeam").value = "";
    return false;
}

