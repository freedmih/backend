'use strict';

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
        name: 'Make layout',
        done: true
      },
      {
        name: 'Make front-end app',
        done: true
      },
      {
        name: 'Add integration with API',
        done: true
      },
      {
        name: 'Create a basic back-end',
        done: false
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};
