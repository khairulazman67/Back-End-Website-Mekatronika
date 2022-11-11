module.exports = (sequelize, DataTypes) => {
    const RefreshToken = sequelize.define('RefreshTOken',{
        id:{
            type : DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true,
            allowNull : false
        },
        token :{
            type:DataTypes.TEXT,
            allowNUll :false,            
        },
        user_id : {
            type :DataTypes.INTEGER,
            allowNull:false
        },
        createdAt :{
            field : 'created_at',
            type : DataTypes.DATE,
            allowNull : false
        },
        updatedAt :{
            field : 'updated_at',
            type : DataTypes.DATE,
            allowNull : false
        }
    },{
        tableName : 'refresh_tokens',
        timestamp :true
    });
    return RefreshToken;
}