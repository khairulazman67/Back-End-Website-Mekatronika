module.exports = (sequelize, DataTypes) => {
    const Students = sequelize.define('Students',{
        NIM: {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        nama:{
            type : DataTypes.STRING,
            allowNull : false
        },
        tahun_masuk:{
            type : DataTypes.INTEGER,
            allowNull : false
        },
        createdAt:{
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
        tableName : 'students',
        timestamp :true
    });
    return Students;
}