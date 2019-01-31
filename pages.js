var fs = require('fs');



exports.pages = {
    'root' : {'path': 'main.html','url':'/','src': null},
    // 'login' : {'path': 'html/login.html','url':'/login','src': null},
    // 'web.js' : {'path' : 'html/web.js', 'url': '/web.js','src':null},
    'reload' : {'path' : null, 'url': '/reload','src':null}
};


function loadPages(){
    for(name in exports.pages){
        if(exports.pages[name].path != null){
           loadPage(name);
        }
    }
    var files = fs.readdirSync('html/');
    for(i in files){
        var name = files[i];
        console.log(name);
        exports.pages[name] = {'path' : 'html/' + name, 'url': '/' + name, src: null};
        loadPage(name)
    }
    exports.pages.reload.src = function(request) {loadPages();};
}

function loadPage(page){
    fs.readFile(exports.pages[page].path, function(err, data) {
        exports.pages[page].src = function(request) {return data};
    });
}

loadPages();

exports.reloadPages = loadPages;