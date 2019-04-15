var fs = require('fs');

function resetPages() {
    exports.pages = {
        'root': { 'path': '/main.html', 'type': 'text/html', 'url': '/', 'src': null },//main.html
        'reload': { 'path': null, 'type': 'text/html', 'url': '/reload', 'src': null },
        'sql': { 'path': null, 'type': 'text/html', 'url': '/sql', 'src': null },
        'createuser': { 'path': null, 'type': 'text/html', 'url': '/createuser', 'src': null },
        'settings': { 'path': null, 'type': 'text/html', 'url': '/settings', 'src': null },
        'submit': { 'path': null, 'type': 'text/html', 'url': '/submit', 'src': null },
        //'get' : {'path' : null, 'type' : 'text/html', 'url': '/get','src':null},
        'check': { 'path': null, 'type': 'text/html', 'url': '/check', 'src': null },
    };
}

function loadPages(loadComplete) {
    resetPages();

    exports.sql.refresh(function (args) {
        for (name in exports.pages) {
            if (exports.pages[name].path != null) {
                exports.pages[name].path = baseDir + exports.pages[name].path;
                loadPage(name);
            }
        }
        loadFolder('/html/');
        exports.pages.reload.src = function (request, response, end) {
            loadPages(function () {
                //exports.pages.root.src(request, response, end);
                end("<a href='/' style='font-size: 5vh;'>Successfully Reloaded, click to contiune</a><script>window.location.href = '/';</script>");
            });
        };
        exports.pages.sql.src = function (request, response, end) {
            var cmd = request.url.split("?")[1].split("=")[1];
            var cmds = { "users": exports.sql.users, "matches": exports.sql.matches, "teams": exports.sql.teams, "data": exports.sql.data, "scouting": exports.sql.scouting };
            //console.log(cmds);
            if (cmd in cmds) {
                end(JSON.stringify(cmds[cmd]));
            }
        };
        exports.pages.createuser.src = function (request, response, end) {
            var cmd = request.url.split("?")[1].split("=")[1].split("-");
            var username = cmd[0];
            var teamnum = cmd[1];
            exports.sql.connectAndSend("INSERT INTO dbo.users (username, team, score, security) VALUES ('" + username + "', " + teamnum + ", 100, 2);", function (results, connection) {
                exports.sql.refreshUsers(connection, function (connection) {
                    connection.close();
                    end("SUCCESS!");
                });
            });
        }
        exports.pages.submit.src = function (request, response, end) {
            var body = '';
            request.on('data', function (data) {
                body += data;
            });
            request.on('end', function () {
                var format = JSON.parse(body);
                var cmd = "";  /// "INSERT INTO dbo.matchData (json) VALUES ('" + format + "');"
                for (i = 0; i < format.length; i++) {
                    if (format[i].type == "match") {
                        cmd += "INSERT INTO dbo.matchData (data) VALUES ('" + JSON.stringify(format[i]) + "');";
                    } else if (format[i].type == "score") {
                        cmd += "UPDATE dbo.users SET score=score + " + format[i].score + " WHERE username='" + format[i].scouter.username + "' AND team=" + format[i].scouter.teamnum + ";";
                    } else if (format[i].type == "cert") {
                        console.log(format);
                        cmd += "UPDATE dbo.users SET security=30 WHERE username='" + format[i].scouter.username + "' AND team=" + format[i].scouter.teamnum + ";";
                    }
                }
                exports.sql.connectAndSend(cmd, function (results, connection) {
                    exports.sql.refreshUsers(connection, function (connection) {
                        exports.sql.refreshData(connection, function (connection) {
                            connection.close();
                            end("SUCCESS!");
                        });
                    });
                    // exports.sql.send('SELECT username, team, score, security from dbo.users', connection, function(results, connection){
                    //     exports.sql.users = results;
                    //     console.log("Users loaded");
                    //     exports.sql.send('SELECT data from dbo.matchData', connection, function(results, connection){
                    //         exports.sql.data = results;
                    //         console.log("Data loaded");
                    // connection.close();
                    // end("SUCCESS!");
                    //     });
                    // });
                });
            });
        }
        exports.pages.settings.src = function (request, response, end) {
            var body = '';
            request.on('data', function (data) {
                body += data;
            });
            request.on('end', function () {
                var format = JSON.parse(body);
                var cmd = "";
                console.log(format);
                if (format.type == "team") {
                    cmd = "IF NOT EXISTS ( SELECT 1 FROM dbo.teams WHERE teamnumber = " + format.teamnum + ") BEGIN INSERT INTO dbo.teams (teamnumber, teamname) VALUES (" + format.teamnum + ", '" + format.teamname + "') END; ELSE BEGIN UPDATE dbo.teams SET teamname='" + format.teamname + "' WHERE teamnumber=" + format.teamnum + "; END;";
                    exports.sql.connectAndSend(cmd, function (results, connection) {
                        exports.sql.refreshTeams(connection, function (connection) {
                            connection.close();
                            end("SUCCESS!");
                        })
                    });
                } else if (format.type == "match") {
                    cmd = "IF NOT EXISTS ( SELECT 1 FROM dbo.matches WHERE number = " + format.number + ") BEGIN INSERT INTO dbo.matches (number, red1, red2, blue1, blue2) VALUES (" + format.number + ", " + format.red1 + ", " + format.red2 + ", " + format.blue1 + ", " + format.blue2 + ") END; ELSE BEGIN UPDATE dbo.matches SET red1=" + format.red1 + ", red2=" + format.red2 + ", blue1=" + format.blue1 + ", blue2=" + format.blue2 + " WHERE number=" + format.number + "; END;";
                    exports.sql.connectAndSend(cmd, function (results, connection) {
                        exports.sql.refreshMatches(connection, function (connection) {
                            connection.close();
                            end("SUCCESS!");
                        })
                    });
                } else if (format.type == "scouting") {
                    /*type: "scouting",
                    scouter: {name: "Brandon", num: 5029},
                    position: "red1/red2/blue1/blue2/alt",
                    matches: {start: 1, end: 30}*/
                    cmd = "";
                    for (i = format.matches.start; i <= format.matches.end; i++) {
                        cmd += "IF NOT EXISTS ( SELECT 1 FROM dbo.scouting WHERE number = " + String(i) + ") BEGIN INSERT INTO dbo.scouting (number, " + format.position + ") VALUES (" + String(i) + ", '" + format.scouter + "') END; ELSE BEGIN UPDATE dbo.scouting SET " + format.position + "='" + format.scouter + "' WHERE number=" + String(i) + "; END;";
                    }
                    //console.log(cmd);
                    exports.sql.connectAndSend(cmd, function (results, connection) {
                        exports.sql.refreshScouting(connection, function (connection) {
                            connection.close();
                            end("SUCCESS!");
                        })
                    });
                } else if (format.type == "user") {
                    /*{type: "user",
                    name: "Brandon",
                    teamnum: 00001,
                    score: 100,
                    security: 30}*/
                    cmd = "IF NOT EXISTS ( SELECT 1 FROM dbo.users WHERE username = '" + format.name + "' AND team = " + format.teamnum + ") BEGIN INSERT INTO dbo.users (username, team, score, security) VALUES ('" + format.name + "', " + format.teamnum + ", " + format.score + ", " + format.security + ") END; ELSE BEGIN UPDATE dbo.users SET score=" + format.score + ", security=" + format.security + " WHERE username='" + format.name + "' and team=" + format.teamnum + "; END;";
                    console.log(cmd);
                    exports.sql.connectAndSend(cmd, function (results, connection) {
                        exports.sql.refreshUsers(connection, function (connection) {
                            connection.close();
                            end("SUCCESS!");
                        })
                    });
                }
            });
        }
        exports.pages.check.src = function (request, response, end) { end("SUCCESS!"); };
        loadComplete();
    });
}

function loadFolder(path) {
    var files = fs.readdirSync(baseDir + path);
    for (i in files) {
        var name = files[i];
        //console.log(baseDir + path + name);
        if (name.includes(".")) {
            var types = { "html": 'text/html', "css": 'text/css', "js": 'text/javascript', 'default': "text/html", 'png': 'image/png' };
            var arr = name.split('.');
            var typ = arr[arr.length - 1];
            if (typ in types) {
                typ = types[typ];
            } else {
                type = types['default'];
            }
            exports.pages[name] = { 'path': baseDir + path + name, 'type': typ, 'url': '/' + name, src: null };
            loadPage(name);
        } else {
            loadFolder(path + name + '/');
        }
    }
}

function loadPage(page) {
    var data = fs.readFileSync(exports.pages[page].path);
    exports.pages[page].src = function (request, response, end) { end(data); };
}

resetPages();
exports.reloadPages = function (loadComplete) { loadPages(loadComplete); };