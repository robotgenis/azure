var http = require('http');

var server = http.createServer(function(request, response) {

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("<!DOCTYPE html><html><head><title>PowerStackers 5029</title></head><body><h1>Scouting Coming Soon</h1><p>Go powerstackers!.</p></body></html>");
    response.end();

});

var port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);
