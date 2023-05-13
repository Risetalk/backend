const sequelize = require("../index")
const { DataTypes } = require("sequelize");

const Course = sequelize.define("course",
    {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },

        title: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            
        },
        background_image: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        rating:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        price:{
            type: DataTypes.STRING,
            allowNull: false,
            
        },
        released_date: {
            type: DataTypes.DATE,
            allowNull:false
        },

    },
    {
        timestamps: true,
        freezeTableName: true
    }
);

module.exports = Course;
