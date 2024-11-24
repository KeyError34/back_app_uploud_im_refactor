'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Apps',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        appName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        size: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        filePath: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        tableName: 'Apps',
        timestamps: false,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Apps');
  },
};
