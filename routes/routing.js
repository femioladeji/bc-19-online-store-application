var jwt = require('jsonwebtoken');
var express = require('express');
var UserController = require('./controllers/usercontroller');

// instantiate the usercontroller
var user = new UserController();

var routes = function(app) {
  app.post('/api/login', user.login);
  app.post('/api/register', user.register);

  var apiRoutes = express.Router();

  // route middleware to verify token
  apiRoutes.use(function(req, res, next) {
    var token = req.body.token || req.query.q || req.headers['x-access-token'];

    if(token) {
      jwt.verify(token, 'secret', function(err, decoded) {
        if(err) {
          return res.json({status:false, message:'Token authentication failed'});
        } else {
          req.decoded = decoded;
          next();
        }
      })
    } else {
      return res.status(403).redirect('/');
    }
  })

  app.use('/', apiRoutes);
  app.use('/api', apiRoutes);

  /*app.get('/', function(req, res) {
    console.log(req.decoded);
  });*/
}

module.exports = routes;