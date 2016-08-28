var mysql = require('mysql');
var jwt = require('jsonwebtoken');
require('dotenv').config();
const crypto = require('crypto');

function hash(rawstring, salt) {
  return crypto.pbkdf2Sync(rawstring, salt, 1000, 32, 'sha512').toString('hex');
}

var DBController = function() {
  this.connection = mysql.createPool({
    host      : process.env.DBHOST,
    user      : process.env.DBUSER,
    password  : process.env.DBPASSWORD,
    database  : process.env.DBNAME,
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
      if(err) {
        console.log('Please check your mysql server and parameters')
        //instance.responseHanler.send('Check your mysql server and parameters');
      }
      connection.query(query, function(err, result) {
        connection.release();
        if(err) instance.responseHandler.json(false);
        else instance.responseHandler.json(result);
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
    var query = "SELECT * FROM "+tablename;
    if(whereClause != null) {
      query += " WHERE ";
    }
    var startFlag = true;
    for(key in whereClause) {
      if(!startFlag) {
        query += ' AND ';
      }
      startFlag = false;
      query += key+" = '"+whereClause[key]+"'";
    }
    this.executeQuery(query);
  }

  this.getProducts = function(storeurl, response) {
    this.responseHandler = response;
    var query = "SELECT * FROM products INNER JOIN stores ON stores_id = stores.id AND stores.link = '"+storeurl+"' INNER JOIN category ON category.id = category_id";
    this.executeQuery(query);
  }

  this.updateTable = function(tableName, data, whereClause, response) {
    this.responseHandler = response;
    var query = "UPDATE "+tableName+" SET ";
    var startFlag = true;
    for(var key in data) {
      if(!startFlag) {
        query += ', ';
      }
      query += key +" = '"+data[key]+"'";
      startFlag = false;
    }
    query += ' WHERE ';
    startFlag = true;
    for(var key in whereClause) {
      if(!startFlag) {
        query += ' AND ';
      }
      query += key +" = '"+whereClause[key]+"'";
      startFlag = false;
    }
    this.executeQuery(query);
  }

  this.getDashboardInfo = function(userid) {
    var thisInstance = this;
    var numberofstoresquery = "SELECT COUNT(id) AS number FROM stores WHERE users_id = "+userid;
    this.connection.getConnection(function(err, connection) {
      connection.query(numberofstoresquery, function(err, result) {
        var numberofstores = result[0].number;
        var query = "SELECT category_name, COUNT(products.id) AS numberofproducts FROM category, products, stores WHERE stores.users_id = "+ userid +" AND products.stores_id = stores.id AND category.id = category_id GROUP BY category_id";
        connection.query(query, function(err, result) {
          connection.release();
          thisInstance.responseHandler.json({storenumber : numberofstores, productpercategory : result});
          thisInstance.responseHandler.end();
        })
      })
    });
  }
}


module.exports = DBController;