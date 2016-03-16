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
db.Customer = db.sequelize.import('../api/customer/customer.model');
db.Policy = db.sequelize.import('../api/customer/policy/policy.model');
db.Thing = db.sequelize.import('../api/thing/thing.model');
db.User = db.sequelize.import('../api/user/user.model');

//Relationships
// db.Customer.hasMany(db.User);
db.Customer.hasMany(db.Policy);
db.Customer.hasMany(db.User);

db.Policy.belongsTo(db.Customer);

db.User.belongsTo(db.Customer);

export default db;
