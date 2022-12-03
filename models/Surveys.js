module.exports = (sequelize, DataTypes) => {
    const Surveys = sequelize.define('Surveys',{
        id: {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true,
            allowNull : false,
        },
        judul:{
            type : DataTypes.STRING,
            allowNull : false
        },
        url:{
            type : DataTypes.STRING,
            allowNull : true
        },
        createdAt:{
            field : 'created_at',
            type : DataTypes.DATE,
            allowNull : false
        },
        updatedAt:{
            field : 'updated_at',
            type : DataTypes.DATE,
            allowNull : false
        }
    },{
        tableName : 'surveys',
        timestamp :true
    });
    return Surveys;
}