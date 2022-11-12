const {
    RefreshToken
} = require('../models');

class RefreshTokenServices{
    async create(){
        console.log('masok pak eko');
        return ('masok');

        // await RefreshToken.create({ 
        //     token, user_id 
        // });
    }
}
module.exports = RefreshTokenServices