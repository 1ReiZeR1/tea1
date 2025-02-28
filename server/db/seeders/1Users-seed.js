/* eslint-disable no-unused-vars */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Users', [
          {
            name: "Admin",
            email: "katya@mail.ru",
            password: "$2b$10$HWgpqqXfCNvF0l1zIWz5NOhqj9Q1c6gXo9kjoo5a2JiF7M0zXcHEW",
            isAdmin: true,
          },
          {
            name: "LizaM",
            email: "liza@mail.ru",
            password: "$2b$10$HWgpqqXfCNvF0l1zIWz5NOhqj9Q1c6gXo9kjoo5a2JiF7M0zXcHEW",
            isAdmin: false,
          },
          {
            name: "Eugine",
            email: "E23@mail.ru",
            password: "$2b$10$HWgpqqXfCNvF0l1zIWz5NOhqj9Q1c6gXo9kjoo5a2JiF7M0zXcHEW",
            isAdmin: false,
          },
        ], {})
    },
  
    async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("Entries", null, {
        restartIdentity: true,
        truncate: true,
      });
    },
  };
  