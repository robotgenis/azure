var fs = require('fs');


function resetPages(){
    exports.pages = {
        'root' : {'path': '/main.html','url':'/','src': null},
        'reload' : {'path' : null, 'url': '/reload','src':null},
        'sql' : {'path' : null, 'url': '/sql','src':null}
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
    exports.pages.reload.src = function(request) {loadPages();return "<a href='/'>return</a>"};
    exports.pages.sql.src = function(request) {exports.sql.runCommand('SELECT username, team from dbo.users', function(results){console.log(results);})};
}

function loadFolder(path){
    var files = fs.readdirSync(baseDir + path);
    for(i in files){
        var name = files[i];
        //console.log(baseDir + path + name);
        if(name.includes(".")){
            exports.pages[name] = {'path' : baseDir + path + name, 'url': '/' + name, src: null};
            loadPage(name);
        }else{
            loadFolder(path + name + '/');
        }
    }
}

function loadPage(page){
    fs.readFile(exports.pages[page].path, function(err, data) {
        exports.pages[page].src = function(request) {return data};
    });
}

resetPages();
exports.reloadPages = function(){loadPages();};