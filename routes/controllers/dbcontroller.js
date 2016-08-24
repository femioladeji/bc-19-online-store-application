var mysql = require('mysql');

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
}
module.exports = DBController;