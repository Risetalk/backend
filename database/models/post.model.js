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
    },
  },
  {
    // No pluralization.
    freezeTableName: true,
  }
);

module.exports = Post;
