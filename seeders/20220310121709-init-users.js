'use strict';

const bcrypt = require("bcrypt");

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

    const salt = await bcrypt.genSalt(10);

    await queryInterface.bulkInsert('Users', [
      {
        login: 'admin',
        password: await bcrypt.hash('admin', salt),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        login: 'michael',
        password: await bcrypt.hash('12345', salt),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
