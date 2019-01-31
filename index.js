//Removes extra characters from output
//TelemetryConfiguration.Active.DisableTelemetry = true;
var http = require('http');
var pages = require('./JSlibs/pages');


var server = http.createServer(function(request, response) {
    console.log(request.method + " - " + request.url);
    send = false
    for(name in pages.pages){
        if(pages.pages[name].url == request.url && send == false){
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(pages.pages[name].src(request));
            send = true;
        }
    }
    if(send == false){
        response.end();
    }
});


var port = process.env.PORT || 1337;
server.listen(port);




// var Connection = require('tedious').Connection;
// var Request = require('tedious').Request;

// // Create connection to database
// var config =
// {
//     userName: 'powerstacker', // update me
//     password: '701039By', // update me
//     server: 'powerstackers.database.windows.net', // update me
//     options:
//     {
//         database: 'Scouting', //update me
//         encrypt: true
//     }
// }
// var connection = new Connection(config);

// // Attempt to connect and execute queries if connection goes through
// connection.on('connect', function(err)
//     {
//         if (err)
//         {
//             console.log(err)
//         }
//         else
//         {
//             queryDatabase()
//         }
//     }
// );

// function queryDatabase()
// {
//     console.log('Reading rows from the Table...');

//     // Read all rows from table
//     var request = new Request(
//         "INSERT INTO dbo.teams VALUES ('The NUTS!', 6133)",
//         //"SELECT username, team from dbo.users",
//         function(err, rowCount, rows)
//         {
//             console.log(rowCount + ' row(s) returned');
//             process.exit();
//         }
//     );

//     request.on('row', function(columns) {
//         columns.forEach(function(column) {
//             console.log("%s\t%s", column.metadata.colName, column.value);

//         });
//     });
//     connection.execSql(request);
// }
