const { 
    User,
    RefreshToken
} = require('../models');

// const {
//     refreshTokenServices,
// } = require('../services');

const refreshTokenServices = require('../services/refreshTokenServices');

const Validator = require('fastest-validator');
const v = new Validator();

class refreshTokenController{
    constructor(){
        this.refreshTokenServices = new refreshTokenServices()
    }

    async create (req, res){
        const userId = req.body.user_id;
        const refreshToken = req.body.refresh_token;
        
        const schema = {
            refresh_token: 'string',
            user_id: 'number'
        }
        
        const validate = v.validate(req.body, schema);
        if (validate.length) {
            return res.status(400).json({
            status: 'error',
            message: validate
            });
        }
        
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
            status: 'error',
            message: 'user not found'
            });
        }
        
        const createdRefreshToken = this.refreshTokenServices.create(refreshToken, userId);
        
        return res.json({
            status: 'success',
            data: {
            id: createdRefreshToken.id
            }
        });
    }
    async getToken (req, res){
        const refreshToken = req.query.refresh_token;
        const token = await RefreshToken.findOne({
            where: { token: refreshToken }
        });

        if (!token) {
            return res.status(400).json({
            status: 'error',
            message: 'invalid token'
            });
        }

        return res.json({
            status: 'success',
            token
        });
    }
    
}
module.exports = refreshTokenController;