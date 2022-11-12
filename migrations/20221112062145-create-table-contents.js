'use strict';

const { STRING } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('contents', { 
      id: {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
      },
      judul :{
        type : Sequelize.STRING,
        allowNull : false
      },
      isi :{
        type : Sequelize.STRING,
        allowNull : false
      },
      kategori_id :{
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
    await queryInterface.addConstraint('contents',{
      type : 'foreign key',
      name : 'CONTENTS_ID_CATEGORIES_ID',
      fields : ['kategori_id'],
      references : {
        table:'categories',
        field:'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('contents');
  }
};
