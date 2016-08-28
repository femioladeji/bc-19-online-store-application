'use strict'

var chai = require('chai');
var chaihttp = require('chai-http');
var should = chai.should();
var assert = chai.assert;

var app = require('../index.js');

chai.use(chaihttp);

describe('Testing the user api link', function() {
  it('should return a json with status: false and message: "Invalid email address when a wrong email is sent"',
    function() {
      chai.request(app)
      .post('/api/login')
      .send({'email':'falseemail', 'password':'wrong'})
      .end(function(err, res){
        res.body.message.should.equal('Invalid');
      done();
      });
  })
})