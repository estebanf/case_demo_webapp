/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/claims              ->  index
 * POST    /api/claims              ->  create
 * GET     /api/claims/:id          ->  show
 * PUT     /api/claims/:id          ->  update
 * DELETE  /api/claims/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {Claim} from '../../../../sqldb';
var moment = require('moment');

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

// Gets a list of Claims
export function index(req, res) {
  Claim.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Claim from the DB
export function show(req, res) {
  Claim.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Claim in the DB
export function create(req, res) {
  req.body.PolicyId = req.params.policy_id;
  req.body.active = true;
  req.body.date_reported = moment();
  Claim.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Claim in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Claim.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Claim from the DB
export function destroy(req, res) {
  Claim.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
