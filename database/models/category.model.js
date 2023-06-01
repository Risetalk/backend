// Third Party Dependencies.
const { DataTypes } = require("sequelize");

// Local Dependencies.
const sequelize = require("../index");

// Category Model
const Category = sequelize.define(
    'category',               
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING(50),
            unique: true
        },
        description: {
            type: DataTypes.TEXT,
        },
        background_image: {
            type: DataTypes.STRING,
        },
    },
    {
        // No pluralization.
        timestamps: false,
        freezeTableName: true,
    })


module.exports = Category;

