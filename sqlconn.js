
exports.connect = function(){
    var Connection = require('tedious').Connection;

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
        } 
      }
    );
  
    var Request = require('tedious').Request;  


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
            console.log(result);  
        });  
    
        request.on('requestCompleted', function() {  
            console.log('complete');
            func(result);  
        });   
        connection.execSql(request);  
    }
}