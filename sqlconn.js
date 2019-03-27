var tedious = require('tedious');

var Connection = tedious.Connection;

var Request = tedious.Request;

var config = {
      server: "powerstackers.database.windows.net",
      // If you're on Windows Azure, you will need this:
      options: {encrypt: true, database: 'Scouting'},
      authentication: {
        type: "default",
        options: {  
          userName: "powerstacker",
          password: "701039By"
        }
      }
    };

// exports.connect = function(){
    
//     var connection = new Connection(config);
  
//     connection.on('connect', function(err) {
//       // If no error, then good to go...
//         if (err) {  
//             console.log(err); 
//         } else{
//             exports.refresh();
//         }
//       }
//     );
  
//     var Request = tedious.Request;  

//     exports.refresh = function(){
//         exports.runCommand('SELECT username, team, score, security from dbo.users', function(results){
//             exports.users = results;
//             console.log("Users loaded");
//             exports.runCommand('SELECT number, red1, red2, blue1, blue2 from dbo.matches', function(results){
//                 exports.matches = results;
//                 console.log("Matches loaded");
//                 exports.runCommand('SELECT teamnumber, teamname from dbo.teams', function(results){
//                     exports.teams = results;
//                     console.log("Teams loaded");
//                     exports.runCommand('SELECT data from dbo.matchData', function(results){
//                         exports.data = results;
//                         console.log("Data loaded");
//                         //turn on for mobile version
//                         //connection.close();
//                     });
//                 });
//             });
//         });
//     }

//     exports.refreshUsers = function(){
//         exports.runCommand('SELECT username, team, score, security from dbo.users', function(results){
//             exports.users = results;
//             console.log("Users loaded");
//         });
//     }

//     exports.refreshMatches = function(){
//         exports.runCommand('SELECT number, red1, red2, blue1, blue2 from dbo.matches', function(results){
//             exports.matches = results;
//             console.log("Matches loaded");
//         });
//     }

//     exports.refreshTeams = function(){
//         exports.runCommand('SELECT teamnumber, teamname, score, security from dbo.teams', function(results){
//             exports.teams = results;
//             console.log("Teams loaded");
//         });
//     }

//     exports.refreshData = function(){
//         exports.runCommand('SELECT data from dbo.matchData', function(results){
//             exports.data = results;
//             console.log("Data loaded");
//         });
//     }

//     exports.runCommand = function(str, func){
//         request = new Request(str, function(err) {  
//             if (err) {  
//                 console.log(err);}  
//             });  
        
//         var result = [];  

//         request.on('row', function(columns) {
//             add = [];
//             for(i in columns){
//                 add.push(columns[i].value);
//             }
//             result.push(add);
//             // console.log(result);  
//         });  
    
//         request.on('requestCompleted', function() {  
//             // console.log('complete');
//             func(result);  
//         });   
//         connection.execSql(request);  
//     }
// }

exports.connectAndSend = function(cmd, func){
    var connection = new Connection(config);
  
    connection.on('connect', function(err) {
      // If no error, then good to go...
        if (err) {  
            console.log(err); 
        } else{
            request = new Request(cmd, function(err) {  
                if (err) {  
                    console.log(err);}  
                });  
            
            var result = [];  
    
            request.on('row', function(columns) {
                add = [];
                for(i in columns){
                    add.push(columns[i].value);
                }
                result.push(add);
                // console.log(result);  
            });  
        
            request.on('requestCompleted', function() {  
                // console.log('complete');
                func(result, connection); 
                // connection.close(); 
            });   
            connection.execSql(request);  
        }
      }
    );
}

exports.send = function(cmd, connection, func){
    // var connection = new Connection(config);
  
    // connection.on('connect', function(err) {
    //   // If no error, then good to go...
    //     if (err) {  
    //         console.log(err); 
    //     } else{
    request = new Request(cmd, function(err) {  
        if (err) {  
            console.log(err);}  
        });  
    
    var result = [];  

    request.on('row', function(columns) {
        add = [];
        for(i in columns){
            add.push(columns[i].value);
        }
        result.push(add);
        // console.log(result);  
    });  

    request.on('requestCompleted', function() {  
        // console.log('complete');
        func(result, connection); 
        // connection.close(); 
    });   
    connection.execSql(request);  
}
    //   });
// }


exports.refresh = function(complete){
    exports.connectAndSend('SELECT username, team, score, security from dbo.users', function(results, connection){
        exports.users = results;
        console.log("SQL - Users loaded");
        exports.send('SELECT number, red1, red2, blue1, blue2 from dbo.matches', connection, function(results, connection){
            exports.matches = results;
            console.log("SQL - Matches loaded");
            exports.send('SELECT teamnumber, teamname from dbo.teams', connection, function(results, connection){
                exports.teams = results;
                console.log("SQL - Teams loaded");
                exports.send('SELECT data from dbo.matchData', connection, function(results, connection){
                    exports.data = results;
                    console.log("SQL - Data loaded");
                    connection.close();
                    complete();
                });
            });
        });
    });
}

exports.refreshUsers = function(connection, func){
    exports.send('SELECT username, team, score, security from dbo.users', connection, function(results, connection){
        exports.users = results;
        console.log("SQL - Users loaded");
        func(connection);
    });
}

exports.refreshMatches = function(connection, func){
    exports.send('SELECT number, red1, red2, blue1, blue2 from dbo.matches', connection, function(results, connection){
        exports.matches = results;
        console.log("SQL - Matches loaded");
        func(connection);
    });
}

exports.refreshTeams = function(connection, func){
    exports.send('SELECT teamnumber, teamname from dbo.teams', connection, function(results, connection){
        exports.teams = results;
        console.log("SQL - Teams loaded");
        func(connection);
    });
}

exports.refreshData = function(connection, func){
    exports.send('SELECT data from dbo.matchData', connection, function(results, connection){
        exports.data = results;
        console.log("SQL - Data loaded");
        func(connection);
    });
}