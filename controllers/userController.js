const bcrypt = require('bcrypt');
const {
    User
} = require('../models');

const RefreshTokenServices = require('../services/refreshTokenServices');
// const refreshTokenService = new refreshTokenServices()

const Validator = require('fastest-validator');
const v = new Validator();

const jwt = require('jsonwebtoken');
const {
    URL_SERVICE_USER,
    JWT_SECRET,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN_EXPIRED,
    JWT_REFRESH_TOKEN_EXPIRED
  } = process.env;

class userController{
    // RefreshTokenService = new RefreshTokenServices()
    constructor(){
        this.refreshTokenService = new RefreshTokenServices()
        this.login = this.login.bind(this)
    }
    async login (req, res) {
        try {
            const schema = {
                username: 'string|empty:false',
                password: 'string|min:6'
            }

            const validate = v.validate(req.body, schema);
            if (validate.length) {
                return res.status(400).json({
                    status: 'error',
                    message: validate
                });
            }

            const user = await User.findOne({
                where: {
                    username: req.body.username
                }
            });

            if (!user) {
                return res.status(404).json({
                    status: 'error',
                    message: 'user not found'
                });
            }

            const isValidPassword = await bcrypt.compare(req.body.password, user.password);
            if (!isValidPassword) {
                return res.status(404).json({
                    status: 'error',
                    message: 'user not found'
                });
            }
            
            const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXPIRED });
            const createrefreshToken =  jwt.sign({ user }, JWT_SECRET_REFRESH_TOKEN, { expiresIn: JWT_REFRESH_TOKEN_EXPIRED });

            const tes = await this.RefreshTokenService.create();
            // const tes = await this.refreshTokenService.create();

            return res.json({
                status: 'success',
                data: {
                    tes
                }
            });
        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                return res.status(500).json({
                    status: 'error',
                    message: 'service unavailable'
                });
            }
            return res.status(500).json({
                msg: error.message
            });
        }
    }
    async logout (req, res) {
        try {
            const userId = req.body.user_id;
            const user = await User.findByPk(userId);

            if (!user) {
                return res.status(404).json({
                    status: 'error',
                    message: 'user not found'
                });
            }

            await RefreshToken.destroy({
                where: {
                    user_id: userId
                }
            });

            return res.json({
                status: 'success',
                message: 'refresh token deleted'
            });
        } catch (error) {
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
                profession: 'string|optional',
                avatar: 'string|optional'
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
                profession,
                avatar
            } = req.body;

            await user.update({
                username,
                password,
                name,
                profession,
                avatar
            });

            return res.json({
                status: 'success',
                data: {
                    id: user.id,
                    name,
                    username,
                    profession,
                    avatar
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

    async getUsers (req, res) {
        try {
            const userIds = req.query.user_ids || [];
            const sqlOPtions = {
                attributes: ['id', 'name', 'username', 'avatar']
            }

            if (userIds.length) {
                sqlOPtions.where = {
                    id: userIds
                }
            }

            const users = await User.findAll(sqlOPtions);

            return res.json({
                status: 'success',
                data: users
            });
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            });
        }
    }

    async register (req, res) {
        try {
            const schema = {
                name: 'string|empty:false',
                username: 'string|empty:false',
                password: 'string|min:6',
                profession: 'string|optional'
            }

            const validate = v.validate(req.body, schema);

            if (validate.length) {
                return res.status(400).json({
                    status: 'error',
                    message: validate
                });
            }

            const user = await User.findOne({
                where: {
                    username: req.body.username
                }
            });

            if (user) {
                return res.status(409).json({
                    status: 'error',
                    message: 'username already exist'
                });
            }

            const password = await bcrypt.hash(req.body.password, 10);

            const data = {
                password,
                name: req.body.name,
                username: req.body.username,
            };

            const createdUser = await User.create(data);

            return res.json({
                status: 'success',
                data: {
                    id: createdUser.id
                }
            });
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            });
        }
    }
}
module.exports = userController;