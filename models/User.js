const { DataTypes } = require("sequelize")

module.exports =(sequelize,DataTypes) =>{
    const User = sequelize.define('User',{
        id:{
            type : DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true,
            allowNull:false
        },
        name:{
            type : DataTypes.STRING,
            allowNull : false
        },
        username :{
            type: DataTypes.STRING,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            allowNull :false
        },
        avatar : {
            type : DataTypes.STRING,
            allowNull : true
        },
        createdAt:{
            field : 'created_at',
            type  : DataTypes.DATE
        },
        updatedAt : {
            field : 'updated_at',
            type : DataTypes.DATE
        }
    },{
        tableName :'users',
        timestamps: true
    });
    return User;
}