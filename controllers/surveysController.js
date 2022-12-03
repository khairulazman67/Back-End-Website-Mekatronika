const { 
    Surveys,
} = require('../models');

const Validator = require('fastest-validator');

const v = new Validator();

class surveysController{
    async createdSurveys (req, res){
        try{
            const schema = {
                judul: 'string|empty:false',
                url: 'string|empty:false'
            }
      
            const validate = v.validate(req.body, schema);
        
            if (validate.length) {
                return res.status(400).json({
                    status: 'error',
                    message: validate
                });
            }
        
            const data = {
                judul : req.body.judul,
                url : req.body.url,
                kategori_id : 1
            };
        
            const createdSurveys = await Surveys.create(data);
        
            return res.json({
                status: 'success',
                data: {
                    createdSurveys
                }
            });
        }catch (error){
            return res.status(500).json({
                msg: error.message
            });
        }
    }

    async updateSurveys (req, res) {
        try {
            const schema = {
                judul: 'string|empty:false',
                url: 'string|empty:false'
            }
            
            const validate = v.validate(req.body, schema);
        
            if (validate.length) {
                return res.status(400).json({
                    status: 'error',
                    message: validate
                });
            }
        
            const id = req.params.id;
            const surveys = await Surveys.findByPk(id);
            if (!surveys) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Surveys not found'
                });
            }

            const data = {
                judul : req.body.judul,
                url : req.body.url,
            };

            const updateSurveys  = await surveys.update(data);

            return res.json({
                status: 'success',
                data: {
                    updateSurveys
                }
            });
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            });
        }
    }

    async getSurvey (req, res) {
        try {
            const id = req.params.id;
            const surveys = await Surveys.findByPk(id);
            if (!surveys) {
                return res.status(404).json({
                    status: 'error',
                    message: 'surveys not found'
                });
            }
            return res.json({
                status: 'success',
                data: surveys
            });
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            });
        }
    }

    async getSurveys (req, res) {
        try {
            const surveysIds = req.query.content_ids || [];

            const sqlOPtions = {}
            if (surveysIds.length) {
                sqlOPtions.where = {
                    id: surveysIds
                }
            }
            const surveys = await Surveys.findAll(sqlOPtions);
            return res.json({
                status: 'success',
                data: surveys
            });
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            });
        }
    }

    async deleteSurveys (req,res){
        try{
            const id = req.params.id
            
            const surveys = await Surveys.findByPk(id);
            if (!surveys) {
                return res.status(404).json({
                    status: 'error',
                    message: 'content not found'
                });
            }
            
            await Surveys.destroy({
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
module.exports = surveysController;