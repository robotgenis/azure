$(document).ready(function() {
    $.get(' sql', { cmd: 'users' }, function(data) {
        alert(data);
    });
});

function loginSubmit(){
    var username = document.getElementById("loginUsername").value;
    var teamnum = document.getElementById("loginTeam").value;
    alert(username + "," + teamnum);
    return false;
}