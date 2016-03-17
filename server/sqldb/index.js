/**
 * Sequelize initialization module
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';

var db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

// Insert models below
db.DocumentType = db.sequelize.import('../api/document_type/document_type.model');
db.Customer = db.sequelize.import('../api/customer/customer.model');
db.Policy = db.sequelize.import('../api/customer/policy/policy.model');
db.Claim = db.sequelize.import('../api/customer/policy/claim/claim.model');
db.ClaimDocument = db.sequelize.import('../api/customer/policy/claim/claim_document/claim_document.model');
db.ClaimTask = db.sequelize.import('../api/customer/policy/claim/claim_task/claim_task.model');
db.Thing = db.sequelize.import('../api/thing/thing.model');
db.User = db.sequelize.import('../api/user/user.model');

//Relationships
// db.Customer.hasMany(db.User);
// db.Customer.hasMany(db.Policy);
// db.Customer.hasMany(db.User);

db.Policy.belongsTo(db.Customer);
// db.Policy.hasMany(db.Claim);

db.Claim.belongsTo(db.Policy);
// db.Claim.hasMany(db.ClaimDocument);
// db.Claim.hasMany(db.ClaimTask);

// db.DocumentType.hasMany(db.ClaimDocument);

db.ClaimDocument.belongsTo(db.Claim);
db.ClaimDocument.belongsTo(db.DocumentType);

db.ClaimTask.belongsTo(db.Claim);


db.User.belongsTo(db.Customer);

export default db;
