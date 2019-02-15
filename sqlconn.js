var tedious = require('tedious');

exports.connect = function(){
    var Connection = tedious.Connection;

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
  
    var connection = new Connection(config);
  
    connection.on('connect', function(err) {
      // If no error, then good to go...
        if (err) {  
            console.log(err); 
        } else{
            exports.refresh();
        }
      }
    );
  
    var Request = tedious.Request;  

    exports.refresh = function(){
        exports.runCommand('SELECT username, team, score, security from dbo.users', function(results){
            exports.users = results;
            console.log("Users loaded");
            exports.runCommand('SELECT number, red1, red2, blue1, blue2 from dbo.matches', function(results){
                exports.matches = results;
                console.log("Matches loaded");
                exports.runCommand('SELECT teamnumber, teamname from dbo.teams', function(results){
                    exports.teams = results;
                    console.log("Teams loaded");
                    exports.runCommand('SELECT data from dbo.matchData', function(results){
                        exports.data = results;
                        console.log("Data loaded");
                        //turn on for mobile version
                        //connection.close();
                    });
                });
            });
        });
    }

    exports.refreshUsers = function(){
        exports.runCommand('SELECT username, team, score, security from dbo.users', function(results){
            exports.users = results;
            console.log("Users loaded");
        });
    }

    exports.refreshMatches = function(){
        exports.runCommand('SELECT number, red1, red2, blue1, blue2 from dbo.matches', function(results){
            exports.matches = results;
            console.log("Matches loaded");
        });
    }

    exports.refreshTeams = function(){
        exports.runCommand('SELECT teamnumber, teamname, score, security from dbo.teams', function(results){
            exports.teams = results;
            console.log("Teams loaded");
        });
    }

    exports.refreshData = function(){
        exports.runCommand('SELECT data from dbo.matchData', function(results){
            exports.data = results;
            console.log("Data loaded");
        });
    }

    exports.runCommand = function(str, func){
        request = new Request(str, function(err) {  
            if (err) {  
                console.log(err);}  
            });  
        
        var result = [];  

        request.on('row', function(columns) {
            add = [];
            for(i in columns){
                add.push(columns[i].value);
            }
            result.push(add)
            // console.log(result);  
        });  
    
        request.on('requestCompleted', function() {  
            // console.log('complete');
            func(result);  
        });   
        connection.execSql(request);  
    }
}