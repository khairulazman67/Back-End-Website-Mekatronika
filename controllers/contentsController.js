const { 
    User,
    Categories,
    Contents
} = require('../models');

const Validator = require('fastest-validator');

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
        
            const categories = await Categories.findOne({
                where: { id: req.body.kategori_id }
            });
        
            if (!categories) {
                return res.status(409).json({
                    status: 'error',
                    message: 'categories not available'
                });
            }
        
            const data = {
                judul : req.body.judul,
                isi: req.body.isi,
                kategori_id: req.body.kategori_id,
                ringkasan: req.body.ringkasan,
                foto: req.body.foto
            };
        
            const createdContens = await Contents.create(data);
        
            return res.json({
                status: 'success',
                data: {
                    createdContens
                }
            });
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

            const sqlOPtions = {}
            if (contenIds.length) {
                sqlOPtions.where = {
                    id: contenIds
                }
            }
            const contents = await Contents.findAll(sqlOPtions);
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