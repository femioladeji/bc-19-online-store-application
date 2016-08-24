var UserController = require('./controllers/usercontroller');

// instantiate the usercontroller
var user = new UserController();

var routes = function(app) {
  app.get('/api/login', user.login);
}

module.exports = routes;