'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'profileImage', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'briefIntroduction', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'selectedCategory', {
      type: Sequelize.STRING, 
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'availableDays', {
      type: Sequelize.ENUM('월-금', '주말', '공휴일'),
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'contactTimeStart', {
      type: Sequelize.TIME,
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'contactTimeEnd', {
      type: Sequelize.TIME,
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'offlineMeetingArea', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'phoneNumber', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'profileImage');
    await queryInterface.removeColumn('users', 'briefIntroduction');
    await queryInterface.removeColumn('users', 'selectedCategory');
    await queryInterface.removeColumn('users', 'availableDays');
    await queryInterface.removeColumn('users', 'contactTimeStart');
    await queryInterface.removeColumn('users', 'contactTimeEnd');
    await queryInterface.removeColumn('users', 'offlineMeetingArea');
    await queryInterface.removeColumn('users', 'phoneNumber');
  }
};