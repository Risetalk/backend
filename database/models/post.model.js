// Third Party Dependencies.
const { DataTypes } = require("sequelize");

// Local Dependencies.
const sequelize = require("../");

// Posts Model.
const Post = sequelize.define(
  "post",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
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
    freezeTableName: true,
  }
);

module.exports = Post;
