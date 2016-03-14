'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:     process.env.OPENSHIFT_NODEJS_IP ||
          process.env.IP ||
          undefined,

  // Server port
  port:   process.env.OPENSHIFT_NODEJS_PORT ||
          process.env.PORT ||
          80,
  sequelize: {
    uri: 'postgres://caseusr:case@case_demo_db:5432/casedb',
    username: 'caseusr',
    password: 'case',
    options: {
      dialect: 'postgres'
    }
  },

  // Seed database on startup
  seedDB: false
};
