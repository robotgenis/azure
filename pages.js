var fs = require('fs');

function resetPages(){
    exports.pages = {
        'root' : {'path': '/main.html', 'type' : 'text/html', 'url':'/','src': null},
        'reload' : {'path' : null, 'type' : 'text/html', 'url': '/reload','src':null},
        'sql' : {'path' : null, 'type' : 'text/html', 'url': '/sql','src':null},
        'createuser' : {'path' : null, 'type' : 'text/html', 'url': '/createuser','src':null},
        'submit' : {'path' : null, 'type' : 'text/html', 'url': '/submit','src':null},
        'get' : {'path' : null, 'type' : 'text/html', 'url': '/submit','src':null},
        'check' : {'path' : null, 'type' : 'text/html', 'url': '/check','src':null},
    };
}

function loadPages(){
    resetPages();

    for(name in exports.pages){
        if(exports.pages[name].path != null){
            exports.pages[name].path = baseDir + exports.pages[name].path;
            loadPage(name);
        }
    }
    loadFolder('/html/');
    exports.pages.reload.src = function(request, response) {loadPages();return "<a href='/' style='font-size: 5vh;'>continue</a>"};
    exports.pages.sql.src = function(request, response) {
        var cmd = request.url.split("?")[1].split("=")[1];
        var cmds = {"users": exports.sql.users, "matches" : exports.sql.matches, "teams" : exports.sql.teams};
        //console.log(cmds);
        if(cmd in cmds){
            return JSON.stringify(cmds[cmd]);
        }
    };
    exports.pages.createuser.src = function(request, response){
        var cmd = request.url.split("?")[1].split("=")[1].split("-");
        var username = cmd[0];
        var teamnum = cmd[1];
        exports.sql.runCommand("INSERT INTO dbo.users (username, team, score, security) VALUES ('" + username + "', " + teamnum + ", 0, 2);", function(results){
            exports.sql.refreshUsers();
        });
    }
    exports.pages.submit.src = function(request, response){
        var body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function () {
            console.log("Submit: " + body);
            var format = JSON.parse(body);
            var cmd = "";  /// "INSERT INTO dbo.matchData (json) VALUES ('" + format + "');"
            for(i = 0; i < format.length; i++){
                if(format[i].type == "match"){
                    cmd += "INSERT INTO dbo.matchData (data) VALUES ('" + JSON.stringify(format[i]) + "');";
                }else if(format[i].type == "score"){
                    cmd += "UPDATE dbo.users SET score=score + " + format[i].score + " WHERE username='" + format[i].scouter.username + "' AND team=" + format[i].scouter.teamnum + ";"
                }
            }
            console.log(cmd);
            exports.sql.runCommand(cmd, function(results){
                exports.sql.runCommand('SELECT username, team, score, security from dbo.users', function(results){
                    exports.sql.users = results;
                    console.log("Users loaded");
                    exports.sql.runCommand('SELECT data from dbo.matchData', function(results){
                        exports.sql.data = results;
                        console.log("Data loaded");
                    });
                });
            });
        });
    }
    exports.pages.check.src = function(request, response) {return "CONNECTED!"};
}

function loadFolder(path){
    var files = fs.readdirSync(baseDir + path);
    for(i in files){
        var name = files[i];
        //console.log(baseDir + path + name);
        if(name.includes(".")){
            var types = {"html" : 'text/html', "css" : 'text/css', "js" : 'text/javascript', 'default' : "text/html", 'png': 'image/png'};
            var arr = name.split('.');
            var typ = arr[arr.length - 1];
            if(typ in types){
                typ = types[typ];
            }else{
                type = types['default'];
            }
            exports.pages[name] = {'path' : baseDir + path + name, 'type' : typ, 'url': '/' + name, src: null};
            loadPage(name);
        }else{
            loadFolder(path + name + '/');
        }
    }
}

function loadPage(page){
    fs.readFile(exports.pages[page].path, function(err, data) {
        exports.pages[page].src = function(request, response) {return data};
    });
}

resetPages();
exports.reloadPages = function(){loadPages();};