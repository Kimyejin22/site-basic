'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'companyId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'companies', // 'companies' 테이블을 참조합니다.
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'companyId');
  }
};