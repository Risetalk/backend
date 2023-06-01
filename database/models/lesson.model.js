// Third Party Dependencies.
const { DataTypes } = require("sequelize");

// Local Dependencies.
const sequelize = require("../");

// Lesson Model.
const Lesson = sequelize.define(
    "lesson",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(50),
            allownull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allownull: false,
        }
    },
    {
        // No pluralization.
        freezeTableName: true,
    }
);

module.exports = Lesson;
