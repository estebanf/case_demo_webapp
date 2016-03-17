/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/claim_documents              ->  index
 * POST    /api/claim_documents              ->  create
 * GET     /api/claim_documents/:id          ->  show
 * PUT     /api/claim_documents/:id          ->  update
 * DELETE  /api/claim_documents/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {ClaimDocument} from '../../../../../sqldb';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    return entity.updateAttributes(updates)
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of ClaimDocuments
export function index(req, res) {
  ClaimDocument.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single ClaimDocument from the DB
export function show(req, res) {
  ClaimDocument.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new ClaimDocument in the DB
export function create(req, res) {
  ClaimDocument.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing ClaimDocument in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  ClaimDocument.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a ClaimDocument from the DB
export function destroy(req, res) {
  ClaimDocument.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
