var DBController = require('./dbcontroller')
var fs = require('fs');

var db = new DBController();

var product = function() {
  this.getProducts = function(request, response) {
    if(request.params.storeid == undefined) {
      var query = "SELECT *, products.id AS productid FROM stores INNER JOIN products ON products.stores_id = stores.id AND stores.users_id = "+request.decoded.id;
      db.responseHandler = response;
      db.executeQuery(query);
    } else {
      db.selectAll('products', {'stores_id':request.params.storeid}, response);
    }
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
}

module.exports = product;