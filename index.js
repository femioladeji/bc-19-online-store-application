var express = require('express');
var routes = require('./routes/routing');
var httpreq = require('request');
var bodyParser = require('body-parser');

var path = __dirname+'/public/views/';
var app = express();
app.use(express.static(__dirname+'/public'));

//body parser for form handling
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.set('views', path);
app.set('view engine', 'ejs');

app.listen(3000, function() {
  console.log('App is ready to be accessed on http://localhost:3000');
});

app.get('/', function(request, response) {
  response.render('index');
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
  }, function(err, res, productlist) {
    httpreq.get({
      'url':'http://127.0.0.1:3000/api/store/'+request.decoded.id,
      headers:{
        'x-access-token': request.token
      }
    }, function(err, res, storeList) {
      response.render('products', {
        'productlist':JSON.parse(productlist),
        'storeList':JSON.parse(storeList)
      });
    })
  })
})



