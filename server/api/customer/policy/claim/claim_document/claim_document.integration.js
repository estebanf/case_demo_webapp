'use strict';

var app = require('../../../server');
import request from 'supertest';

var newClaimDocument;

describe('ClaimDocument API:', function() {

  describe('GET /api/claim_documents', function() {
    var claimDocuments;

    beforeEach(function(done) {
      request(app)
        .get('/api/claim_documents')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          claimDocuments = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      claimDocuments.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/claim_documents', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/claim_documents')
        .send({
          name: 'New ClaimDocument',
          info: 'This is the brand new claimDocument!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newClaimDocument = res.body;
          done();
        });
    });

    it('should respond with the newly created claimDocument', function() {
      newClaimDocument.name.should.equal('New ClaimDocument');
      newClaimDocument.info.should.equal('This is the brand new claimDocument!!!');
    });

  });

  describe('GET /api/claim_documents/:id', function() {
    var claimDocument;

    beforeEach(function(done) {
      request(app)
        .get('/api/claim_documents/' + newClaimDocument._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          claimDocument = res.body;
          done();
        });
    });

    afterEach(function() {
      claimDocument = {};
    });

    it('should respond with the requested claimDocument', function() {
      claimDocument.name.should.equal('New ClaimDocument');
      claimDocument.info.should.equal('This is the brand new claimDocument!!!');
    });

  });

  describe('PUT /api/claim_documents/:id', function() {
    var updatedClaimDocument;

    beforeEach(function(done) {
      request(app)
        .put('/api/claim_documents/' + newClaimDocument._id)
        .send({
          name: 'Updated ClaimDocument',
          info: 'This is the updated claimDocument!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedClaimDocument = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedClaimDocument = {};
    });

    it('should respond with the updated claimDocument', function() {
      updatedClaimDocument.name.should.equal('Updated ClaimDocument');
      updatedClaimDocument.info.should.equal('This is the updated claimDocument!!!');
    });

  });

  describe('DELETE /api/claim_documents/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/claim_documents/' + newClaimDocument._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when claimDocument does not exist', function(done) {
      request(app)
        .delete('/api/claim_documents/' + newClaimDocument._id)
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
