'use strict';

var express = require('express');
var controller = require('./customer.controller');
var policy_controller = require('./policy/policy.controller.js');
var claim_controller = require('./policy/claim/claim.controller.js');
var claim_document_controller = require('./policy/claim/claim_document/claim_document.controller');
var claim_task_controller = require('./policy/claim/claim_task/claim_task.controller');


var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

router.get('/:customer_id/policies/', policy_controller.index);
router.get('/:customer_id/policies/:id', policy_controller.show);
router.post('/:customer_id/policies/', policy_controller.create);
router.put('/:customer_id/policies/:id', policy_controller.update);
router.patch('/:customer_id/policies/:id', policy_controller.update);
router.delete('/:customer_id/policies/:id', policy_controller.destroy);

router.get('/:customer_id/policies/:policy_id/claims/', claim_controller.index);
router.get('/:customer_id/policies/:policy_id/claims/:id', claim_controller.show);
router.post('/:customer_id/policies/:policy_id/claims/', claim_controller.create);
router.put('/:customer_id/policies/:policy_id/claims/:id', claim_controller.update);
router.patch('/:customer_id/policies/:policy_id/claims/:id', claim_controller.update);
router.delete('/:customer_id/policies/:policy_id/claims/:id', claim_controller.destroy);


router.get('/:customer_id/policies/:policy_id/claims/:claim_id/documents/', claim_document_controller.index);
router.get('/:customer_id/policies/:policy_id/claims/:claim_id/documents/:id', claim_document_controller.show);
router.post('/:customer_id/policies/:policy_id/claims/:claim_id/documents/', claim_document_controller.create);
router.put('/:customer_id/policies/:policy_id/claims/:claim_id/documents/:id', claim_document_controller.update);
router.patch('/:customer_id/policies/:policy_id/claims/:claim_id/documents/:id', claim_document_controller.update);
router.delete('/:customer_id/policies/:policy_id/claims/:claim_id/documents/:id', claim_document_controller.destroy);

router.get('/:customer_id/policies/:policy_id/claims/:claim_id/tasks/', claim_task_controller.index);
router.get('/:customer_id/policies/:policy_id/claims/:claim_id/tasks/:id', claim_task_controller.show);
router.post('/:customer_id/policies/:policy_id/claims/:claim_id/tasks/', claim_task_controller.create);
router.put('/:customer_id/policies/:policy_id/claims/:claim_id/tasks/:id', claim_task_controller.update);
router.patch('/:customer_id/policies/:policy_id/claims/:claim_id/tasks/:id', claim_task_controller.update);
router.delete('/:customer_id/policies/:policy_id/claims/:claim_id/tasks/:id', claim_task_controller.destroy);

module.exports = router;
