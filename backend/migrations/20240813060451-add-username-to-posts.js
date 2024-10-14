'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // posts 테이블에 username 컬럼 추가
    await queryInterface.addColumn('posts', 'username', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    // 외래 키 제약 조건 추가
    await queryInterface.addConstraint('posts', {
      fields: ['username'],
      type: 'foreign key',
      name: 'fk_posts_username', // 제약 조건 이름
      references: {
        table: 'users', // 참조 테이블
        field: 'username', // 참조 필드
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // 롤백 시 외래 키 제약 조건부터 제거
    await queryInterface.removeConstraint('posts', 'fk_posts_username');

    // username 컬럼 제거
    await queryInterface.removeColumn('posts', 'username');
  }
};