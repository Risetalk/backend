// Third Party Dependencies.
const { DataTypes } = require("sequelize");

// Local Dependencies.
const sequelize = require("../index");

// Post Comments Model.
const PostComment = sequelize.define(
  "post_comment",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    comment: {
      type: DataTypes.TEXT,
    },
    likes: {
      type: DataTypes.INTEGER,
    },
  },
  {
    // No pluralization.
    freezeTableName: true,
  }
);

module.exports = PostComment;
