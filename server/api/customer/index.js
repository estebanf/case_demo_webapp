'use strict';

var express = require('express');
var controller = require('./customer.controller');
var policy_controller = require('./policy/policy.controller.js');

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

module.exports = router;
