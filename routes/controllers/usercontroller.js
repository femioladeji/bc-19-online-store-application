var mysql = require('mysql');
var connection = mysql.createConnection({
  host      : '127.0.0.1',
  user      : 'root',
  password  : '',
  database  : 'online-store'
});

var UserController = function() {
  this.login = function(req, res) {
    console.log('logging in');
    connection.connect();
    connection.query('SELECT * from users', function(err, rows, fields) {
      if (!err)
        console.log('The solution is: ', rows);
      else
        console.log(err);
    });
  }
}

module.exports = UserController;