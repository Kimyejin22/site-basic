'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('posts', 'step1Id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'step1_data', // 'step1_data' 테이블을 참조합니다.
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    await queryInterface.addColumn('posts', 'step2Id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'step2_data', // 'step2_data' 테이블을 참조합니다.
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    await queryInterface.addColumn('posts', 'step3Id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'step3_data', // 'step3_data' 테이블을 참조합니다.
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('posts', 'step1Id');
    await queryInterface.removeColumn('posts', 'step2Id');
    await queryInterface.removeColumn('posts', 'step3Id');
  }
};