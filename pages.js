var fs = require('fs');



exports.pages = {
    'root' : {'path': '/main.html','url':'/','src': null},
    'reload' : {'path' : null, 'url': '/reload','src':null},
    'sql' : {'path' : null, 'url': '/sql','src':null}
};

function loadPages(){
    for(name in exports.pages){
        if(exports.pages[name].path != null){
           loadPage(name);
        }
    }
    var files = fs.readdirSync(baseDir + '/html/');
    for(i in files){
        var name = files[i];
        //console.log(name);
        exports.pages[name] = {'path' : '/html/' + name, 'url': '/' + name, src: null};
        loadPage(name)
    }
    exports.pages.reload.src = function(request) {loadPages();};
    exports.pages.sql.src = function(request) {exports.sql.runCommand('SELECT username, team from dbo.users', function(results){console.log(results);})};
}

function loadPage(page){
    fs.readFile(baseDir + exports.pages[page].path, function(err, data) {
        exports.pages[page].src = function(request) {return data};
    });
}


exports.reloadPages = loadPages;