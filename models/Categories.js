module.exports = (sequelize, DataTypes) => {
    const RefreshToken = sequelize.define('categories',{
        id: {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true,
            allowNull : false,
        },
        kategori:{
            type : DataTypes.STRING,
            allowNull : false
        },
        keterangan:{
            type : DataTypes.STRING,
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
        tableName : 'categories',
        timestamp :true
    });
    return RefreshToken;
}