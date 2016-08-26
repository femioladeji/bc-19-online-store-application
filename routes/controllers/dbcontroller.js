var mysql = require('mysql');
var jwt = require('jsonwebtoken');

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
        connection.release();
        instance.responseHandler.json(result);
        instance.responseHandler.end();
      })
    })
  }

  this.login = function(details, response) {
    var query = "SELECT * FROM users WHERE email = '"+details.email+"'";
    this.connection.getConnection(function(err, connection) {
      connection.query(query, function(err, result) {
        if(!err) {
          if(result.length == 0) {
            response.json({status:false, message:'Invalid email address'});
          } else {
            var hashedPassword = hash(details.password, result[0].salt);
            if (hashedPassword === result[0].password) {
              var token = jwt.sign({id:result[0].id}, 'secret', {
                expiresIn: '24h' //expires in 24 hours
              })
              response.json({status:true, message:'Login successfull', token:token});
            } else {
              response.json({status:false, message:'Invalid password'});
            }
          }
        } else {
          response.json({status:false, message:'An error occurred, please try again'});
        }
        response.end();
      });
      connection.release();
    })
  }

  this.selectAll = function(tablename, whereClause, response) {
    this.responseHandler = response;
    var query = "SELECT * FROM "+tablename+" WHERE ";
    var startFlag = true;
    for(key in whereClause) {
      if(!startFlag) {
        query += ' AND '
      }
      startFlag = false;
      query += key+" = '"+whereClause[key]+"'";
    }
    this.executeQuery(query);
  }
}


module.exports = DBController;