module.exports = (sequelize, DataTypes) => {
    const RefreshToken = sequelize.define('lectures',{
        id: {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true,
            allowNull : false,
        },
        judul :{
            type : Sequelize.STRING,
            allowNull : false
        },
        url:{
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
        tableName : 'lectures',
        timestamp :true
    });
    return RefreshToken;
}