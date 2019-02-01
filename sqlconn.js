var mysql = require('mysql');

var con = mysql.createConnection({
  host: "powerstackers.database.windows.net",
  user: "powerstacker",
  password: "701039By",
  database: "Scouting"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM users", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});