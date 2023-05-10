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
            allowNull: false
        },
        background_image: {
            type: DataTypes.STRING(50),
            allowNull: false,

        },
        released_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = Course;
