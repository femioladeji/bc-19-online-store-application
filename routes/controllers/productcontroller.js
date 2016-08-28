var DBController = require('./dbcontroller')
var fs = require('fs');

var db = new DBController();

var product = function() {
  this.getProducts = function(request, response) {
    if(request.params.storeid == undefined) {
      var query = "SELECT *, products.id AS productid FROM stores INNER JOIN products ON products.stores_id = stores.id AND stores.users_id = "+request.decoded.id +" INNER JOIN category ON category.id = category_id";
    } else {
      var query = "SELECT *, products.id AS productid FROM products INNER JOIN category ON products.stores_id = "+request.params.storeid+" AND category.id = category_id";
    }
    db.responseHandler = response;
    db.executeQuery(query);
  }

  this.createProduct = function(request, response) {
    var filedetails = request.file;
    var filetype = filedetails.mimetype.split('/')
    if(filetype[0] != 'image') {
      response.json({status:false, message:'Invalid product image'});
      response.end();
    } else {
      var details = request.body;
      fs.rename(filedetails.path, filedetails.path+'.'+filetype[1]);
      details.product_image = filedetails.filename+'.'+filetype[1];
      db.insertToDb('products', details, response);
    }
  }

  this.getCategory = function(request, response) {
    db.selectAll('category', null, response);
  }

  this.updateProduct = function(request, response) {
    var filedetails = request.file;
    var filetype = filedetails.mimetype.split('/')
    if(filetype[0] != 'image') {
      response.json({status:false, message:'Invalid product image'});
      response.end();
    } else {
      var details = request.body;
      fs.rename(filedetails.path, filedetails.path+'.'+filetype[1]);
      details.product_image = filedetails.filename+'.'+filetype[1];
      db.updateTable('products', details, {'id':request.params.productid}, response);
    }
  }
}

module.exports = product;