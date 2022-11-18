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

            const createdUser = await Categories.create(data);

            return res.json({
                status: 'success',
                data: {
                    id: createdUser
                }
            });
        }catch (error) {
            console.log(error)
            return res.status(500).json({
                msg: error.message
            });
        }
    }
    async update (req, res) {
        try {
            const schema = {
                name: 'string|empty:false',
                username: 'string|empty:false',
                password: 'string|min:6',
            };

            const validate = v.validate(req.body, schema);
            if (validate.length) {
                return res.status(400).json({
                    status: 'error',
                    message: validate
                });
            }

            const id = req.params.id;
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({
                    status: 'error',
                    message: 'user not found'
                });
            }

            const username = req.body.username;
            if (username) {
                const checkusername = await User.findOne({
                    where: {
                        username
                    }
                });

                if (checkusername && username !== user.username) {
                    return res.status(409).json({
                        status: 'error',
                        message: 'username already exist'
                    })
                }
            }

            const password = await bcrypt.hash(req.body.password, 10);
            const {
                name,
            } = req.body;

            await user.update({
                username,
                password,
                name
            });

            return res.json({
                status: 'success',
                data: {
                    id: user.id,
                    name,
                    username
                }
            });
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            });
        }
    }
    async getUser (req, res) {
        try {
            const id = req.params.id;

            const user = await User.findByPk(id, {
                attributes: ['id', 'name', 'username', 'avatar']
            });

            if (!user) {
                return res.status(404).json({
                    status: 'error',
                    message: 'user not found'
                });
            }

            return res.json({
                status: 'success',
                data: user
            });
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            });
        }
    }
}
module.exports = categoriesController;