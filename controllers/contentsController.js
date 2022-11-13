const { 
    User
} = require('../models');

const Validator = require('fastest-validator');

const v = new Validator();

class refreshTokenController{
    constructor(){
        this.refreshTokenServices = new RefreshTokenServices()
        this.create = this.create.bind(this)
        this.getToken = this.getToken.bind(this)
        this.refreshToken = this.refreshToken.bind(this)
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
        
        const createdRefreshToken = await this.refreshTokenServices.createToken(refreshToken, userId);
        
        return res.json({
            status: 'success',
            data: {
                id: createdRefreshToken.id
            }
        });
    }

    async refreshToken(req, res){
        try {
            const refreshToken = req.body.refresh_token;
            const username = req.body.username;
        
            if (!refreshToken || !username) {
            return res.status(400).json({
                status: 'error',
                message: 'invalid token'
            });
            };

            const token = await this.refreshTokenServices.getToken(refreshToken)

            if (!token) {
                return res.status(400).json({
                status: 'error',
                message: 'invalid token'
                });
            }

            jwt.verify(refreshToken, JWT_SECRET_REFRESH_TOKEN, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    status: 'error',
                    message: err.message
                });
            }
        
            if (username !== decoded.user.username) {
                return res.status(400).json({
                    status: 'error',
                    message: 'username is not valid'
                });
            }

            const token = jwt.sign({ data: decoded.user }, JWT_SECRET, {expiresIn: JWT_ACCESS_TOKEN_EXPIRED });
                return res.json({
                    status: 'success',
                    data: {
                        token
                    }
                });
            });
        }catch (error) {
            console.log(error)
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

    async getToken (req, res){
        const refreshToken = req.body.refresh_token;
    
        if (!refreshToken) {
          return res.status(400).json({
            status: 'error',
            message: 'invalid token'
          });
        };

        const token = await this.refreshTokenServices.getToken(refreshToken)

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