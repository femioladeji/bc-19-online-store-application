var express = require('express');
var routes = require('./routes/routing');

var app = express();
app.use(express.static(__dirname+'/public'));

/*
start express server
*/
routes(app);
app.listen(3000, function() {
    console.log('App is ready to be accessed on http://localhost:3000');
});

app.get('/', function(request, response){
    response.sendFile(__dirname+'/public/views/index.html');
})