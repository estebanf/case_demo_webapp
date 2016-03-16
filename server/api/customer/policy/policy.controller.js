/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/customer/:customer_id/policies              ->  index
 * POST    /api/customer/:customer_id/policies              ->  create
 * GET     /api/customer/:customer_id/policies/:id          ->  show
 * PUT     /api/customer/:customer_id/policies/:id          ->  update
 * DELETE  /api/customer/:customer_id/policies/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {Policy} from '../../../sqldb';

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

// Gets a list of Policys
export function index(req, res) {
  console.log("**HERE**")
  console.log(req.params)
  Policy.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Policy from the DB
export function show(req, res) {
  Policy.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Policy in the DB
export function create(req, res) {
  Policy.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Policy in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Policy.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Policy from the DB
export function destroy(req, res) {
  Policy.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
