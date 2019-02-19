//Removes extra characters from output
baseDir = __dirname;

var http = require('http');
var pages = require(baseDir + '/pages');
var sql = require(baseDir + '/sqlconn');
var loaded = false;

try{
    TelemetryConfiguration.Active.DisableTelemetry = true;
}catch(e){}

var server = http.createServer(function(request, response) {
    pages.sql = sql;
    console.log(request.method + " - " + request.url);
    if(!loaded){
        pages.reloadPages(function(){
            respond(request, response);
            loaded = true;
        });
    }else{
        respond(request, response);
    }
});

function respond(request, response){
    url = request.url;
    if(url.includes("?")){
        url = request.url.split("?")[0];5
    }
    send = false;
    for(name in pages.pages){
        if(pages.pages[name].url == url && send == false){
            if(typeof pages.pages[name].src === 'function'){
                response.writeHead(200, {'Content-Type': pages.pages[name].type});
                pages.pages[name].src(request, response, function(ret){response.end(ret);});
            }else{
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end("<a href='/' style='font-size: 4vh;'>Error 404</a>");
            }
            // response.writeHead(200, {'Content-Type': 'text/html'});
            // response.end("<h1 style='font-size: 3vh;'>Website is loading. </h1><a href='/' style='font-size: 4vh;'>continue</a>");
            send = true;
            break;
        }
    }
    if(send == false){
        response.end();
    }
}

var port = process.env.PORT || 1337;

server.listen(port);

// sql.connect();