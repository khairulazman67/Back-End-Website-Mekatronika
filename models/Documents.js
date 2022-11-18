module.exports = (sequelize, DataTypes) => {
    const Documents = sequelize.define('documents',{
        id: {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true,
            allowNull : false,
        },
        kategori_id :{
            type : DataTypes.INTEGER,
            allowNull : false
        },
        file:{
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
        tableName : 'documents',
        timestamp :true
    });
    return Documents;
}