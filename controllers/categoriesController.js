const {
    Categories,
} = require('../models');
const bcrypt = require('bcrypt');
const Validator = require('fastest-validator');

const v = new Validator();

class categoriesController{
    constructor(){
        this.createdCategories = this.createdCategories.bind(this)
    }
    async createdCategories(req, res){
        try{
            const schema = {
                kategori: 'string|empty:false',
                keterangan: 'string|optional'
            }

            const validate = v.validate(req.body, schema);

            if (validate.length) {
                return res.status(400).json({
                    status: 'error',
                    message: validate
                });xx
            }

            const data = {
                kategori : req.body.kategori,
                keterangan: req.body.keterangan,
            };

            const createdCategories = await Categories.create(data);

            return res.json({
                status: 'success',
                data : createdCategories
            });
        }catch (error) {
            console.log(error)
            return res.status(500).json({
                msg: error.message
            });
        }
    }
    async updateCategories (req, res) {
        try {
            
            const schema = {
                kategori: 'string|empty:false',
                keterangan: 'string|optional'
            }
            
            const validate = v.validate(req.body, schema);
        
            if (validate.length) {
                return res.status(400).json({
                    status: 'error',
                    message: validate
                });
            }
            const id = req.params.id;
            // return res.json({
            //     status: 'success',
            //     data: {
            //         id
            //     }
            // });
            const categories = await Categories.findByPk(id);
            if (!categories) {
                return res.status(404).json({
                    status: 'error',
                    message: 'categories not found'
                });
            }

            const data = {
                kategori : req.body.kategori,
                keterangan: req.body.keterangan,
            };

            const updateContents  = await categories.update(data);

            return res.json({
                status: 'success',
                data: updateContents
                
            });
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            });
        }
    }
    
    async getCategories (req, res) {
        try {
            const categories = await Categories.findAll()

            return res.json({
                status: 'success',
                data: categories
            });
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            });
        }
    }

    async deleteCategories(req, res){
        try{
            const id = req.params.id
            
            const categories = await Categories.findByPk(id);
            if (!categories) {
                return res.status(404).json({
                    status: 'error',
                    message: 'content not found'
                });
            }
            
            await Categories.destroy({
                where: {
                    id: id
                }
            })
            
            return res.json({
                status : 'success',
                message : 'categories successfully delete'
            })
        }catch(error){
            return res.status(500).json({
                msg:error.message
            })
        }
    }
}
module.exports = categoriesController;