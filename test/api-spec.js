
var chai = require('chai');
var chaihttp = require('chai-http');
var should = chai.should();
//var assert = chai.assert;

var app = require('../index.js');
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNDcyNDQ1Njg5LCJleHAiOjE0NzI1MzIwODl9.ljwHfVgQXvJy22Yyj0fIL4TdPvCLTKl21FloXSJIFUQ';
chai.use(chaihttp);

describe('Testing the /api/login', function() {
  it('should return a json with status: false and message: "Invalid email address when a wrong email is sent"',
    function(done) {
      chai.request(app)
      .post('/api/login')
      .send({'email':'falseemail', 'password':'wrong'})
      .end(function(err, res) {
        res.body.message.should.equal('Invalid email address');
        done();
      });
  });

  it('should return a json with status: false and message: "Invalid password" when a wrong password is posted',
    function(done) {
      chai.request(app)
      .post('/api/login')
      .send({'email':'femidotexe@gmail.com', 'password':'wrong'})
      .end(function(err, res) {
        res.body.message.should.equal('Invalid password');
        done();
      });
  });

  it('should return a json with status: false and message: "Login successfull" when a wrong password is posted',
    function(done) {
      chai.request(app)
      .post('/api/login')
      .send({'email':'femidotexe@gmail.com', 'password':'password'})
      .end(function(err, res) {
        res.body.message.should.equal('Login successfull');
        res.body.should.have.property('token');
        done();
      });
  });
})

describe('Testing the /api/register end point', function() {
  it('should return false if an email that has been used before is sent', function(done) {
    chai.request(app)
      .post('/api/register')
      .send({regemail:'femidotexe@gmail.com', regpassword:'password', fullname:'Oladeji Femi'})
      .end(function(err, res) {
        res.body.should.equal(false);
        done();
      });
  })

  /*it('should return sql json object if successfull', function(done) {
    chai.request(app)
      .post('/api/register')
      .send({regemail:'new2@mail.com', regpassword:'password', fullname:'New User'})
      .end(function(err, res) {
        res.body.should.be.a('object');
        done();
      });
  })*/
})

describe('Testing the the /api/updateuser end point', function() {
  it('should return an html redirect to homepage if the token is not passed in the header', function(done) {
    chai.request(app)
      .post('/api/updateuser')
      .send({email:'new@mail.com', password:'changed', fullname:'New Updated'})
      .end(function(err, res) {
        res.should.have.property('text');
        done();
      });
  });

  it('should return a json object if the update was successful', function(done) {
    chai.request(app)
    .post('/api/updateuser')
    .send({email:'femidotexe@gmail.com', password:'password', firstname:'Javascript',  lastname:'Developer'})
    .set('x-access-token', token)
    .end(function(err, res) {
      res.body.should.be.a('object');
      done();
    })
  })

  it('should return false if an attempt was made to change to an already existing mail', function(done) {
    chai.request(app)
    .post('/api/updateuser')
    .send({email:'femi.pixels@gmail.com', password:'password', firstname:'Javascript',  lastname:'Developer'})
    .set('x-access-token', token)
    .end(function(err, res) {
      res.body.should.equal(false);
      done();
    })
  })
})

describe('Testing the /api/user/:userid endpoint', function() {
  it('should return an array containing info of the user', function(done) {
    chai.request(app)
    .get('/api/user/2')
    .set('x-access-token', token)
    .end(function(err, res) {
      res.body.should.be.a('Array');
      done();
    })
  })
})

describe('Testing the /api/dashboardinfo/:userid endpoint', function() {
  it('should return a json object with property storenumber and productpercategory', function(done) {
    chai.request(app)
    .get('/api/dashboardinfo/2')
    .set('x-access-token', token)
    .end(function(err, res) {
      res.body.should.be.a('object');
      res.body.should.have.property('storenumber');
      res.body.should.have.property('productpercategory');
      done();
    })
  })
})

describe('Testing the /api/store/:userid endpoint', function() {
  it('should return an array of stores', function(done) {
    chai.request(app)
    .get('/api/store/8')
    .set('x-access-token', token)
    .end(function(err, res) {
      res.body.should.be.a('Array');
      done();
    })
  })
})

describe('Testing the /api/store endpoint', function() {
  it('should return a confirmation json', function(done) {
    chai.request(app)
    .post('/api/store')
    .send({'storename':'Test store', 'description':'A brief description about the store', 'address':'Up and down', 'contact':'0987654318'})
    .set('x-access-token', token)
    .end(function(err, res) {
      res.body.should.be.a('object');
      done();
    });
  });
});

describe('Testing the /api/updatestore/:storeid endpoint', function() {
  it('should update store information and return a json', function(done) {
    chai.request(app)
    .post('/api/updatestore/19')
    .send({'storename':'Another Store', 'description':'Updated description', 'address':'Here', 'contact':'88978767'})
    .set('x-access-token', token)
    .end(function(err, res) {
      res.body.should.be.a('object');
      done();
    });
  })
})

describe('Testing the /api/productstore/:storeurl endpoint', function() {
  it('should return an array of at least one row if a valid link is sent', function(done) {
    chai.request(app)
    .get('/api/productstore/21472217906415')
    .end(function(err, res) {
      res.body.should.be.a('Array');
      done();
    })
  })
})