var DBController = require('./dbcontroller')
const crypto = require('crypto');

function hash(rawstring) {
  var salt = crypto.randomBytes(16).toString('hex');
  var encrypted = crypto.pbkdf2Sync(rawstring, salt, 1000, 32, 'sha512').toString('hex');
  return [salt, encrypted];
}

var db = new DBController();

var UserController = function() {
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
    db.selectAll('users', {'id':req.decoded.id}, res);
  }
}

module.exports = UserController;