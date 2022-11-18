const { DataTypes } = require("sequelize")

module.exports =(sequelize,DataTypes) =>{
    const Categories = sequelize.define('Categories',{
        id:{
            type : DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true,
            allowNull:false
        },
        kategori:{
            type : DataTypes.STRING,
            allowNull : false
        },
        keterangan :{
            type: DataTypes.STRING,
            allowNull:true
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
        tableName :'categories',
        timestamps: true
    });
    return Categories;
}