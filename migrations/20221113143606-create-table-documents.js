'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('documents', { 
      id: {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
      },
      kategori_id :{
        type : Sequelize.INTEGER,
        allowNull : false
      },
      file:{
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
    await queryInterface.addConstraint('documents',{
      type : 'foreign key',
      name : 'DOCUMENTS_ID_CATEGORIES_ID',
      fields : ['kategori_id'],
      references : {
        table:'categories',
        field:'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('documents');
  }
};
