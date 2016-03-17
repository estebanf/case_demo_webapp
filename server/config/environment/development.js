'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // Sequelize connection opions
  sequelize: {
    uri: 'postgres://caseusr:case@everteam.local:5432/casedb',
    username: 'caseusr',
    password: 'case',
    options: {
      dialect: 'postgres'
    }
  },

  // Seed database on startup
  seedDB: false

};
