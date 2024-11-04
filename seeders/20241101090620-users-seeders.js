'use strict';
const bcrypt = require('bcrypt');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'John Doe',
        profession: 'Admin Micro',
        role: 'admin',
        email: 'johndoe@gmail.com',
        password: await bcrypt.hash('rahasia1234',10),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Miftahul',
        profession: 'Frontend Developer',
        role: 'student',
        email: 'miftahul@gmail.com',
        password: await bcrypt.hash('miftah',10),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
