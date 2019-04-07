//NAME=login

//FUNCTIONS
//loginSubmit()
//loginSubmitUser(username, teamnum)
//loginCreate()
//getScouter()


var login = {};
login.users = null;
login.user = {username:null,teamnum:null,score:null,security:null};


login.loginSubmit = function(){
    var username = document.getElementById("login-username").value;
    var teamnum = document.getElementById("login-team").value;
    return login.loginSubmitUser(username, teamnum);
}

login.loginSubmitUser = function (username, teamnum){
    var loginBool = false;
    for(i in login.users){
        if(login.users[i][0] == username && login.users[i][1] == teamnum){
            loginBool = true;
            login.user.username = username;
            login.user.teamnum = teamnum;
            login.user.score = login.users[i][2];
            login.user.security = login.users[i][3];
        }
    }
    if(loginBool == true){
        if(login.user.security > 1){
            var element = document.getElementById("menu-scout-section");
            element.classList.remove("disabled");
            element.disabled = false;
        }else{
            var element = document.getElementById("menu-scout-section");
            element.classList.add("disabled");
            element.disabled = true;
        }
        if(login.user.security > 10){  //CHANGE BACK TO 10
            var element = document.getElementById("menu-scout-pit");
            element.classList.remove("disabled");
            element.disabled = false;
        }else{
            var element = document.getElementById("menu-scout-pit");
            element.classList.add("disabled");
            element.disabled = true;
        }
        if(login.user.security > 20){ //CHANGE BACK TO 20
            var element = document.getElementById("menu-scout-match");
            element.classList.remove("disabled");
            element.disabled = false;
        }else{
            var element = document.getElementById("menu-scout-match");
            element.classList.add("disabled");
            element.disabled = true;
        }
        if(login.user.security > 80){ //CHANGE BACK TO 80
            var element = document.getElementById("menu-settings");
            element.classList.remove("disabled");
            element.disabled = false;
        }else{
            var element = document.getElementById("menu-settings");
            element.classList.add("disabled");
            element.disabled = true;
        }
        // var element = document.getElementById("menu-info");
        // //element.classList.add("disabled");
        // element.disabled = true;
        // var element = document.getElementById("menu-scout-pit");
        // //element.classList.add("disabled");
        // element.disabled = true;
        // var element = document.getElementById("menu-scout-practice");
        // //element.classList.add("disabled");
        // element.disabled = true;
        // var element = document.getElementById("menu-scout-training");
        // //element.classList.add("disabled");
        // element.disabled = true;
        // var element = document.getElementById("menu-scout-settings");
        // //element.classList.add("disabled");
        // element.disabled = true;

        match.loadMatches();

        setTab('menu');

        document.getElementById("login-username").value = "";
        document.getElementById("login-team").value = "";
    }else{
        alert("Incorrect username or password");
    }
    return false;
}

login.loginCreate = function(){
    var username = document.getElementById("login-create-username").value;
    username = username.trim();
    var teamnum = String(document.getElementById("login-create-team").value);
    $.get('createuser', { cmd: username + '-' + teamnum }, function() {});
    return true;
}

login.getScouter = function(){
    return {username: login.user.username, teamnum: login.user.teamnum};
}