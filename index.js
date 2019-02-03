//Removes extra characters from output
baseDir = __dirname;

var http = require('http');
var pages = require(baseDir + '/pages');
var sql = require(baseDir + '/sqlconn');
sql.connect();

try{
    TelemetryConfiguration.Active.DisableTelemetry = true;
}catch(e){}

var server = http.createServer(function(request, response) {
    console.log(request.method + " - " + request.url);
    send = false;
    url = request.url;
    if(url.includes("?")){
        url = request.url.split("?")[0];
    }
    // response.end('nothing');
    for(name in pages.pages){
        if(pages.pages[name].url == url && send == false){
            if(typeof pages.pages[name].src === 'function'){
                response.writeHead(200, {'Content-Type': pages.pages[name].type});
                response.end(pages.pages[name].src(request, response));
            }else{
                pages.reloadPages();
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end('Website is loading, please refresh in a little.');
            }
            send = true;
        }
    }
    if(send == false){
        response.end();
    }
});

pages.sql = sql;

var port = process.env.PORT || 1337;

server.listen(port);