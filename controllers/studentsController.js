const { 
    Students,
} = require('../models');

const Validator = require('fastest-validator');

const v = new Validator();

class studentsController{
    async createdStudents (req, res){
        try{
            const schema = {
                NIM: 'number|empty:false',
                nama: 'string|empty:false',
                tahun_masuk : 'number|empty:false'
            }
      
            const validate = v.validate(req.body, schema);
        
            if (validate.length) {
                return res.status(400).json({
                    status: 'error',
                    message: validate
                });
            }
        
            const data = {
                NIM : req.body.NIM,
                nama : req.body.nama,
                tahun_masuk : req.body.tahun_masuk
            };
        
            const createdStudents = await Students.create(data);
        
            return res.json({
                status: 'success',
                data: {
                    createdStudents
                }
            });
        }catch (error){
            return res.status(500).json({
                msg: error.message
            });
        }
    }

    async updateStudents (req, res) {
        try {
            const schema = {
                nama: 'string|empty:false',
                tahun_masuk : 'number|empty:false'
            }
            
            const validate = v.validate(req.body, schema);
        
            if (validate.length) {
                return res.status(400).json({
                    status: 'error',
                    message: validate
                });
            }
        
            const id = req.params.NIM;
            const students = await Students.findByPk(id);
            if (!students) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Students not found'
                });
            }

            const data = {
                nama : req.body.nama,
                tahun_masuk : req.body.tahun_masuk
            };

            const updateStudents  = await students.update(data);

            return res.json({
                status: 'success',
                data: {
                    updateStudents
                }
            });
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            });
        }
    }

    async getStudent (req, res) {
        try {
            const id = req.params.NIM;
            const students = await Students.findByPk(id);
            if (!students) {
                return res.status(404).json({
                    status: 'error',
                    message: 'students not found'
                });
            }
            return res.json({
                status: 'success',
                data: students
            });
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            });
        }
    }

    async getStudents (req, res) {
        try {
            const studentsIds = req.query.content_ids || [];

            const sqlOPtions = {}
            if (studentsIds.length) {
                sqlOPtions.where = {
                    NIM: studentsIds
                }
            }
            const students = await Students.findAll(sqlOPtions);
            return res.json({
                status: 'success',
                data: students
            });
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            });
        }
    }

    async deleteStudents (req,res){
        try{
            const NIM = req.params.NIM
            
            const students = await Students.findByPk(NIM);
            if (!students) {
                return res.status(404).json({
                    status: 'error',
                    message: 'students not found'
                });
            }
            
            await Students.destroy({
                where: {
                    NIM: NIM
                }
            })
            
            return res.json({
                status : 'success',
                message : 'students successfully delete'
            })
        }catch(error){
            return res.status(500).json({
                msg:error.message
            })
        }
    }
}
module.exports = studentsController;