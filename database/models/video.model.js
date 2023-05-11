const {Sequelize, DataTypes} = require("sequelize")
const sequelize = require("..")

const video = sequelize.define("video", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        title: {
            type: DataTypes.STRING(50),
            allownull: false
        },
        description: {
            type: DataTypes.TEXT,
            allownull: false
        },
        url_video: {
            type: DataTypes.STRING(50),
            allownull: false
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }

);

module.exports = video;