'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      {
        kategori: 'Berita Terbaru',
        keterangan: '',
        created_at : new Date(),
        updated_at : new Date()
      },
      {
        kategori: 'Pengumuman',
        keterangan: '',
        created_at : new Date(),
        updated_at : new Date()
      },
      {
        kategori: 'Sejarah',
        keterangan: '',
        created_at : new Date(),
        updated_at : new Date()
      },
      {
        kategori: 'Tentang',
        keterangan: '',
        created_at : new Date(),
        updated_at : new Date()
      },
      {
        kategori: 'Visi Misi',
        keterangan: '',
        created_at : new Date(),
        updated_at : new Date()
      },
      {
        kategori: 'Tujuan',
        keterangan: '',
        created_at : new Date(),
        updated_at : new Date()
      },
      {
        kategori: 'Kegiatan',
        keterangan: '',
        created_at : new Date(),
        updated_at : new Date()
      },
      {
        kategori: 'SK',
        keterangan: '',
        created_at : new Date(),
        updated_at : new Date()
      },
      {
        kategori: 'Kurikulum',
        keterangan: '',
        created_at : new Date(),
        updated_at : new Date()
      },
      {
        kategori: 'CPL',
        keterangan: '',
        created_at : new Date(),
        updated_at : new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};