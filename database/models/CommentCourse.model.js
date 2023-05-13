const sequelize = require("../index")
const { DataTypes } = require("sequelize");

const CommentCourse = sequelize.define("commentCourse",
    {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },

        message: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,

        },
    },
    {
        timestamps: true,
        freezeTableName: true
    }
);

module.exports = CommentCourse;
