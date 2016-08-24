var mysql = require('mysql');
const crypto = require('crypto');

function hash(rawstring, salt) {
  return crypto.pbkdf2Sync(rawstring, salt, 1000, 32, 'sha512').toString('hex');
}

var DBController = function() {
  this.connection = mysql.createPool({
    host      : '127.0.0.1',
    user      : 'root',
    password  : '',
    database  : 'online-store',
    connectionLimit : 100
  });

  this.responseHandler = {};

  this.insertToDb = function(tableName, dataToInsert, response) {
    this.responseHandler = response;
    var query = 'Insert into '+tableName+' (';
    var startFlag = true;
    for(var key in dataToInsert) {
      if(!startFlag) {
        query += ', ';
      }
      startFlag = false;
      query += key;
    }
    query += ') VALUES (';
    startFlag = true;
    for(var key in dataToInsert) {
      if(!startFlag) {
        query += ', ';
      }
      startFlag = false;
      query += "'"+dataToInsert[key]+"'"; 
    }
    query += ')';
    this.executeQuery(query);
  }

  this.executeQuery = function(query) {
    var instance = this
    this.connection.getConnection(function(err, connection) {
      connection.query(query, function(err, result) {
        if(!err) {
          instance.responseHandler.send('1');
        } else {
          instance.responseHandler.send('0');
        }
        instance.responseHandler.end();
      })
      connection.release();
    })
  }

  this.login = function(details, response) {
    var query = "SELECT * FROM users WHERE email = '"+details.email+"'";
    this.connection.getConnection(function(err, connection) {
      connection.query(query, function(err, result) {
        if(!err) {
          if(result.length == 0) {
            response.send('3');
          } else {
            var hashedPassword = hash(details.password, result[0].salt);
            if (hashedPassword === result[0].password) {
              response.send('1');
            } else {
              response.send('2');
            }
          }
        } else {
          response.send('0');
        }
        response.end();
      });
      connection.release();
    })
  }

}


module.exports = DBController;