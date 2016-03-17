/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/claim_tasks              ->  index
 * POST    /api/claim_tasks              ->  create
 * GET     /api/claim_tasks/:id          ->  show
 * PUT     /api/claim_tasks/:id          ->  update
 * DELETE  /api/claim_tasks/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {ClaimTask} from '../../../../../sqldb';

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

// Gets a list of ClaimTasks
export function index(req, res) {
  ClaimTask.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single ClaimTask from the DB
export function show(req, res) {
  ClaimTask.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new ClaimTask in the DB
export function create(req, res) {
  // console.log(req.params);
  req.body.ClaimId = req.params.claim_id;
  req.body.active = true;
  ClaimTask.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing ClaimTask in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  ClaimTask.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a ClaimTask from the DB
export function destroy(req, res) {
  ClaimTask.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
