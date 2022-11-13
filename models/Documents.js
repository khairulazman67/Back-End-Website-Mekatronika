module.exports = (sequelize, DataTypes) => {
    const RefreshToken = sequelize.define('documents',{
        id: {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true,
            allowNull : false,
        },
        kategori_id :{
            type : Sequelize.INTEGER,
            allowNull : false
        },
        file:{
            type : Sequelize.STRING,
            allowNull : true
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
        tableName : 'documents',
        timestamp :true
    });
    return RefreshToken;
}