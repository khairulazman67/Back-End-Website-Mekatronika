const { 
    Lectures
} = require('../models');

const isBase64 = require('is-base64');
const base64Img =  require('base64-img')
const Validator = require('fastest-validator');
const fs = require('fs');

const v = new Validator();

class lecturesController{
    async createdLectures (req, res){
        try{
            const schema = {
                nama: 'string|empty:false',
                NIDN: 'number|empty:false',
                NIP: 'number|empty:false',
                ringkasan: 'string|empty:false',
                foto: 'string|empty:false'
            }
      
            const validate = v.validate(req.body, schema);
        
            if (validate.length) {
                return res.status(400).json({
                    status: 'error',
                    message: validate
                });
            }
            const image = req.body.foto;

            if (!isBase64(image, { mimeRequired: true })) {
                return res.status(400).json({ status: 'error', message: 'invalid base64' });
            }

            base64Img.img(image, './public/images', Date.now(), async (err, filepath) => {
                if (err) {
                return res.status(400).json({ status: 'error', message: err.message });
                }

                const filename = filepath.split('/').pop();

                const data = {
                    nama : req.body.nama,
                    NIDN : req.body.NIDN,
                    NIP : req.body.NIP,
                    ringkasan : req.body.ringkasan,
                    foto : `images/${filename}`,
                };
            
                const createdLectures = await Lectures.create(data);
            
                return res.json({
                    status: 'success',
                    data: {
                        createdLectures
                    }
                });

            })
            
        }catch (error){
            return res.status(500).json({
                msg: error.message
            });
        }
    }


    async getLectures (req, res) {
        try {
            const lecturesIds = req.query.content_ids || [];

            const sqlOPtions = {}
            if (lecturesIds.length) {
                sqlOPtions.where = {
                    id: lecturesIds
                }
            }
                          
            const lectures = await Lectures.findAll(sqlOPtions);
            const mappedLectures = lectures.map((m) => {
                m.foto = `${req.get('host')}/${m.foto}`;
                return m;
            })
            return res.json({
                status: 'success',
                data: mappedLectures
            });
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            });
        }
    }

    async deleteLectures (req,res){
        try{
            const id = req.params.id
            
            const lectures = await Lectures.findByPk(id);

            if (!lectures) {
                return res.status(404).json({
                    status: 'error',
                    message: 'content not found'
                });
            }
            
            fs.unlink(`./public/${lectures.foto}`, async (err) => {
                if (err) {
                  return res.status(400).json({ status: 'error', message: err.message });
                }
            
                await lectures.destroy();
            
                return res.json({
                  status: 'success',
                  message: 'data deleted'
                });
            });

        }catch(error){
            return res.status(500).json({
                msg:error.message
            })
        }
    }
}
module.exports = lecturesController;