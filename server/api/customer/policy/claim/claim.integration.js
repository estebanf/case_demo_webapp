'use strict';

var app = require('../../../server');
import request from 'supertest';

var newClaim;

describe('Claim API:', function() {

  describe('GET /api/claims', function() {
    var claims;

    beforeEach(function(done) {
      request(app)
        .get('/api/claims')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          claims = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      claims.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/claims', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/claims')
        .send({
          name: 'New Claim',
          info: 'This is the brand new claim!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newClaim = res.body;
          done();
        });
    });

    it('should respond with the newly created claim', function() {
      newClaim.name.should.equal('New Claim');
      newClaim.info.should.equal('This is the brand new claim!!!');
    });

  });

  describe('GET /api/claims/:id', function() {
    var claim;

    beforeEach(function(done) {
      request(app)
        .get('/api/claims/' + newClaim._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          claim = res.body;
          done();
        });
    });

    afterEach(function() {
      claim = {};
    });

    it('should respond with the requested claim', function() {
      claim.name.should.equal('New Claim');
      claim.info.should.equal('This is the brand new claim!!!');
    });

  });

  describe('PUT /api/claims/:id', function() {
    var updatedClaim;

    beforeEach(function(done) {
      request(app)
        .put('/api/claims/' + newClaim._id)
        .send({
          name: 'Updated Claim',
          info: 'This is the updated claim!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedClaim = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedClaim = {};
    });

    it('should respond with the updated claim', function() {
      updatedClaim.name.should.equal('Updated Claim');
      updatedClaim.info.should.equal('This is the updated claim!!!');
    });

  });

  describe('DELETE /api/claims/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/claims/' + newClaim._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when claim does not exist', function(done) {
      request(app)
        .delete('/api/claims/' + newClaim._id)
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
