'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'businessNumber');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'businessNumber', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};