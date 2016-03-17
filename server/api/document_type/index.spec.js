'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var documentTypeCtrlStub = {
  index: 'documentTypeCtrl.index',
  show: 'documentTypeCtrl.show',
  create: 'documentTypeCtrl.create',
  update: 'documentTypeCtrl.update',
  destroy: 'documentTypeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var documentTypeIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './document_type.controller': documentTypeCtrlStub
});

describe('DocumentType API Router:', function() {

  it('should return an express router instance', function() {
    documentTypeIndex.should.equal(routerStub);
  });

  describe('GET /api/document_types', function() {

    it('should route to documentType.controller.index', function() {
      routerStub.get
        .withArgs('/', 'documentTypeCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/document_types/:id', function() {

    it('should route to documentType.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'documentTypeCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/document_types', function() {

    it('should route to documentType.controller.create', function() {
      routerStub.post
        .withArgs('/', 'documentTypeCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/document_types/:id', function() {

    it('should route to documentType.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'documentTypeCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/document_types/:id', function() {

    it('should route to documentType.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'documentTypeCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/document_types/:id', function() {

    it('should route to documentType.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'documentTypeCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
