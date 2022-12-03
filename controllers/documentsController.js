const { 
    Documents,
} = require('../models');

const Validator = require('fastest-validator');

const v = new Validator();

class contensController{
    async createdDocuments (req, res){
        try{
            const schema = {
                file: 'string|empty:false',
            }
        
            const validate = v.validate(req.body, schema);
        
            if (validate.length) {
                return res.status(400).json({
                    status: 'error',
                    message: validate
                });
            }
        
            const data = {
                judul : req.body.file,
                kategori_id : 1
            };
        
            const createdDocuments = await Documents.create(data);
        
            return res.json({
                status: 'success',
                data: {
                    createdDocuments
                }
            });
        }catch (error){
            return res.status(500).json({
                msg: error.message
            });
        }
    }

    async updateDocuments (req, res) {
        try {
            const schema = {
                file: 'string|empty:false',
            }
            
            const validate = v.validate(req.body, schema);
        
            if (validate.length) {
                return res.status(400).json({
                    status: 'error',
                    message: validate
                });
            }
        
            const id = req.params.id;
            const documents = await Documents.findByPk(id);
            if (!documents) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Documents not found'
                });
            }

            const data = {
                file : req.body.file,
            };

            const updateContents  = await documents.update(data);

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

    async getDocument (req, res) {
        try {
            const id = req.params.id;
            const documents = await Documents.findByPk(id);
            if (!documents) {
                return res.status(404).json({
                    status: 'error',
                    message: 'content not found'
                });
            }
            return res.json({
                status: 'success',
                data: documents
            });
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            });
        }
    }

    async getDocuments (req, res) {
        try {
            const documentsIds = req.query.content_ids || [];

            const sqlOPtions = {}
            if (documentsIds.length) {
                sqlOPtions.where = {
                    id: documentsIds
                }
            }
            const documents = await Documents.findAll(sqlOPtions);
            return res.json({
                status: 'success',
                data: documents
            });
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            });
        }
    }

    async deleteDocuments(req,res){
        try{
            const id = req.params.id
            
            const documents = await Documents.findByPk(id);
            if (!documents) {
                return res.status(404).json({
                    status: 'error',
                    message: 'content not found'
                });
            }
            
            await Documents.destroy({
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