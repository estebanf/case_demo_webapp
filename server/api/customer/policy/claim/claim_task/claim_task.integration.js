'use strict';

var app = require('../../../server');
import request from 'supertest';

var newClaimTask;

describe('ClaimTask API:', function() {

  describe('GET /api/claim_tasks', function() {
    var claimTasks;

    beforeEach(function(done) {
      request(app)
        .get('/api/claim_tasks')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          claimTasks = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      claimTasks.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/claim_tasks', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/claim_tasks')
        .send({
          name: 'New ClaimTask',
          info: 'This is the brand new claimTask!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newClaimTask = res.body;
          done();
        });
    });

    it('should respond with the newly created claimTask', function() {
      newClaimTask.name.should.equal('New ClaimTask');
      newClaimTask.info.should.equal('This is the brand new claimTask!!!');
    });

  });

  describe('GET /api/claim_tasks/:id', function() {
    var claimTask;

    beforeEach(function(done) {
      request(app)
        .get('/api/claim_tasks/' + newClaimTask._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          claimTask = res.body;
          done();
        });
    });

    afterEach(function() {
      claimTask = {};
    });

    it('should respond with the requested claimTask', function() {
      claimTask.name.should.equal('New ClaimTask');
      claimTask.info.should.equal('This is the brand new claimTask!!!');
    });

  });

  describe('PUT /api/claim_tasks/:id', function() {
    var updatedClaimTask;

    beforeEach(function(done) {
      request(app)
        .put('/api/claim_tasks/' + newClaimTask._id)
        .send({
          name: 'Updated ClaimTask',
          info: 'This is the updated claimTask!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedClaimTask = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedClaimTask = {};
    });

    it('should respond with the updated claimTask', function() {
      updatedClaimTask.name.should.equal('Updated ClaimTask');
      updatedClaimTask.info.should.equal('This is the updated claimTask!!!');
    });

  });

  describe('DELETE /api/claim_tasks/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/claim_tasks/' + newClaimTask._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when claimTask does not exist', function(done) {
      request(app)
        .delete('/api/claim_tasks/' + newClaimTask._id)
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
