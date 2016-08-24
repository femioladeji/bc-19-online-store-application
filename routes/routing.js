var UserController = require('./controllers/usercontroller');

// instantiate the usercontroller
var user = new UserController();

var routes = function(app) {
  app.post('/api/login', user.login);
  app.post('/api/register', user.register)
}

module.exports = routes;