/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
var moment = require('moment');

var Thing = sqldb.Thing;
var User = sqldb.User;
var Customer = sqldb.Customer;
var Policy = sqldb.Policy;

Customer.sync({force:true})
  .then(() => Customer.destroy({where: {}}))
  .then(() => {
    Customer.create({
      name: 'Acme Inc',
      active: true
    })
    .then((record) => {
      Policy.sync({force:true})
      .then(() => Policy.destroy({ where: {} }))
      .then(() => {
        var policy = Policy.build({
          reference: '001',
          amount: 500000,
          start_date: moment().subtract(7,'days'),
          end_date: moment().add(11,'months'),
          active:true
        });
        policy.setCustomer(record);
        policy.save();
      });
      User.sync({force:true})
        .then(() => User.destroy({ where: {} }))
        .then(() => {
          var user = User.create({
            provider: 'local',
            role: 'admin',
            name: 'Admin',
            email: 'admin@example.com',
            password: 'admin'
          })
            .then((user) => {
              user.setCustomer(record);
              user.save();
            });
        });

    })
  });


