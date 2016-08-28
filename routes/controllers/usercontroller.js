var DBController = require('./dbcontroller')
const crypto = require('crypto');

/*function to generate salt and encypted password using crypto*/


var db = new DBController();

var UserController = function() {
  /*
    controller function for user login
  */
  this.login = function(req, res) {
    var data = req.body;
    details = {'email':data.email, 'password':data.password};
    db.login(details, res);
  }

  this.register = function(req, res) {
    var data = req.body;
    var passwordArray = hash(data.regpassword);
    var fullname = data.fullname.split(' ');
    var details = {'email':data.regemail, 'password':passwordArray[1], 'salt':passwordArray[0], 'firstname':fullname[0], 'lastname':fullname[1]};
    db.insertToDb('users', details, res);
  }

  this.getUserInfo = function(req, res) {
    db.selectAll('users', {'id':req.params.userid}, res);
  }

  this.updateUser = function(req, res) {
    details = req.body;
    var passwordArray = this.hash(details.password);
    details.password = passwordArray[1];
    details.salt = passwordArray[0];
    delete details['confirmpassword'];
    db.updateTable('users', details, {'id':req.decoded.id}, res);
  }

  this.getDashboard = function(req, res) {
    var userid = req.params.userid;
    db.responseHandler = res;
    db.getDashboardInfo(userid);
  }

  this.hash = function(rawstring) {
    var salt = crypto.randomBytes(16).toString('hex');
    var encrypted = crypto.pbkdf2Sync(rawstring, salt, 1000, 32, 'sha512').toString('hex');
    return [salt, encrypted];
  }
}

module.exports = UserController;