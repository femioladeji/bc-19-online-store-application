var DBController = require('./dbcontroller')

var db = new DBController();

var store = function() {
  this.getStores = function(request, response) {
    db.selectAll('stores', {'users_id':request.params.userid}, response);
  }
  this.createStore = function(request, response) {
    var details = request.body;
    details.users_id = request.decoded.id
    details.link = request.decoded.id+''+Date.now();
    db.insertToDb('stores', details, response);
  }
}

module.exports = store;