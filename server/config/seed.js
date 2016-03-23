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
var Claim = sqldb.Claim;
var ClaimDocument = sqldb.ClaimDocument;
var DocumentType = sqldb.DocumentType;
var ClaimTask = sqldb.ClaimTask;

var force = {force:true}


DocumentType.sync(force)
  .then(() => DocumentType.destroy({where: {}}))
  .then(() => {
    DocumentType.bulkCreate([
      {name:'Claim report',active:true},
      {name:'Damage report',active:true},
      {name:'Budget',active:true},
      {name:'Witness report',active:true}
    ]);
  });

Customer.sync(force)
  .then(() => Customer.destroy({where: {}}))
  .then(() => {
    Customer.create({
      name: 'Acme Inc',
      active: true
    })
    .then((record) => {
      Policy.sync(force)
      .then(() => Policy.destroy({ where: {} }))
      .then(() => {
        Policy.create({
          reference: '001',
          amount: 500000,
          start_date: moment().subtract(7,'days'),
          end_date: moment().add(11,'months'),
          active:true
        })
          .then((policy) => {
            policy.setCustomer(record);
            policy.save();
          });
      });
      User.sync(force)
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
      Claim.sync(force)
        .then(() => Claim.destroy({where: {}}))
        .then(() => {
          ClaimDocument.sync(force)
            .then(() => ClaimDocument.destroy({where: {}}));
          ClaimTask.sync(force)
            .then(() => ClaimTask.destroy({where: {}}));
          });
    })
  });


