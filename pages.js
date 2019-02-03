var fs = require('fs');

var users;

function resetPages(){
    exports.pages = {
        'root' : {'path': '/main.html', 'type' : 'text/html', 'url':'/','src': null},
        'reload' : {'path' : null, 'type' : 'text/html', 'url': '/reload','src':null},
        'sql' : {'path' : null, 'type' : 'text/html', 'url': '/sql','src':null}
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
    exports.pages.reload.src = function(request, response) {loadPages();return "<a href='/'>return</a>"};
    exports.pages.sql.src = function(request, response) {
        var cmd = request.url.split("?")[1].split("=")[1];
        var cmds = {"users": users};
        console.log(cmds);
        if(cmd in cmds){
            return JSON.stringify(cmds[cmd]);
        }
    };

    refreshSQL();
}

function loadFolder(path){
    var files = fs.readdirSync(baseDir + path);
    for(i in files){
        var name = files[i];
        //console.log(baseDir + path + name);
        if(name.includes(".")){
            exports.pages[name] = {'path' : baseDir + path + name, 'type' : 'text/html', 'url': '/' + name, src: null};
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

function refreshSQL(){
    exports.sql.runCommand('SELECT username, team, score from dbo.users', function(results){
        users = results;
    });
}

resetPages();
exports.reloadPages = function(){loadPages();};