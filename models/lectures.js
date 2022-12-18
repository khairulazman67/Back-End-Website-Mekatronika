module.exports = (sequelize, DataTypes) => {
    const Lectures = sequelize.define('Lectures',{
        id: {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true,
            allowNull : false,
        },
        nama :{
            type : DataTypes.STRING,
            allowNull : false
        },
        NIDN :{
            type : DataTypes.INTEGER,
            allowNull : false
        },
        NIP :{
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
        tableName : 'Lectures',
        timestamp :true
    });
    return Lectures;
}