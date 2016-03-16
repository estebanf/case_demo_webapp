'use strict';

var app = require('../../../server');
import request from 'supertest';

var newPolicy;

describe('Policy API:', function() {

  describe('GET /api/customer/:customer_id/policies', function() {
    var policys;

    beforeEach(function(done) {
      request(app)
        .get('/api/customer/:customer_id/policies')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          policys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      policys.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/customer/:customer_id/policies', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/customer/:customer_id/policies')
        .send({
          name: 'New Policy',
          info: 'This is the brand new policy!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newPolicy = res.body;
          done();
        });
    });

    it('should respond with the newly created policy', function() {
      newPolicy.name.should.equal('New Policy');
      newPolicy.info.should.equal('This is the brand new policy!!!');
    });

  });

  describe('GET /api/customer/:customer_id/policies/:id', function() {
    var policy;

    beforeEach(function(done) {
      request(app)
        .get('/api/customer/:customer_id/policies/' + newPolicy._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          policy = res.body;
          done();
        });
    });

    afterEach(function() {
      policy = {};
    });

    it('should respond with the requested policy', function() {
      policy.name.should.equal('New Policy');
      policy.info.should.equal('This is the brand new policy!!!');
    });

  });

  describe('PUT /api/customer/:customer_id/policies/:id', function() {
    var updatedPolicy;

    beforeEach(function(done) {
      request(app)
        .put('/api/customer/:customer_id/policies/' + newPolicy._id)
        .send({
          name: 'Updated Policy',
          info: 'This is the updated policy!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPolicy = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPolicy = {};
    });

    it('should respond with the updated policy', function() {
      updatedPolicy.name.should.equal('Updated Policy');
      updatedPolicy.info.should.equal('This is the updated policy!!!');
    });

  });

  describe('DELETE /api/customer/:customer_id/policies/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/customer/:customer_id/policies/' + newPolicy._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when policy does not exist', function(done) {
      request(app)
        .delete('/api/customer/:customer_id/policies/' + newPolicy._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
