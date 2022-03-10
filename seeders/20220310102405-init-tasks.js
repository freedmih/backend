'use strict';

const crypto = require("crypto");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Tasks', [  
      {
        uuid: crypto.randomUUID(),
        name: 'Make layout',
        done: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uuid: crypto.randomUUID(),
        name: 'Make front-end app',
        done: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uuid: crypto.randomUUID(),
        name: 'Add integration with API',
        done: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uuid: crypto.randomUUID(),
        name: 'Create a basic back-end',
        done: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};
