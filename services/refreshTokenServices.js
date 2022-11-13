const {
    RefreshToken
} = require('../models');

class RefreshTokenServices{
    async createToken(refresh_token,user_id){
        const createdRefreshToken = await RefreshToken.create({ 
            token: refresh_token, 
            user_id: user_id 
        });
        return createdRefreshToken
    }

    async destroyToken(userId){
        await RefreshToken.destroy({
            where: {
                user_id: userId
            }
        });
    }

    async getToken(refreshToken){
        const token = await RefreshToken.findOne({
            where: { token: refreshToken }
        });
        return token
    }
}
module.exports = RefreshTokenServices