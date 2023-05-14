// Third Party Dependencies.
const { Sequelize, DataTypes } = require("sequelize");

// Local Dependencies.
const sequelize = require("../");

// Videos Model.
const Video = sequelize.define(
  "video",
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
    },
    url_video: {
      type: DataTypes.STRING(50),
      allownull: false,
    },
  },
  {
    // No pluralization.
    freezeTableName: true,
  }
);

module.exports = Video;
