const bcrypt = require('bcrypt');
const { User } = require('../models');
const Validator = require('fastest-validator');
const v = new Validator();

const userController = {
    login : async (req,res) =>{
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
                where: { username: req.body.username }
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
            
              res.json({
                status: 'success',
                data: {
                  id: user.id,
                  name: user.name,
                  username: user.username,
                  role: user.role,
                  avatar: user.avatar,
                  profession: user.profession
                }
              });
        }catch (error) {
            if (error.code === 'ECONNREFUSED') {
                return res.status(500).json({ status: 'error', message: 'service unavailable' });
            }
            return res.status(500).json({ msg: error.message });
        }
    },
    register : async (req,res) =>{
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
                where: { username: req.body.username }
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
        }catch (error) {
			return res.status(500).json({ msg: error.message });
		}
    }
}
module.exports = userController;