'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('companies', 'name', 'companyName');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('companies', 'companyName', 'name');
  }
};
