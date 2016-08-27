var jwt = require('jsonwebtoken');
var multer = require('multer');
var express = require('express');

var UserController = require('./controllers/usercontroller');
var StoreController = require('./controllers/storecontroller');
var ProductController = require('./controllers/productcontroller');

var upload = multer({dest:'public/images/productimages/'});
// instantiate the usercontroller
var user = new UserController();
var store = new StoreController();
var product = new ProductController();

var apiRoutes = express.Router();

var routes = function(app) {
  apiRoutes.post('/api/login', user.login);
  apiRoutes.post('/api/register', user.register);

  apiRoutes.get('/api/productstore/:storeurl', store.getProductsInStore);

  // route middleware to verify token
  apiRoutes.use(function(req, res, next) {
    var token = req.query.q || req.headers['x-access-token'];
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

  apiRoutes.get('/api/store/:userid', store.getStores);

  apiRoutes.post('/api/store', store.createStore)

  apiRoutes.get('/api/user/:userid', user.getUserInfo);

  apiRoutes.get('/api/product/:storeid', product.getProducts);

  apiRoutes.get('/api/product', product.getProducts);

  apiRoutes.post('/api/product', upload.single('product_image'), product.createProduct);
}

module.exports = routes;