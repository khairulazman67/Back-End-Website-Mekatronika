const { 
    User,
    Categories,
    Contents
} = require('../models');

const sequelize = require('sequelize');
const Op = sequelize.Op;

const isBase64 = require('is-base64');
const base64Img =  require('base64-img')
const Validator = require('fastest-validator');
const fs = require('fs');
const { off } = require('process');
const v = new Validator();

class contensController{
    async createdContens (req, res){
        try{
            const schema = {
                judul: 'string|empty:false',
                isi: 'string|empty:false',
                kategori_id: 'number',
                ringkasan: 'string|optional',
                foto: 'string|optional'
            }
        
            const validate = v.validate(req.body, schema);
        
            if (validate.length) {
                return res.status(400).json({
                    status: 'error',
                    message: validate
                });
            }

            const image = req.body.foto;

            const categories = await Categories.findOne({
                where: { id: req.body.kategori_id }
            });
        
            if (!categories) {
                return res.status(409).json({
                    status: 'error',
                    message: 'categories not available'
                });
            }
        
            if (!isBase64(image, { mimeRequired: true })) {
                return res.status(400).json({ status: 'error', message: 'invalid base64' });
            }

            base64Img.img(image, './public/images', Date.now(), async (err, filepath) => {
                if (err) {
                return res.status(400).json({ status: 'error', message: err.message });
                }

                const filename = filepath.split('/').pop();

                const data = {
                    judul : req.body.judul,
                    isi: req.body.isi,
                    kategori_id: req.body.kategori_id,
                    ringkasan: req.body.ringkasan,
                    foto: `images/${filename}`,
                };
            
        
                const createdContens = await Contents.create(data);
        
                return res.json({
                    status: 'success',
                    data: {
                        createdContens
                    }
                });

            })
        }catch (error){
            return res.status(500).json({
                msg: error.message
            });
        }
    }

    async updateContents (req, res) {
        try {
            const schema = {
                judul: 'string',
                isi: 'string',
                kategori_id: 'number',
                ringkasan: 'string|optional',
                foto: 'string|optional'
            }
            
            const validate = v.validate(req.body, schema);
        
            if (validate.length) {
                return res.status(400).json({
                    status: 'error',
                    message: validate
                });
            }
        
            const categories = await Categories.findOne({
                where: { id: req.body.kategori_id }
            });
        
            if (!categories) {
                return res.status(409).json({
                    status: 'error',
                    message: 'categories not available'
                });
            }
            const id = req.params.id;
            const contents = await Contents.findByPk(id);
            if (!contents) {
                return res.status(404).json({
                    status: 'error',
                    message: 'content not found'
                });
            }

            const data = {
                judul : req.body.judul,
                isi: req.body.isi,
                kategori_id: req.body.kategori_id,
                ringkasan: req.body.ringkasan,
                foto: req.body.foto
            };

            const updateContents  = await contents.update(data);

            return res.json({
                status: 'success',
                data: {
                    updateContents
                }
            });
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            });
        }
    }

    async getContent (req, res) {
        try {
            const id = req.params.id;
            const contents = await Contents.findByPk(id);
            if (!contents) {
                return res.status(404).json({
                    status: 'error',
                    message: 'content not found'
                });
            }
            contents.foto = `${req.get('host')}/${contents.foto}`
            return res.json({
                status: 'success',
                data: contents
            });
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            });
        }
    }

    async getContentByCat (req, res) {
        try {
            const id = req.params.id;
            const contents = await Contents.findOne({
                where: { kategori_id: id }
            });
            // const contents = await Contents.findByPk(id);
            if (!contents) {
                return res.status(404).json({
                    status: 'error',
                    message: 'content not found'
                });
            }
            return res.json({
                status: 'success',
                data: contents
            });
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            });
        }
    }

    async getContents (req, res) {
        try {
            const contenIds = req.query.content_ids || [];

            const offset = req.query.hasOwnProperty('offset')?parseInt(req.query.offset):0
            const limit = req.query.hasOwnProperty('limit')?parseInt(req.query.limit):10
            // const limit = 10
            // const { offset = 0, limit = 10 } = parseInt(req.query);

            // return res.json({
            //     status: 'success',
            //     limit : limit,
            //     offset : offset,
            //     // data: contents,
            //     // total : total
            // });

            const filters = req.query;

            const sqlOPtions = {
                order :[["id", "DESC"]],
                // attributes : ['id'],
                limit : limit,
                offset : offset
            }
            if (contenIds.length) {
                sqlOPtions.where = {
                    id: contenIds
                }
            }

            if(filters.search){
                sqlOPtions.where = {
                    [Op.or]: [
                        {judul:{
                            [Op.like]: '%'+filters.search+'%'
                        }}, 
                        {ringkasan:{
                            [Op.like]: '%'+filters.search+'%'
                        }}
                    ]
                }
                
            }

            const total = await Contents.count();
            const contents = await Contents.findAll(sqlOPtions);

            return res.json({
                status: 'success',
                data: contents,
                total : total
            });
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            });
        }
    }

    async deleteContents(req,res){
        try{
            const id = req.params.id
            
            const contents = await Contents.findByPk(id);
            if (!contents) {
                return res.status(404).json({
                    status: 'error',
                    message: 'content not found'
                });
            }
            
            await Contents.destroy({
                where: {
                    id: id
                }
            })
            
            return res.json({
                status : 'success',
                message : 'content successfully delete'
            })
        }catch(error){
            return res.status(500).json({
                msg:error.message
            })
        }
    }
}
module.exports = contensController;