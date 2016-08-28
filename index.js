var express = require('express');
var routes = require('./routes/routing');
var httpreq = require('request');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
//for serving static css and js files
app.use(express.static(path.join(__dirname, '/public')));

//body parser for form handling
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//path to ejs templates and
//setting ejs for rendering
var setpath = path.join(__dirname, '/public/views/');
app.set('views', setpath);
app.set('view engine', 'ejs');


//start server
app.listen(3000, function() {
  console.log('App is ready to be accessed on http://localhost:3000');
});

//gets the index page
app.get('/', function(request, response) {
  response.render('index');
})

//public url for viewing products in a store
app.get('/productstore', function(request, response) {
  httpreq.get({
    url:'http://127.0.0.1:3000/api/productstore/'+request.query.link
  }, function(err, res, jsonresponse) {
    if(!err) {
      var products = JSON.parse(jsonresponse);
      var productList = products;
      if(products[0].product_name == null) {
        productList = [];
      }
      response.render('productstore', {
        products    : productList,
        shopname    : products[0].storename,
        description : products[0].description,
        address     : products[0].address,
        contact     : products[0].contact
      });
    } else {
      response.status(522).send('No internet access');
    }

  })
})


routes(app);

app.get('/home', function(request, response) {
  httpreq.get({
    url:'http://127.0.0.1:3000/api/user/'+request.decoded.id,
    headers:{
      'x-access-token': request.token
    }
  }, function(err, res, jsonresponse) {
    jsonresponse = JSON.parse(jsonresponse);
    response.render('home', {
      name:jsonresponse[0].firstname+' '+jsonresponse[0].lastname
    });
  })
})

app.get('/stores', function(request, response) {
  httpreq.get({
    'url':'http://127.0.0.1:3000/api/store/'+request.decoded.id,
    headers:{
      'x-access-token': request.token
    }
  }, function(err, res, jsonresponse) {
    response.render('stores', {
      'storelist':JSON.parse(jsonresponse)
    });
  })
  
})

app.get('/products', function(request, response) {
  httpreq.get({
    'url':'http://127.0.0.1:3000/api/product',
    headers:{
      'x-access-token': request.token
    }
  }, function(err, res, productList) {
    httpreq.get({
      'url':'http://127.0.0.1:3000/api/store/'+request.decoded.id,
      headers:{
        'x-access-token': request.token
      }
    }, function(err, res, storeList) {
      httpreq.get({
        'url':'http://127.0.0.1:3000/api/category',
        headers:{
          'x-access-token': request.token
        }
      }, function(err, res, categoryList) {
        response.render('products', {
          'productlist':JSON.parse(productList),
          'storeList':JSON.parse(storeList),
          'categoryList':JSON.parse(categoryList),
        });
      });
    });
  });
});

app.get('/user', function(request, response) {
  httpreq.get({
    'url':'http://127.0.0.1:3000/api/user/'+request.decoded.id,
    headers:{
      'x-access-token': request.token
    }
  }, function(err, res, userInfo) {
    response.render('user', {
      'user':JSON.parse(userInfo)[0]
    });
  })
})

app.get('/dashboard', function(request, response) {
  httpreq.get({
    'url':'http://127.0.0.1:3000/api/dashboardinfo/'+request.decoded.id,
    headers:{
      'x-access-token': request.token
    }
  }, function(err, res, details) {
    details = JSON.parse(details);
    response.render('dashboard', {
      storenumber : details.storenumber,
      productcat  : details.productpercategory, 
    });
  })
  
})

module.exports = app;

