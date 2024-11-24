'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // + поле 'userId' в таблицу 'Apps'
    await queryInterface.addColumn('Apps', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // имя таблицы для связи
        key: 'id', // поле в таблице 'Users', на которое ссылается 'userId'
      },
      onDelete: 'CASCADE', // при удалении пользователя, все его приложения будут удалены
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Apps', 'userId');
  },
};
