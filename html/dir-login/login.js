var loginUsers = null;
var loginUsername = null;
var loginTeam = null;

$(document).ready(function() {
    $.get(' sql', { cmd: 'users' }, function(data) {
        users = JSON.parse(data);
    });
});

function loginSubmit(){
    var username = document.getElementById("loginUsername").value;
    var teamnum = document.getElementById("loginTeam").value;
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
    return false;
}
