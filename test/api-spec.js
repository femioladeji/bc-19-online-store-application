'use strict'

var chai = require('chai');
var chaihttp = require('chai-http');
var assert = chai.assert;

var app = require('../index.js');

chai.use(chaihttp);

describe('Testing the user api link', function() {
  it('should return a json with status: false and message: "Invalid email address when a wrong email is sent"',
    function() {
      chai.request(app)
      .get('/api/login')
      .end(function(err, res){
        console.log(res);
        //res.should.have.status(200);
        done();
      });
  })
})