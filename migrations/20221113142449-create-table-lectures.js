'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('lectures', { 
      id: {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
      },
      nama :{
        type : Sequelize.STRING,
        allowNull : false
      },
      NIDN :{
        type : Sequelize.INTEGER,
        allowNull : false
      },
      NIP :{
        type : Sequelize.INTEGER,
        allowNull : false
      },
      ringkasan :{
        type : Sequelize.STRING,
        allowNull : false
      },
      foto:{
        type : Sequelize.STRING,
        allowNull : true
      },
      created_at:{
        type : Sequelize.DATE,
        allowNull : false
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull:false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('lectures');
  }
};
