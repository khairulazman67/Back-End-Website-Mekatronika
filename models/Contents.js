module.exports = (sequelize, DataTypes) => {
    const Contents = sequelize.define('Contents',{
        id: {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true,
            allowNull : false,
        },
        judul :{
            type : DataTypes.STRING,
            allowNull : false
        },
        isi :{
            type : DataTypes.STRING,
            allowNull : false
        },
        kategori_id :{
            type : DataTypes.INTEGER,
            allowNull : false
        },
        ringkasan :{
            type : DataTypes.STRING,
            allowNull : false
        },
        foto:{
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
        tableName : 'contents',
        timestamp :true
    });
    return Contents;
}