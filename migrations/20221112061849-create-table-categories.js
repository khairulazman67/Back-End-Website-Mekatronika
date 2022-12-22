'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('categories', { 
      id: {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        allowNull : false,
      },
      kategori:{
        type : Sequelize.STRING,
        allowNull : false
      },
      keterangan:{
        type : Sequelize.STRING,
        allowNull : true
      },
      created_at:{
        type : Sequelize.DATE,
        allowNull : false
      },
      updated_at:{
        type : Sequelize.DATE,
        allowNull : false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('categories');
    
  }
};
