var jwt = require('jsonwebtoken');
var express = require('express');
var UserController = require('./controllers/usercontroller');
var StoreController = require('./controllers/storecontroller');


// instantiate the usercontroller
var user = new UserController();
var store = new StoreController();

var apiRoutes = express.Router();

var routes = function(app) {
  apiRoutes.post('/api/login', user.login);
  apiRoutes.post('/api/register', user.register);


  // route middleware to verify token
  apiRoutes.use(function(req, res, next) {
    var token = req.body.token || req.query.q || req.headers['x-access-token'];
    if(token) {
      jwt.verify(token, 'secret', function(err, decoded) {
        if(err) {
          return res.json({status:false, message:'Token authentication failed'});
        } else {
          req.decoded = decoded;
          req.token = token;
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

  apiRoutes.get('/api/store', store.getStores);

  apiRoutes.post('/api/store', store.createStore)

  apiRoutes.get('/api/user/:userid', user.getUserInfo);
}

module.exports = routes;