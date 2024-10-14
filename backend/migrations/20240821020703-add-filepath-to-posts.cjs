'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('posts', 'filePath', {
      type: Sequelize.STRING,
      allowNull: true, // 파일 업로드는 선택사항이므로 allowNull을 true로 설정
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('posts', 'filePath');
  }
};