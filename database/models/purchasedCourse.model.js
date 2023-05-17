// Third Party Dependencies.
const { DataTypes } = require("sequelize");

// Local Dependencies.
const sequelize = require("../index");

// purchasedCourse Model.
const purchasedCourse = sequelize.define(
    "purchased_course",
    {
        idCourse: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        title: {
            type: DataTypes.STRING(50),
        },
        description: {
            type: DataTypes.TEXT,
        },
        background_image: {
            type: DataTypes.STRING,
        },
        released_date: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
            allowNull: true,
        },
        price: {
            type: DataTypes.DECIMAL,
        },

    },
    {
        // No pluralization.
        freezeTableName: true,
    }
);

module.exports = purchasedCourse;
