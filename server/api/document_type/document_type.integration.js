'use strict';

var app = require('../../../server');
import request from 'supertest';

var newDocumentType;

describe('DocumentType API:', function() {

  describe('GET /api/document_types', function() {
    var documentTypes;

    beforeEach(function(done) {
      request(app)
        .get('/api/document_types')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          documentTypes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      documentTypes.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/document_types', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/document_types')
        .send({
          name: 'New DocumentType',
          info: 'This is the brand new documentType!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newDocumentType = res.body;
          done();
        });
    });

    it('should respond with the newly created documentType', function() {
      newDocumentType.name.should.equal('New DocumentType');
      newDocumentType.info.should.equal('This is the brand new documentType!!!');
    });

  });

  describe('GET /api/document_types/:id', function() {
    var documentType;

    beforeEach(function(done) {
      request(app)
        .get('/api/document_types/' + newDocumentType._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          documentType = res.body;
          done();
        });
    });

    afterEach(function() {
      documentType = {};
    });

    it('should respond with the requested documentType', function() {
      documentType.name.should.equal('New DocumentType');
      documentType.info.should.equal('This is the brand new documentType!!!');
    });

  });

  describe('PUT /api/document_types/:id', function() {
    var updatedDocumentType;

    beforeEach(function(done) {
      request(app)
        .put('/api/document_types/' + newDocumentType._id)
        .send({
          name: 'Updated DocumentType',
          info: 'This is the updated documentType!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedDocumentType = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedDocumentType = {};
    });

    it('should respond with the updated documentType', function() {
      updatedDocumentType.name.should.equal('Updated DocumentType');
      updatedDocumentType.info.should.equal('This is the updated documentType!!!');
    });

  });

  describe('DELETE /api/document_types/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/document_types/' + newDocumentType._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when documentType does not exist', function(done) {
      request(app)
        .delete('/api/document_types/' + newDocumentType._id)
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
