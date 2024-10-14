'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // posts 테이블에 username 추가
    await queryInterface.addColumn('posts', 'username', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    // 외래 키 제약 조건 추가
    await queryInterface.addConstraint('posts', {
      fields: ['username'],
      type: 'foreign key',
      name: 'fk_posts_username', 
      references: {
        table: 'users',
        field: 'username',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    // comments 테이블에서 userId를 삭제하고 username 추가
    const tableDefinition = await queryInterface.describeTable('comments');
    if (tableDefinition.userId) {
      await queryInterface.removeColumn('comments', 'userId');
    }

    await queryInterface.addColumn('comments', 'username', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    // 외래 키 제약 조건 추가
    await queryInterface.addConstraint('comments', {
      fields: ['username'],
      type: 'foreign key',
      name: 'fk_comments_username', 
      references: {
        table: 'users',
        field: 'username',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // 롤백할 때 외래 키 제약 조건부터 제거
    await queryInterface.removeConstraint('posts', 'fk_posts_username');
    await queryInterface.removeConstraint('comments', 'fk_comments_username');

    // username 컬럼을 삭제하고 userId를 다시 추가
    await queryInterface.removeColumn('posts', 'username');
    await queryInterface.addColumn('posts', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.removeColumn('comments', 'username');
    await queryInterface.addColumn('comments', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  }
};