'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // posts 테이블에 userId 컬럼 추가
    await queryInterface.addColumn('posts', 'userId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    // comments 테이블에 userId 컬럼 추가
    await queryInterface.addColumn('comments', 'userId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    // posts 테이블에서 username 컬럼 제거
    await queryInterface.removeColumn('posts', 'username');

    // comments 테이블에서 username 컬럼 제거
    await queryInterface.removeColumn('comments', 'username');
  },

  down: async (queryInterface, Sequelize) => {
    // 다운그레이드 시 작업을 되돌림
    await queryInterface.removeColumn('posts', 'userId');
    await queryInterface.removeColumn('comments', 'userId');

    await queryInterface.addColumn('posts', 'username', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('comments', 'username', {
      type: Sequelize.STRING,
    });
  }
};